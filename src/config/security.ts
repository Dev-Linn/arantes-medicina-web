// Configurações de segurança centralizadas
export const SECURITY_CONFIG = {
  // Configurações de autenticação
  AUTH: {
    MAX_LOGIN_ATTEMPTS: 3,
    BLOCK_DURATION: 5 * 60 * 1000, // 5 minutos
    TOKEN_EXPIRY: 30 * 60 * 1000, // 30 minutos
    INACTIVITY_TIMEOUT: 30 * 60 * 1000, // 30 minutos
    HASH_ITERATIONS: 1000
  },
  
  // Domínios permitidos para redirecionamento
  ALLOWED_DOMAINS: [
    'wa.me',
    'api.whatsapp.com',
    'google.com',
    'maps.google.com',
    'resultados.com.br',
    'arantes.com.br',
    'aranteslaboratorio.com.br',
    '192.168.1.17'
    
  ],
  
  // Protocolos permitidos
  ALLOWED_PROTOCOLS: ['http:', 'https:', 'tel:', 'mailto:'],
  
  // Configurações de validação
  VALIDATION: {
    MAX_TEXT_LENGTH: 1000,
    MAX_EMAIL_LENGTH: 100,
    MAX_PHONE_LENGTH: 20,
    MAX_URL_LENGTH: 500,
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128
  },
  
  // Headers de segurança
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },
  
  // Content Security Policy
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "https://cdn.gpteng.co"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'font-src': ["'self'"],
    'connect-src': ["'self'", "https:"],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  }
};

// Função para verificar se um domínio é permitido
export const isAllowedDomain = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return SECURITY_CONFIG.ALLOWED_DOMAINS.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};

// Função para verificar se um protocolo é permitido
export const isAllowedProtocol = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return SECURITY_CONFIG.ALLOWED_PROTOCOLS.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Função para gerar CSP string
export const generateCSPString = (): string => {
  return Object.entries(SECURITY_CONFIG.CSP)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}; 
