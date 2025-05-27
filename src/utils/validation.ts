import { z } from 'zod';

// Schema para validação de dados do site
export const SiteDataSchema = z.object({
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido')
    .max(20, 'Telefone muito longo'),
  
  whatsapp: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de WhatsApp inválido')
    .max(20, 'WhatsApp muito longo'),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email muito longo'),
  
  address: z.string()
    .min(10, 'Endereço muito curto')
    .max(200, 'Endereço muito longo'),
  
  homeTitle: z.string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título muito longo'),
  
  homeSubtitle: z.string()
    .min(1, 'Subtítulo é obrigatório')
    .max(200, 'Subtítulo muito longo'),
  
  aboutText: z.string()
    .min(10, 'Texto sobre muito curto')
    .max(1000, 'Texto sobre muito longo'),
  
  services: z.array(z.string().min(1).max(100))
    .min(1, 'Pelo menos um serviço é obrigatório')
    .max(20, 'Muitos serviços'),
  
  convenios: z.array(z.string().min(1).max(100))
    .min(1, 'Pelo menos um convênio é obrigatório')
    .max(20, 'Muitos convênios'),
  
  workingHours: z.object({
    weekdays: z.string().min(1).max(50),
    saturday: z.string().min(1).max(50)
  }),
  
  socialMedia: z.object({
    instagram: z.string().url('URL do Instagram inválida').optional().or(z.literal('')),
    facebook: z.string().url('URL do Facebook inválida').optional().or(z.literal(''))
  })
});

// Schema para validação de credenciais de login
export const LoginCredentialsSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email muito curto')
    .max(100, 'Email muito longo'),
  
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha muito longa')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Senha deve conter pelo menos: 1 minúscula, 1 maiúscula, 1 número e 1 caractere especial')
});

// Schema para validação de URLs
export const UrlSchema = z.string()
  .url('URL inválida')
  .refine((url) => {
    const allowedProtocols = ['http:', 'https:'];
    try {
      const urlObj = new URL(url);
      return allowedProtocols.includes(urlObj.protocol);
    } catch {
      return false;
    }
  }, 'Protocolo não permitido');

// Schema para validação de telefone
export const PhoneSchema = z.string()
  .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato: (XX) XXXXX-XXXX')
  .or(z.string().regex(/^\d{10,11}$/, 'Apenas números: XXXXXXXXXXX'));

// Função para validar dados do site
export const validateSiteData = (data: unknown) => {
  try {
    return {
      success: true,
      data: SiteDataSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido' }]
    };
  }
};

// Função para validar credenciais de login
export const validateLoginCredentials = (data: unknown) => {
  try {
    return {
      success: true,
      data: LoginCredentialsSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido' }]
    };
  }
};

// Função para sanitizar e validar entrada de texto
export const sanitizeAndValidateText = (
  text: string, 
  minLength: number = 1, 
  maxLength: number = 1000
): { isValid: boolean; sanitized: string; error?: string } => {
  if (typeof text !== 'string') {
    return { isValid: false, sanitized: '', error: 'Entrada deve ser texto' };
  }
  
  // Remover caracteres perigosos
  const sanitized = text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
  
  if (sanitized.length < minLength) {
    return { isValid: false, sanitized, error: `Mínimo ${minLength} caracteres` };
  }
  
  if (sanitized.length > maxLength) {
    return { isValid: false, sanitized, error: `Máximo ${maxLength} caracteres` };
  }
  
  return { isValid: true, sanitized };
};

// Função para validar formato de telefone brasileiro
export const validateBrazilianPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:\+55\s?)?(?:\(\d{2}\)\s?|\d{2}\s?)(?:9\s?)?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone);
};

// Função para validar email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
}; 
