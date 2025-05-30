// Site configuration and initial data
export const initialSiteDataObject = {
  // Contact
  phone: '(34) 3251-2055',
  whatsapp: '(34) 93251-2055',
  email: 'contato@aranteslaboratorio.com.br',
  address: 'Avenida Joaquim Ribeiro de Gouveia, 1969 – Bairro Amoreiras, Santa Vitória – MG',
  
  // Working Hours
  workingHours: {
    weekdays: 'Segunda a Sexta: 07h às 17h',
    saturday: 'Sábado: 07h às 11h',
  },
  
  // Social Media
  socialMedia: {
    instagram: 'https://instagram.com/aranteslaboratorio',
    facebook: 'https://facebook.com/aranteslaboratorio',
  },
  
  // Content
  homeTitle: 'Arantes Medicina Laboratorial<span class="text-primary-teal-600 block">Tradição e Qualidade</span>',
  homeSubtitle: 'Excelência em análises clínicas com mais de 30 anos de tradição em Santa Vitória',
  aboutText: 'O Laboratório Arantes é referência em análises clínicas na região, oferecendo serviços de alta qualidade com equipamentos modernos e profissionais especializados.',
  missionText: 'Nossa missão é fornecer resultados precisos e confiáveis para auxiliar no diagnóstico e tratamento de nossos pacientes.',
  
  // Lists
  services: [
    'Análises Clínicas Gerais',
    'Exames de Sangue',
    'Exames de Urina',
    'Exames Hormonais',
    'Exames Cardiológicos',
    'Check-up Completo'
  ],
  convenios: [
    'SUS - Sistema Único de Saúde',
    'Unimed',
    'Bradesco Saúde',
    'Amil',
    'SulAmérica',
    'Particular'
  ]
};

// Site metadata
export const siteConfig = {
  name: 'Arantes Medicina Laboratorial',
  description: 'Laboratório de análises clínicas em Santa Vitória-MG',
  url: 'https://aranteslab.com.br',
  ogImage: '/lovable-uploads/arantes-lab-og.jpg',
  links: {
    results: 'https://www.resultados.com.br/clientes/LABARANTES/LABARANTES.aspx'
  }
};

// Form validation settings
export const validationConfig = {
  maxLengths: {
    title: 200,
    subtitle: 200,
    text: 1000,
    address: 200,
    name: 100,
    email: 100,
    phone: 20
  },
  minLengths: {
    title: 1,
    subtitle: 1,
    text: 10,
    address: 10,
    name: 1,
    email: 5,
    phone: 8
  }
};