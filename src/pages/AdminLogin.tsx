import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, AlertTriangle, Timer } from 'lucide-react';
import {
  verifyCredentials,
  generateSecureToken,
  validateToken,
  logSecurityEvent,
  detectTampering,
  secureClearData
} from '@/utils/secureAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const navigate = useNavigate();

  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 300000; // 5 minutos em ms

  useEffect(() => {
    // Detectar tentativas de manipulação
    if (detectTampering()) {
      logSecurityEvent('SECURITY_BREACH_DETECTED');
      secureClearData();
      setError('Tentativa de violação de segurança detectada. Sistema reiniciado.');
      return;
    }

    // Verificar se já está autenticado
    const token = localStorage.getItem('adminAuthToken');
    if (token && validateToken(token)) {
      navigate('/admin/dashboard');
    }

    // Verificar tentativas anteriores
    const storedAttempts = localStorage.getItem('loginAttempts');
    const lastAttemptTime = localStorage.getItem('lastAttemptTime');
    
    if (storedAttempts && lastAttemptTime) {
      const attemptCount = parseInt(storedAttempts);
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttemptTime);
      
      if (attemptCount >= MAX_ATTEMPTS && timeSinceLastAttempt < BLOCK_DURATION) {
        setIsBlocked(true);
        setAttempts(attemptCount);
        setBlockTimeLeft(Math.ceil((BLOCK_DURATION - timeSinceLastAttempt) / 1000));
      } else if (timeSinceLastAttempt >= BLOCK_DURATION) {
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lastAttemptTime');
      } else {
        setAttempts(attemptCount);
      }
    }

    logSecurityEvent('LOGIN_PAGE_ACCESSED');
  }, [navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimeLeft > 0) {
      interval = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setAttempts(0);
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lastAttemptTime');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimeLeft]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      logSecurityEvent('BLOCKED_LOGIN_ATTEMPT', { email });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isValid = await verifyCredentials(email, password);
      
      if (isValid) {
        // Login bem-sucedido
        const token = generateSecureToken();
        localStorage.setItem('adminAuthToken', token);
        localStorage.setItem('loginTime', Date.now().toString());
        
        // Reset tentativas
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lastAttemptTime');
        setAttempts(0);
        
        logSecurityEvent('SUCCESSFUL_LOGIN', { email });
        navigate('/admin/dashboard');
      } else {
        // Credenciais inválidas
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        localStorage.setItem('lastAttemptTime', Date.now().toString());
        
        logSecurityEvent('INVALID_CREDENTIALS', { 
          email, 
          attempt: newAttempts
        });

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsBlocked(true);
          setBlockTimeLeft(BLOCK_DURATION / 1000);
          setError(`Muitas tentativas falharam. Conta bloqueada por ${BLOCK_DURATION / 60000} minutos.`);
          logSecurityEvent('ACCOUNT_BLOCKED', { email, attempts: newAttempts });
        } else {
          setError(`Credenciais inválidas. Tentativa ${newAttempts}/${MAX_ATTEMPTS}`);
        }
      }
    } catch (error: any) {
      logSecurityEvent('LOGIN_ERROR', { error: error.message });
      setError('Erro interno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sistema Seguro</h1>
            <p className="text-gray-600">Acesso Administrativo</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900">Login Administrativo</CardTitle>
              <p className="text-gray-600 text-sm">Digite suas credenciais de administrador</p>
            </CardHeader>
            
            <CardContent>
              {isBlocked ? (
                <div className="text-center py-8">
                  <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Sistema Bloqueado</h3>
                  <div className="flex items-center justify-center space-x-2 text-red-500">
                    <Timer className="h-4 w-4" />
                    <span className="font-mono text-lg">{formatTime(blockTimeLeft)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Múltiplas tentativas de violação detectadas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="username"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="current-password"
                    />
                  </div>

                  {attempts > 0 && !isBlocked && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Tentativas restantes: {MAX_ATTEMPTS - attempts}
                      </AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black"
                    disabled={loading || isBlocked}
                  >
                    {loading ? 'Verificando Credenciais...' : 'Acessar Dashboard'}
                  </Button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSecurityInfo(!showSecurityInfo)}
                >
                  {showSecurityInfo ? 'Ocultar' : 'Mostrar'} Informações de Segurança
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Segurança */}
          {showSecurityInfo && (
            <div className="mt-8 p-4 bg-primary-teal-50 rounded-lg border border-primary-teal-200">
              <h3 className="font-semibold text-primary-teal-900 mb-2">🔒 Sistema Seguro Ativo:</h3>
              <ul className="text-sm text-primary-teal-800 space-y-1">
                <li>✅ Hash com 1000 iterações + salt dinâmico</li>
                <li>✅ Tokens JWT com fingerprint do navegador</li>
                <li>✅ Rate limiting (máx. 3 tentativas)</li>
                <li>✅ Bloqueio temporário (5 minutos)</li>
                <li>✅ Detecção de tentativas de manipulação</li>
                <li>✅ Logs criptografados e seguros</li>
                <li>✅ Validação de sessão automática</li>
              </ul>
              <div className="mt-3 p-2 bg-primary-teal-100 rounded text-xs text-primary-teal-700">
                <strong>Credenciais para teste:</strong><br />
                Email: admin@arantes.com.br<br />
                Senha: ArantesSecure2024!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
