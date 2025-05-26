
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Microscope, Heart, Target, Shield } from 'lucide-react';

interface SiteDataForAbout {
  aboutText: string;
  // Add other fields from initialSiteDataObject if About page needs them
}

interface AboutProps {
  siteData: SiteDataForAbout;
}

const About = ({ siteData }: AboutProps) => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sobre o <span className="text-blue-600">Arantes</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {siteData.aboutText || 'Texto padrão sobre nós.'}
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Nossa História</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  O Laboratório Arantes Medicina Laboratorial nasceu da visão de oferecer 
                  análises clínicas de excelência para a comunidade de Santa Vitória e região. 
                  Fundado com o compromisso de aliar tecnologia avançada ao atendimento humanizado.
                </p>
                <p>
                  Ao longo dos anos, nos estabelecemos como referência em precisão diagnóstica, 
                  investindo continuamente em equipamentos de última geração e na capacitação 
                  constante de nossa equipe especializada.
                </p>
                <p>
                  Hoje, somos reconhecidos pela qualidade de nossos serviços, pela agilidade 
                  na entrega de resultados e pelo cuidado dedicado a cada paciente que nos procura.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <Microscope className="h-32 w-32 text-blue-600" />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Pilares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os valores que guiam nossa atuação e nosso compromisso com a excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Oferecer serviços de análises clínicas com excelência, precisão e 
                  agilidade, contribuindo para o diagnóstico e cuidado da saúde da nossa comunidade.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconhecido como o laboratório de referência em Santa Vitória e região, 
                  pela qualidade dos serviços e inovação tecnológica.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Valores</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ética, qualidade, respeito ao paciente, inovação tecnológica, 
                  responsabilidade social e compromisso com a excelência.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Diferenciais
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O que nos torna únicos no cuidado com sua saúde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Qualidade Certificada</h3>
              <p className="text-gray-600">
                Processos rigorosos de controle de qualidade e certificações que garantem 
                a precisão dos resultados.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tecnologia Avançada</h3>
              <p className="text-gray-600">
                Equipamentos de última geração e métodos analíticos modernos para 
                máxima precisão diagnóstica.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Equipe Especializada</h3>
              <p className="text-gray-600">
                Profissionais altamente qualificados e em constante atualização para 
                oferecer o melhor atendimento.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Resultados Rápidos</h3>
              <p className="text-gray-600">
                Agilidade na entrega sem comprometer a qualidade, com resultados 
                disponíveis online 24 horas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Atendimento Humanizado</h3>
              <p className="text-gray-600">
                Cuidado e atenção personalizada para cada paciente, com foco no 
                bem-estar e conforto.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Compromisso Social</h3>
              <p className="text-gray-600">
                Responsabilidade com a comunidade e contribuição para a saúde 
                pública da região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números que Impressionam */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Números que Impressionam
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Nossa trajetória de excelência em números
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">15+</p>
              <p className="text-blue-100">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-blue-100">Tipos de Exames</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">10K+</p>
              <p className="text-blue-100">Pacientes Atendidos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">99%</p>
              <p className="text-blue-100">Satisfação</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
