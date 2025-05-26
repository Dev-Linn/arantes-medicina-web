
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  Phone, 
  Clock, 
  MapPin, 
  LogOut,
  Save,
  Eye,
  Edit
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState({
    phone: '(34) 3251-2055',
    whatsapp: '(34) 3251-2055',
    address: 'Avenida Joaquim Ribeiro de Gouveia, 1969 – Bairro Amoreiras, Santa Vitória – MG',
    workingHours: {
      weekdays: 'Segunda a Sexta: 07h às 17h',
      saturday: 'Sábado: 07h às 11h'
    },
    services: [
      'Análises clínicas',
      'Coleta domiciliar',
      'Convênios médicos'
    ],
    socialMedia: {
      instagram: '',
      facebook: ''
    }
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin');
    }

    const savedData = localStorage.getItem('arantesSiteConfig');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSiteData(parsedData);
      } catch (error) {
        console.error("Failed to parse site data from localStorage", error);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleSave = () => {
    try {
      localStorage.setItem('arantesSiteConfig', JSON.stringify(siteData));
      window.dispatchEvent(new CustomEvent('siteDataUpdated'));
      console.log('siteDataUpdated event dispatched from AdminDashboard');
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error("Failed to save site data to localStorage", error);
      alert('Erro ao salvar configurações.');
    }
  };

  const stats = [
    { title: 'Visitantes Hoje', value: '247', icon: Users, color: 'blue' },
    { title: 'Acessos Resultados', value: '89', icon: FileText, color: 'green' },
    { title: 'Ligações Recebidas', value: '34', icon: Phone, color: 'purple' },
    { title: 'WhatsApp Mensagens', value: '56', icon: BarChart3, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard Administrativo</h1>
                <p className="text-sm text-gray-600">Arantes Medicina Laboratorial</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs de Configuração */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Configurações Gerais */}
          <TabsContent value="general">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configurações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({...siteData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={siteData.whatsapp}
                      onChange={(e) => setSiteData({...siteData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    value={siteData.address}
                    onChange={(e) => setSiteData({...siteData, address: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weekdays">Horário Semana</Label>
                    <Input
                      id="weekdays"
                      value={siteData.workingHours.weekdays}
                      onChange={(e) => setSiteData({
                        ...siteData, 
                        workingHours: {...siteData.workingHours, weekdays: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="saturday">Horário Sábado</Label>
                    <Input
                      id="saturday"
                      value={siteData.workingHours.saturday}
                      onChange={(e) => setSiteData({
                        ...siteData, 
                        workingHours: {...siteData.workingHours, saturday: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/arantes"
                      value={siteData.socialMedia.instagram}
                      onChange={(e) => setSiteData({
                        ...siteData, 
                        socialMedia: {...siteData.socialMedia, instagram: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/arantes"
                      value={siteData.socialMedia.facebook}
                      onChange={(e) => setSiteData({
                        ...siteData, 
                        socialMedia: {...siteData.socialMedia, facebook: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Conteúdo */}
          <TabsContent value="content">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="h-5 w-5 mr-2" />
                  Gerenciar Conteúdo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="homeTitle">Título da Página Inicial</Label>
                  <Input
                    id="homeTitle"
                    defaultValue="Excelência em Análises Clínicas"
                    placeholder="Digite o título principal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homeSubtitle">Subtítulo da Página Inicial</Label>
                  <Textarea
                    id="homeSubtitle"
                    defaultValue="Tecnologia de ponta, precisão em cada resultado e atendimento humanizado para cuidar da sua saúde com a confiança que você merece."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutText">Texto Sobre Nós</Label>
                  <Textarea
                    id="aboutText"
                    defaultValue="Há mais de 15 anos cuidando da saúde da comunidade de Santa Vitória-MG com excelência, tecnologia de ponta e atendimento humanizado."
                    rows={4}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Atualizar Conteúdo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Serviços */}
          <TabsContent value="services">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Gerenciar Serviços
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Serviços Oferecidos</Label>
                  {siteData.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={service}
                        onChange={(e) => {
                          const newServices = [...siteData.services];
                          newServices[index] = e.target.value;
                          setSiteData({...siteData, services: newServices});
                        }}
                      />
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remover
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Adicionar Novo Serviço
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="convenios">Convênios Aceitos</Label>
                  <Textarea
                    id="convenios"
                    placeholder="Liste os convênios aceitos (um por linha)"
                    rows={5}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Serviços
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações SEO */}
          <TabsContent value="seo">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Configurações SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Título da Página (Meta Title)</Label>
                  <Input
                    id="metaTitle"
                    defaultValue="Arantes Medicina Laboratorial - Análises Clínicas de Excelência"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500">Máximo 60 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Descrição da Página (Meta Description)</Label>
                  <Textarea
                    id="metaDescription"
                    defaultValue="Laboratório de análises clínicas em Santa Vitória-MG. Exames precisos, tecnologia de ponta e atendimento humanizado. Coleta domiciliar disponível."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">Máximo 160 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Palavras-chave</Label>
                  <Input
                    id="keywords"
                    defaultValue="laboratório, análises clínicas, exames, santa vitória, coleta domiciliar, resultados online"
                    placeholder="Separe as palavras-chave por vírgula"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analytics">Google Analytics ID</Label>
                  <Input
                    id="analytics"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações SEO
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
