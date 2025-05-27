import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, Clock, Download, Eye, CheckCircle } from 'lucide-react';

const Results = () => {
  const RESULTS_URL = 'https://www.resultados.com.br/clientes/LABARANTES/LABARANTES.aspx';

  const handleRedirect = () => {
    window.open(RESULTS_URL, '_blank', 'noopener,noreferrer');
  };

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const timer = setTimeout(() => {
      handleRedirect();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-teal-50 via-white to-primary-teal-50 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-primary-teal-600">Resultados</span> Online
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Acesse seus resultados de exames de forma segura através do nosso sistema oficial.
            </p>
            
            {/* Botão Principal de Redirecionamento */}
            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-teal-500 to-primary-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Sistema de Resultados</CardTitle>
                  <p className="text-gray-600">Laboratório Arantes</p>
                </CardHeader>
                
                <CardContent className="text-center space-y-6">
                  

                  <Button 
                    onClick={handleRedirect}
                    className="w-full bg-gradient-to-r from-primary-teal-600 to-primary-teal-700 hover:from-primary-teal-700 hover:to-primary-teal-800 text-lg py-6"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Acessar Resultados Agora
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vantagens dos Resultados Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Praticidade e segurança para acessar seus exames quando e onde quiser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-teal-500 to-primary-teal-600 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Segurança Total</h3>
              <p className="text-gray-600 text-sm">
                Acesso protegido com criptografia e autenticação segura.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Disponível 24h</h3>
              <p className="text-gray-600 text-sm">
                Acesse seus resultados a qualquer hora, todos os dias.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Download PDF</h3>
              <p className="text-gray-600 text-sm">
                Baixe seus laudos em formato PDF para imprimir ou compartilhar.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Histórico Completo</h3>
              <p className="text-gray-600 text-sm">
                Visualize o histórico de todos os seus exames realizados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
