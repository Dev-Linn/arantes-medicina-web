
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from 'lucide-react';
import { sanitizeUrl } from '@/utils/sanitizer';

interface SiteDataForContact {
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
  // Add other fields from initialSiteDataObject if Contact page needs them
}

interface ContactProps {
  siteData: SiteDataForContact;
}

const Contact = ({ siteData }: ContactProps) => {
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const formatPhoneNumber = (phone: string) => (phone || '').replace(/\D/g, '');

  const formatWhatsAppLink = (whatsapp: string, message?: string) => {
    const digits = (whatsapp || '').replace(/\D/g, '');
    const baseLink = digits.startsWith('55') && digits.length > 10 ? `https://wa.me/${digits}` : `https://wa.me/55${digits}`;
    return message ? `${baseLink}?text=${encodeURIComponent(message)}` : baseLink;
  };
  
  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.address || '')}`;
    const sanitizedUrl = sanitizeUrl(url);
    if (sanitizedUrl) {
      window.open(sanitizedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const openWhatsApp = (message?: string) => {
    const defaultMessage = "Olá! Gostaria de mais informações sobre os serviços do laboratório Arantes.";
    const url = formatWhatsAppLink(siteData.whatsapp || '', message || defaultMessage);
    const sanitizedUrl = sanitizeUrl(url);
    if (sanitizedUrl) {
      window.open(sanitizedUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Prepare address display (simple split by comma for now, can be enhanced)
  const addressParts = (siteData.address || 'Endereço Padrão').split(', ');


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-teal-50 via-white to-primary-teal-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Entre em <span className="text-primary-teal-600">Contato</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Estamos prontos para atendê-lo. Entre em contato conosco para agendar 
              seus exames ou esclarecer suas dúvidas.
            </p>
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Informações */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Informações de Contato
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Nossa equipe está sempre disponível para ajudá-lo. Entre em contato 
                  através dos canais abaixo ou visite nossa unidade.
                </p>
              </div>

              <div className="space-y-6">
                {/* Endereço */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-teal-500 to-primary-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereço</h3>
                        <div className="text-gray-600 leading-relaxed">
                          {addressParts.map((part, index) => (
                            <span key={index}>{part}<br /></span>
                          ))}
                          {addressParts.length === 1 && <span>{siteData.address || 'Endereço Padrão'}</span>} {/* Fallback if no commas */}
                        </div>
                        <Button 
                          onClick={openMaps}
                          variant="outline" 
                          size="sm" 
                          className="mt-3 border-primary-teal-200 text-primary-teal-700 hover:bg-primary-teal-50"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Ver no Mapa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Telefone */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
                        <p className="text-gray-600 mb-3">{siteData.phone || '(00) 0000-0000'}</p>
                        <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          >
                            Ligar Agora
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WhatsApp */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                        <p className="text-gray-600 mb-3">{siteData.whatsapp || '(00) 0000-0000'}</p>
                        <Button 
                          onClick={() => openWhatsApp()}
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Conversar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Horários */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Horário de Funcionamento</h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex justify-between">
                            <span className="font-medium">Segunda a Sexta:</span>
                            <span>{(siteData.workingHours?.weekdays || '00h às 00h').replace('Segunda a Sexta: ', '')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Sábado:</span>
                            <span>{(siteData.workingHours?.saturday || '00h às 00h').replace('Sábado: ', '')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Domingo:</span>
                            <span className="text-red-600">Fechado</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mapa */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nossa Localização
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Estamos localizados no centro de Santa Vitória-MG, em um local de fácil acesso 
                  e com estacionamento disponível.
                </p>
              </div>

              {/* Mapa Simples */}
              <div className="relative h-96 bg-gradient-to-br from-primary-teal-50 to-primary-teal-100 rounded-lg overflow-hidden shadow-lg border-2 border-primary-teal-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-16 w-16 text-primary-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Laboratório Arantes
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {siteData.address}
                    </p>
                    <Button 
                      onClick={openMaps}
                      className="bg-primary-teal-600 hover:bg-primary-teal-700"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Abrir no Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pontos de Referência */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pontos de Referência</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-teal-500 rounded-full mr-3"></div>
                      Próximo ao Centro da cidade
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-teal-500 rounded-full mr-3"></div>
                      Fácil acesso de carro e transporte público
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-teal-500 rounded-full mr-3"></div>
                      Estacionamento disponível
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-teal-500 rounded-full mr-3"></div>
                      Ambiente acessível para pessoas com deficiência
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de Agendamento */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como Agendar seus Exames
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos diversas formas para você agendar seus exames com comodidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-teal-500 to-primary-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Por Telefone</h3>
                <p className="text-gray-600 mb-6">
                  Ligue para nosso atendimento e agende seus exames de forma rápida
                </p>
                <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                  <Button className="w-full bg-gradient-to-r from-primary-teal-600 to-primary-teal-700 hover:from-primary-teal-700 hover:to-primary-teal-800">
                    {siteData.phone || '(00) 0000-0000'}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Por WhatsApp</h3>
                <p className="text-gray-600 mb-6">
                  Converse conosco pelo WhatsApp para agendar com praticidade
                </p>
                <Button 
                  onClick={() => openWhatsApp("Olá! Gostaria de agendar um exame.")}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Conversar no WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Presencialmente</h3>
                <p className="text-gray-600 mb-6">
                  Visite nossa unidade e agende pessoalmente com nossa equipe
                </p>
                <Button 
                  onClick={openMaps}
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  Ver Localização
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-teal-600 to-primary-teal-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Estamos Aqui para Ajudar
            </h2>
            <p className="text-xl text-primary-teal-100 mb-8">
              Nossa equipe está pronta para atendê-lo e esclarecer todas as suas dúvidas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
                <Button size="lg" variant="secondary" className="bg-white text-primary-teal-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Ligar: {siteData.phone || '(00) 0000-0000'}
                </Button>
              </a>
              <Button 
                onClick={() => openWhatsApp()}
                size="lg" 
                variant="outline" 
                className="bg-white text-primary-teal-700 hover:bg-gray-100 text-lg px-8 py-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
