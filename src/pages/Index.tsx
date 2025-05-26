
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, MapPin, Users, Award, Microscope } from 'lucide-react';

// Define the expected structure of siteData for clarity and type safety
interface SiteData {
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
  services: string[];
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  homeTitle: string;
  homeSubtitle: string;
  aboutText: string;
}

interface IndexProps {
  siteData: SiteData;
}

const Index = ({ siteData }: IndexProps) => {
  // Helper to format phone for tel: links

  const formatPhoneNumber = (phone: string) => (phone || '').replace(/\D/g, '');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{ __html: siteData.homeTitle || '' }}
                />
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  {siteData.homeSubtitle || 'Subtítulo padrão.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/resultados">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6">
                    Acessar Resultados
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                  <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50 text-lg px-8 py-6">
                    Agendar Exame
                  </Button>
                </a>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">15+</p>
                  <p className="text-sm text-gray-600">Anos de Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">500+</p>
                  <p className="text-sm text-gray-600">Tipos de Exames</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">24h</p>
                  <p className="text-sm text-gray-600">Resultados Online</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Microscope className="h-24 w-24 text-blue-600" />
                </div>
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Tecnologia Avançada</h3>
                  <p className="text-gray-600">
                    Equipamentos de última geração para garantir a máxima precisão em todos os exames.
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma ampla gama de exames laboratoriais com a mais alta qualidade e precisão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Microscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {siteData.services?.[0] || 'Serviço 1'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Exames laboratoriais completos com resultados precisos e confiáveis para diagnósticos assertivos.
                </p>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {siteData.services?.[1] || 'Serviço 2'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Comodidade e segurança com coleta de exames no conforto da sua casa, mantendo todos os protocolos.
                </p>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {siteData.services?.[2] || 'Serviço 3'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aceitamos diversos convênios médicos para facilitar o acesso aos nossos serviços de qualidade.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/servicos">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Arantes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa missão é oferecer excelência em análises clínicas com tecnologia de ponta e atendimento humanizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Qualidade Certificada</h3>
              <p className="text-gray-600">Processos certificados e controle de qualidade rigoroso em todos os exames.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Resultados Rápidos</h3>
              <p className="text-gray-600">Agilidade na entrega de resultados sem comprometer a precisão dos laudos.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Equipe Especializada</h3>
              <p className="text-gray-600">Profissionais altamente qualificados e experientes em análises clínicas.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tecnologia Avançada</h3>
              <p className="text-gray-600">Equipamentos modernos e tecnologia de ponta para máxima precisão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto para cuidar da sua saúde?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Agende seus exames ou acesse seus resultados de forma rápida e segura
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Ligar Agora: {siteData.phone || '(00) 0000-0000'}
                </Button>
              </a>
              <Link to="/resultados">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-6">
                  Acessar Resultados
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
