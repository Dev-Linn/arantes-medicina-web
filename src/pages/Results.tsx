
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Download, Eye, Lock, CheckCircle } from 'lucide-react';

const Results = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular login - em produção, conectar com sistema real
    setTimeout(() => {
      if (cpf === '123.456.789-00' && senha === '123456') {
        // Sucesso - redirecionar para área de resultados
        alert('Login realizado com sucesso! Em produção, aqui seria redirecionado para os resultados.');
      } else {
        setError('CPF ou senha incorretos. Tente novamente.');
      }
      setLoading(false);
    }, 1500);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Resultados</span> Online
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Acesse seus resultados de exames de forma segura e rápida, 
              disponíveis 24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Área do Paciente</CardTitle>
                <p className="text-gray-600">Digite seus dados para acessar os resultados</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                      maxLength={14}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="Digite sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Primeira vez? Sua senha é sua data de nascimento (ddmmaaaa)
                    </p>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    disabled={loading}
                  >
                    {loading ? 'Acessando...' : 'Acessar Resultados'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Precisa de ajuda para acessar?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a href="tel:3432512055" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Ligar: (34) 3251-2055
                      </Button>
                    </a>
                    <a href="https://wa.me/5534932512055?text=Olá! Preciso de ajuda para acessar meus resultados online." target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Para demonstração:</h3>
              <p className="text-sm text-blue-800">
                CPF: 123.456.789-00<br />
                Senha: 123456
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vantagens dos Resultados Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Praticidade e segurança para acessar seus exames quando e onde quiser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Segurança Total</h3>
              <p className="text-gray-600 text-sm">
                Acesso protegido com criptografia e autenticação segura.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Disponível 24h</h3>
              <p className="text-gray-600 text-sm">
                Acesse seus resultados a qualquer hora, todos os dias.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Download PDF</h3>
              <p className="text-gray-600 text-sm">
                Baixe seus laudos em formato PDF para imprimir ou compartilhar.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Histórico Completo</h3>
              <p className="text-gray-600 text-sm">
                Visualize o histórico de todos os seus exames realizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instruções */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Como Acessar seus Resultados
              </h2>
              <p className="text-xl text-gray-600">
                Siga estes passos simples para visualizar seus exames
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Digite seu CPF</h3>
                  <p className="text-gray-600 text-sm">
                    Informe seu CPF no formato 000.000.000-00
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Insira sua Senha</h3>
                  <p className="text-gray-600 text-sm">
                    Use sua data de nascimento (ddmmaaaa) ou senha personalizada
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualize Resultados</h3>
                  <p className="text-gray-600 text-sm">
                    Acesse, visualize e baixe seus laudos em PDF
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Importante:</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• Os resultados ficam disponíveis online por 90 dias</li>
                <li>• Para primeira vez, use sua data de nascimento como senha</li>
                <li>• Em caso de dúvidas, entre em contato conosco</li>
                <li>• Mantenha seus dados seguros e não compartilhe sua senha</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
