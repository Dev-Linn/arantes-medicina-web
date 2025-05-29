import { z } from 'zod';

// Phone number regex pattern
const PHONE_PATTERN = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const URL_PATTERN = /^https?:\/\/.+/;

// Schema for working hours
const WorkingHoursSchema = z.object({
  weekdays: z.string()
    .min(1, 'Horário de segunda a sexta é obrigatório')
    .max(50, 'Horário muito longo'),
  saturday: z.string()
    .min(1, 'Horário de sábado é obrigatório')
    .max(50, 'Horário muito longo')
});

// Schema for social media
const SocialMediaSchema = z.object({
  instagram: z.string()
    .regex(URL_PATTERN, 'URL do Instagram inválida')
    .or(z.string().length(0)),
  facebook: z.string()
    .regex(URL_PATTERN, 'URL do Facebook inválida')
    .or(z.string().length(0))
});

// Main site data schema
export const SiteDataSchema = z.object({
  // Contact Information
  phone: z.string()
    .regex(PHONE_PATTERN, 'Formato de telefone inválido: (XX) XXXX-XXXX')
    .min(1, 'Telefone é obrigatório'),
  
  whatsapp: z.string()
    .regex(PHONE_PATTERN, 'Formato de WhatsApp inválido: (XX) XXXXX-XXXX')
    .min(1, 'WhatsApp é obrigatório'),
  
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  
  address: z.string()
    .min(10, 'Endereço muito curto')
    .max(200, 'Endereço muito longo'),
  
  // Working Hours
  workingHours: WorkingHoursSchema,
  
  // Social Media
  socialMedia: SocialMediaSchema,
  
  // Content
  homeTitle: z.string()
    .min(1, 'Título principal é obrigatório')
    .max(200, 'Título muito longo'),
  
  homeSubtitle: z.string()
    .min(1, 'Subtítulo é obrigatório')
    .max(200, 'Subtítulo muito longo'),
  
  aboutText: z.string()
    .min(10, 'Texto sobre muito curto')
    .max(1000, 'Texto sobre muito longo'),
  
  missionText: z.string()
    .min(10, 'Texto da missão muito curto')
    .max(500, 'Texto da missão muito longo'),
  
  // Lists
  services: z.array(
    z.string()
      .min(1, 'Nome do serviço não pode estar vazio')
      .max(100, 'Nome do serviço muito longo')
  ).min(1, 'Adicione pelo menos um serviço'),
  
  convenios: z.array(
    z.string()
      .min(1, 'Nome do convênio não pode estar vazio')
      .max(100, 'Nome do convênio muito longo')
  ).min(1, 'Adicione pelo menos um convênio')
});

// Function to validate site data
export const validateSiteData = (data: unknown) => {
  try {
    const validatedData = SiteDataSchema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return {
        success: false,
        data: null,
        errors: formattedErrors
      };
    }
    
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido' }]
    };
  }
};

// Helper function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
  }
  return phone;
};

// Helper function to validate URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return URL_PATTERN.test(url);
  } catch {
    return false;
  }
};