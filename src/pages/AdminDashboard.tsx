import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Users, 
  FileText, 
  Phone, 
  BarChart3, 
  Settings, 
  Save, 
  LogOut, 
  Eye,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { 
  validateToken, 
  secureClearData, 
  getSecurityLogs,
  logSecurityEvent 
} from '@/utils/secureAuth';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dados do site
  const [siteData, setSiteData] = useState({
    // Contato
    phone: '(34) 3251-2055',
    whatsapp: '(34) 93251-2055',
    email: 'contato@aranteslaboratorio.com.br',
    address: 'Avenida Joaquim Ribeiro de Gouveia, 1969 – Bairro Amoreiras, Santa Vitória – MG',
    
    // Horários
    weekdaysHours: 'Segunda a Sexta: 07h às 17h',
    saturdayHours: 'Sábado: 07h às 11h',
    sundayHours: 'Domingo: Fechado',
    
    // Redes sociais
    instagram: 'https://instagram.com/aranteslaboratorio',
    facebook: 'https://facebook.com/aranteslaboratorio',
    
    // Conteúdo
    homeTitle: 'Arantes Medicina Laboratorial',
    homeSubtitle: 'Excelência em análises clínicas com mais de 30 anos de tradição em Santa Vitória',
    aboutText: 'O Laboratório Arantes é referência em análises clínicas na região, oferecendo serviços de alta qualidade com equipamentos modernos e profissionais especializados.',
    missionText: 'Nossa missão é fornecer resultados precisos e confiáveis para auxiliar no diagnóstico e tratamento de nossos pacientes.',
    
    // Listas
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
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminAuthToken');
      
      if (!token || !validateToken(token)) {
        navigate('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      
      // Carregar dados salvos do site
      const savedData = localStorage.getItem('arantesSiteConfig');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setSiteData(prev => ({ ...prev, ...parsedData }));
        } catch (error) {
          console.error('Erro ao carregar dados do site:', error);
        }
      }
      
      setLoading(false);
      logSecurityEvent('DASHBOARD_ACCESSED');
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    logSecurityEvent('MANUAL_LOGOUT');
    secureClearData();
    navigate('/admin/login');
  };

  const handleSave = () => {
    try {
      localStorage.setItem('arantesSiteConfig', JSON.stringify(siteData));
      window.dispatchEvent(new CustomEvent('siteDataUpdated', { detail: siteData }));
      alert('✅ Salvo com sucesso!');
      logSecurityEvent('SITE_CONFIG_UPDATED');
    } catch (error) {
      alert('❌ Erro ao salvar!');
    }
  };

  const updateData = (field: string, value: any) => {
    setSiteData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    const newService = prompt('Digite o nome do novo serviço:');
    if (newService) {
      setSiteData(prev => ({
        ...prev,
        services: [...prev.services, newService]
      }));
    }
  };

  const removeService = (index: number) => {
    setSiteData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addConvenio = () => {
    const newConvenio = prompt('Digite o nome do novo convênio:');
    if (newConvenio) {
      setSiteData(prev => ({
        ...prev,
        convenios: [...prev.convenios, newConvenio]
      }));
    }
  };

  const removeConvenio = (index: number) => {
    setSiteData(prev => ({
      ...prev,
      convenios: prev.convenios.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-teal-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-600">Gerenciar conteúdo do site</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                     <TabsList className="grid w-full grid-cols-4">
             <TabsTrigger value="overview">Visão Geral</TabsTrigger>
             <TabsTrigger value="content">Conteúdo</TabsTrigger>
             <TabsTrigger value="contact">Contato</TabsTrigger>
             <TabsTrigger value="services">Serviços</TabsTrigger>
           </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary-teal-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Visitantes Hoje</p>
                      <p className="text-2xl font-bold text-gray-900">247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Consultas Resultados</p>
                      <p className="text-2xl font-bold text-gray-900">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Phone className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Contatos WhatsApp</p>
                      <p className="text-2xl font-bold text-gray-900">34</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <Button onClick={() => setActiveTab('content')} className="justify-start">
                     <Edit className="h-4 w-4 mr-2" />
                     Editar Conteúdo
                   </Button>
                   <Button onClick={() => setActiveTab('contact')} className="justify-start">
                     <Phone className="h-4 w-4 mr-2" />
                     Editar Contato
                   </Button>
                   <Button onClick={() => setActiveTab('services')} className="justify-start">
                     <Settings className="h-4 w-4 mr-2" />
                     Gerenciar Serviços
                   </Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

                     {/* Content Management */}
           <TabsContent value="content" className="space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Textos do Site</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="homeTitle">Título Principal</Label>
                   <Input
                     id="homeTitle"
                     value={siteData.homeTitle}
                     onChange={(e) => updateData('homeTitle', e.target.value)}
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="homeSubtitle">Subtítulo</Label>
                   <Input
                     id="homeSubtitle"
                     value={siteData.homeSubtitle}
                     onChange={(e) => updateData('homeSubtitle', e.target.value)}
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="aboutText">Texto Sobre Nós</Label>
                   <Textarea
                     id="aboutText"
                     value={siteData.aboutText}
                     onChange={(e) => updateData('aboutText', e.target.value)}
                     rows={4}
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="missionText">Texto da Missão</Label>
                   <Textarea
                     id="missionText"
                     value={siteData.missionText}
                     onChange={(e) => updateData('missionText', e.target.value)}
                     rows={3}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Contact Management */}
           <TabsContent value="contact" className="space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Informações de Contato</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="phone">Telefone</Label>
                     <Input
                       id="phone"
                       value={siteData.phone}
                       onChange={(e) => updateData('phone', e.target.value)}
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <Label htmlFor="whatsapp">WhatsApp</Label>
                     <Input
                       id="whatsapp"
                       value={siteData.whatsapp}
                       onChange={(e) => updateData('whatsapp', e.target.value)}
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     value={siteData.email}
                     onChange={(e) => updateData('email', e.target.value)}
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="address">Endereço</Label>
                   <Textarea
                     id="address"
                     value={siteData.address}
                     onChange={(e) => updateData('address', e.target.value)}
                     rows={3}
                   />
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Horários de Funcionamento</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="weekdaysHours">Segunda a Sexta</Label>
                   <Input
                     id="weekdaysHours"
                     value={siteData.weekdaysHours}
                     onChange={(e) => updateData('weekdaysHours', e.target.value)}
                     placeholder="Ex: 07h às 17h"
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="saturdayHours">Sábado</Label>
                   <Input
                     id="saturdayHours"
                     value={siteData.saturdayHours}
                     onChange={(e) => updateData('saturdayHours', e.target.value)}
                     placeholder="Ex: 07h às 11h"
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="sundayHours">Domingo</Label>
                   <Input
                     id="sundayHours"
                     value={siteData.sundayHours}
                     onChange={(e) => updateData('sundayHours', e.target.value)}
                     placeholder="Ex: Fechado"
                   />
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <CardTitle>Redes Sociais</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="instagram">Instagram</Label>
                   <Input
                     id="instagram"
                     value={siteData.instagram}
                     onChange={(e) => updateData('instagram', e.target.value)}
                     placeholder="https://instagram.com/seu_perfil"
                   />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="facebook">Facebook</Label>
                   <Input
                     id="facebook"
                     value={siteData.facebook}
                     onChange={(e) => updateData('facebook', e.target.value)}
                     placeholder="https://facebook.com/sua_pagina"
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

          {/* Services & Convenios */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Serviços
                    <Button onClick={addService} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {siteData.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span>{service}</span>
                        <Button
                          onClick={() => removeService(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Convênios
                    <Button onClick={addConvenio} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {siteData.convenios.map((convenio, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span>{convenio}</span>
                        <Button
                          onClick={() => removeConvenio(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        {/* Info */}
        <Alert className="mt-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Dashboard simplificado e funcional. Edite o conteúdo do site e clique em "Salvar Alterações" para aplicar as mudanças.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default AdminDashboard; 
