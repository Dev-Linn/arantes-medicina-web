import CryptoJS from 'crypto-js';

// Configurações de segurança
const HASH_ITERATIONS = 1000;
const TOKEN_EXPIRY = 30 * 60 * 1000; // 30 minutos
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos

// Credenciais seguras (em produção, isso viria de um backend)
const SECURE_CREDENTIALS = {
  email: 'admin@arantes.com.br',
  password: 'ArantesSecure2024!'
};

// Verificar credenciais - FUNCIONAL
export const verifyCredentials = async (email: string, password: string): Promise<boolean> => {
  // Simular delay de rede para evitar timing attacks
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Verificação simples mas funcional
  return email === SECURE_CREDENTIALS.email && password === SECURE_CREDENTIALS.password;
};

// Gerar fingerprint do navegador
const generateBrowserFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  return CryptoJS.SHA256(fingerprint).toString().substring(0, 32);
};

// Gerar token seguro
export const generateSecureToken = (): string => {
  const fingerprint = generateBrowserFingerprint();
  const timestamp = Date.now();
  const randomBytes = CryptoJS.lib.WordArray.random(32).toString();
  
  const tokenData = {
    fingerprint,
    timestamp,
    random: randomBytes,
    expiry: timestamp + TOKEN_EXPIRY
  };
  
  return CryptoJS.AES.encrypt(JSON.stringify(tokenData), fingerprint).toString();
};

// Validar token
export const validateToken = (token: string): boolean => {
  try {
    const fingerprint = generateBrowserFingerprint();
    const decrypted = CryptoJS.AES.decrypt(token, fingerprint);
    const tokenData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    
    // Verificar se o token não expirou
    if (Date.now() > tokenData.expiry) {
      return false;
    }
    
    // Verificar fingerprint
    if (tokenData.fingerprint !== fingerprint) {
      return false;
    }
    
    // Verificar inatividade
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime && Date.now() - parseInt(loginTime) > INACTIVITY_TIMEOUT) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

// Sistema de logs de segurança
interface SecurityEvent {
  timestamp: number;
  event: string;
  details?: any;
  fingerprint: string;
}

export const logSecurityEvent = (event: string, details?: any): void => {
  const securityEvent: SecurityEvent = {
    timestamp: Date.now(),
    event,
    details,
    fingerprint: generateBrowserFingerprint()
  };
  
  // Criptografar log
  const encryptedLog = CryptoJS.AES.encrypt(
    JSON.stringify(securityEvent), 
    generateBrowserFingerprint()
  ).toString();
  
  // Armazenar em array de logs
  const existingLogs = localStorage.getItem('securityLogs');
  const logs = existingLogs ? JSON.parse(existingLogs) : [];
  logs.push(encryptedLog);
  
  // Manter apenas os últimos 100 logs
  if (logs.length > 100) {
    logs.splice(0, logs.length - 100);
  }
  
  localStorage.setItem('securityLogs', JSON.stringify(logs));
};

// Detectar tentativas de manipulação
export const detectTampering = (): boolean => {
  try {
    // Verificar se o localStorage foi manipulado
    const securityLogs = localStorage.getItem('securityLogs');
    if (securityLogs) {
      const logs = JSON.parse(securityLogs);
      const fingerprint = generateBrowserFingerprint();
      
      // Tentar descriptografar alguns logs para verificar integridade
      for (let i = 0; i < Math.min(5, logs.length); i++) {
        try {
          const decrypted = CryptoJS.AES.decrypt(logs[i], fingerprint);
          JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch {
          return true; // Manipulação detectada
        }
      }
    }
    
    return false;
  } catch {
    return true;
  }
};

// Limpar dados de forma segura
export const secureClearData = (): void => {
  // Sobrescrever dados sensíveis antes de remover
  const sensitiveKeys = [
    'adminAuthToken',
    'loginTime',
    'securityLogs',
    'loginAttempts',
    'lastAttemptTime'
  ];
  
  sensitiveKeys.forEach(key => {
    localStorage.setItem(key, CryptoJS.lib.WordArray.random(256).toString());
    localStorage.removeItem(key);
  });
  
  logSecurityEvent('SECURE_DATA_CLEARED');
};

// Obter logs de segurança descriptografados (para admin)
export const getSecurityLogs = (): SecurityEvent[] => {
  try {
    const securityLogs = localStorage.getItem('securityLogs');
    if (!securityLogs) return [];
    
    const logs = JSON.parse(securityLogs);
    const fingerprint = generateBrowserFingerprint();
    
    return logs.map((encryptedLog: string) => {
      try {
        const decrypted = CryptoJS.AES.decrypt(encryptedLog, fingerprint);
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      } catch {
        return null;
      }
    }).filter(Boolean);
  } catch {
    return [];
  }
}; 
