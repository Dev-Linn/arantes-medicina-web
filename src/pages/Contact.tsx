
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle, Mail, Navigation } from 'lucide-react';

const Contact = () => {
  const openMaps = () => {
    const address = "Avenida Joaquim Ribeiro de Gouveia, 1969, Bairro Amoreiras, Santa Vitória, MG";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const openWhatsApp = () => {
    const phoneNumber = "5534932512055";
    const message = "Olá! Gostaria de mais informações sobre os serviços do laboratório Arantes.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Entre em <span className="text-blue-600">Contato</span>
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
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereço</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Avenida Joaquim Ribeiro de Gouveia, 1969<br />
                          Bairro Amoreiras<br />
                          Santa Vitória - MG
                        </p>
                        <Button 
                          onClick={openMaps}
                          variant="outline" 
                          size="sm" 
                          className="mt-3 border-blue-200 text-blue-700 hover:bg-blue-50"
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
                        <p className="text-gray-600 mb-3">(34) 3251-2055</p>
                        <a href="tel:3432512055">
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
                        <p className="text-gray-600 mb-3">(34) 3251-2055</p>
                        <Button 
                          onClick={openWhatsApp}
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
                            <span>07h às 17h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Sábado:</span>
                            <span>07h às 11h</span>
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

              {/* Google Maps Embed */}
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5!2d-50.123456!3d-19.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDM5JzE1LjYiUyA1MMKwMDcnMjQuNCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Laboratório Arantes"
                />
                <div className="absolute inset-0 bg-blue-600 opacity-20 pointer-events-none"></div>
              </div>

              {/* Pontos de Referência */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pontos de Referência</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Próximo ao Centro da cidade
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Fácil acesso de carro e transporte público
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Estacionamento disponível
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Por Telefone</h3>
                <p className="text-gray-600 mb-6">
                  Ligue para nosso atendimento e agende seus exames de forma rápida
                </p>
                <a href="tel:3432512055">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    (34) 3251-2055
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
                  onClick={openWhatsApp}
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Estamos Aqui para Ajudar
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Nossa equipe está pronta para atendê-lo e esclarecer todas as suas dúvidas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:3432512055">
                <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6">
                  Ligar: (34) 3251-2055
                </Button>
              </a>
              <Button 
                onClick={openWhatsApp}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-6"
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
