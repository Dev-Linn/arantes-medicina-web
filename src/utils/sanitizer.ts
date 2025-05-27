import DOMPurify from 'dompurify';
import { isAllowedDomain, isAllowedProtocol } from '@/config/security';

// Configuração segura do DOMPurify
const sanitizerConfig = {
  ALLOWED_TAGS: ['span', 'br', 'strong', 'em', 'b', 'i'],
  ALLOWED_ATTR: ['class'],
  FORBID_SCRIPTS: true,
  FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'img', 'svg'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'href', 'src']
};

// Função para sanitizar HTML
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(html, sanitizerConfig);
};

// Função para sanitizar texto simples (remove todas as tags HTML)
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

// Função para validar e sanitizar URLs
export const sanitizeUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }
  
  try {
    // Verificar se o protocolo é permitido
    if (!isAllowedProtocol(url)) {
      return '';
    }
    
    // Verificar se o domínio é permitido
    if (!isAllowedDomain(url)) {
      return '';
    }
    
    // Sanitizar a URL
    return DOMPurify.sanitize(url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  } catch {
    // Se não for uma URL válida, retornar string vazia
    return '';
  }
};

// Função para validar entrada de formulário
export const validateInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Limitar tamanho
  const truncated = input.slice(0, maxLength);
  
  // Sanitizar
  return sanitizeText(truncated);
}; 
