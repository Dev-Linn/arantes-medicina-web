
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microscope, MapPin, Shield, Clock, Users, Award, Phone } from 'lucide-react';

interface SiteDataForServices {
  phone: string;
  whatsapp: string;
  services: string[];
  convenios: string[];
  address: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  homeTitle: string;
  homeSubtitle: string;
  aboutText: string;
  // Add other fields from initialSiteDataObject if Services page needs them
}

interface ServicesProps {
  siteData: SiteDataForServices;
}

const Services = ({ siteData }: ServicesProps) => {

  
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const formatPhoneNumber = (phone: string) => (phone || '').replace(/\D/g, '');

  const formatWhatsAppLink = (whatsapp: string) => {
    const digits = (whatsapp || '').replace(/\D/g, '');
    // Assuming '55' is the country code for Brazil.
    if (digits.startsWith('55') && digits.length > 10) {
      return `https://wa.me/${digits}`;
    }
    return `https://wa.me/55${digits}`;
  };

  const staticServicesData = [ 
    {
      icon: Microscope,
      title: 'Análises Clínicas Completas', // Match this with names from siteData.services
      description: 'Exames laboratoriais abrangentes para diagnósticos precisos',
      features: [
        'Hemograma completo',
        'Bioquímica clínica',
        'Análises hormonais',
        'Imunologia e sorologia',
        'Microbiologia',
        'Parasitologia',
        'Urinálise',
        'Marcadores tumorais'
      ]
    },
    {
      icon: MapPin,
      title: 'Coleta Domiciliar', // Match this with names from siteData.services
      description: 'Comodidade e segurança no conforto da sua casa',
      features: [
        'Agendamento flexível',
        'Profissionais qualificados',
        'Equipamentos esterilizados',
        'Protocolo de segurança',
        'Atendimento humanizado',
        'Horários convenientes',
        'Área de cobertura ampla',
        'Resultados online'
      ]
    },
    {
      icon: Shield,
      title: 'Convênios Médicos', // Match this with names from siteData.services
      description: 'Aceitamos diversos planos de saúde para sua comodidade',
      features: [
        'Unimed',
        'Bradesco Saúde',
        'SulAmérica',
        'Porto Seguro',
        'Amil',
        'Golden Cross',
        'Outros convênios',
        'Consulte disponibilidade'
      ]
    }
  ];

  const specialties = [
    'Análises Bioquímicas',
    'Hematologia',
    'Microbiologia',
    'Imunologia',
    'Parasitologia',
    'Endocrinologia',
    'Cardiologia Laboratorial',
    'Toxicologia',
    'Marcadores Tumorais',
    'Análises Hormonais',
    'Medicina Nuclear',
    'Genética Molecular'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-teal-50 via-white to-primary-teal-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="text-primary-teal-600">Serviços</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Oferecemos uma ampla gama de exames laboratoriais com tecnologia de ponta, 
              precisão e agilidade para cuidar da sua saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Principais Serviços */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Principais Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossos serviços especializados para atender todas as suas necessidades de saúde
            </p>
          </div>

          {Array.isArray(siteData.services) && siteData.services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteData.services.map((serviceName, index) => {
                // Ícones rotativos para os serviços
                const icons = [Microscope, Shield, MapPin, Clock, Users, Award];
                const colors = [
                  'from-primary-teal-500 to-primary-teal-600',
                  'from-green-500 to-green-600', 
                  'from-purple-500 to-purple-600',
                  'from-orange-500 to-orange-600',
                  'from-red-500 to-red-600',
                  'from-indigo-500 to-indigo-600'
                ];
                
                const IconComponent = icons[index % icons.length];
                const colorClass = colors[index % colors.length];
                
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{serviceName}</CardTitle>
                      <p className="text-gray-600">Serviço especializado oferecido pelo Laboratório Arantes</p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Entre em contato para mais informações sobre este serviço.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">Nenhum serviço configurado. Configure os serviços no dashboard administrativo.</p>
            </div>
          )}
        </div>
      </section>

      {/* Convênios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Convênios Aceitos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabalhamos com diversos convênios para facilitar o acesso aos nossos serviços
            </p>
          </div>

          {Array.isArray(siteData.convenios) && siteData.convenios.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {siteData.convenios.map((convenio, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">{convenio}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">Nenhum convênio configurado. Configure os convênios no dashboard administrativo.</p>
            </div>
          )}
        </div>
      </section>

      {/* Especialidades */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Especialidades Médicas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Atendemos diversas especialidades com exames específicos e precisos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <p className="text-sm font-medium text-gray-800">{specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais de Qualidade */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Diferenciais de Qualidade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa estrutura e processos garantem a excelência em todos os exames
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-teal-500 to-primary-teal-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Certificações</h3>
              <p className="text-gray-600 text-sm">
                Laboratório certificado com todos os padrões de qualidade exigidos.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Agilidade</h3>
              <p className="text-gray-600 text-sm">
                Resultados rápidos sem comprometer a precisão dos laudos.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Equipe Expert</h3>
              <p className="text-gray-600 text-sm">
                Profissionais especializados e em constante atualização.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Microscope className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tecnologia</h3>
              <p className="text-gray-600 text-sm">
                Equipamentos de última geração para máxima precisão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Agendar */}
      <section className="py-20 bg-gradient-to-r from-primary-teal-600 to-primary-teal-700">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Como Agendar seus Exames
            </h2>
            <p className="text-xl text-primary-teal-100 mb-8">
              Processo simples e rápido para agendar seus exames
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Ligue</h3>
                <p className="text-primary-teal-100 text-sm">Entre em contato pelo nosso telefone</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Agende</h3>
                <p className="text-primary-teal-100 text-sm">Escolha o melhor horário para você</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Microscope className="h-8 w-8 text-primary-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Realize</h3>
                <p className="text-primary-teal-100 text-sm">Faça seus exames com tranquilidade</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                <Button size="lg" variant="secondary" className="bg-white text-primary-teal-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Ligar: {siteData.phone || '(00) 0000-0000'}
                </Button>
              </a>
              <a href={formatWhatsAppLink(siteData.whatsapp)} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white text-primary-teal-700 hover:bg-gray-100 text-lg px-8 py-6">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
