import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
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
  Edit,
  AlertTriangle
} from 'lucide-react';
import { 
  validateToken, 
  secureClearData, 
  getSecurityLogs,
  logSecurityEvent 
} from '@/utils/secureAuth';
import { validateSiteData } from '@/utils/validation';
import { initialSiteDataObject } from '@/config/site';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [siteData, setSiteData] = useState(initialSiteDataObject);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminAuthToken');
      
      if (!token || !validateToken(token)) {
        navigate('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      
      // Load saved site data
      const savedData = localStorage.getItem('arantesSiteConfig');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setSiteData(prev => ({ ...prev, ...parsedData }));
        } catch (error) {
          console.error('Error loading site data:', error);
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar as configurações salvas.",
            variant: "destructive"
          });
        }
      }
      
      setLoading(false);
      logSecurityEvent('DASHBOARD_ACCESSED');
    };

    checkAuth();

    // Warn user about unsaved changes when leaving
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [navigate, hasUnsavedChanges]);

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('Existem alterações não salvas. Deseja sair mesmo assim?');
      if (!confirm) return;
    }
    
    logSecurityEvent('MANUAL_LOGOUT');
    secureClearData();
    navigate('/admin/login');
  };

  const handleSave = () => {
    try {
      // Validate data before saving
      const validation = validateSiteData(siteData);
      if (!validation.success) {
        toast({
          title: "Erro de validação",
          description: validation.errors?.[0]?.message || "Verifique os dados inseridos",
          variant: "destructive"
        });
        return;
      }

      localStorage.setItem('arantesSiteConfig', JSON.stringify(siteData));
      window.dispatchEvent(new CustomEvent('siteDataUpdated', { detail: siteData }));
      
      setHasUnsavedChanges(false);
      toast({
        title: "Sucesso!",
        description: "Alterações salvas com sucesso.",
      });
      
      logSecurityEvent('SITE_CONFIG_UPDATED');
    } catch (error) {
      console.error('Error saving site data:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  const updateData = (field: string, value: any) => {
    setSiteData(prev => {
      // Handle nested objects
      const fields = field.split('.');
      if (fields.length === 1) {
        return { ...prev, [field]: value };
      }
      
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < fields.length - 1; i++) {
        current[fields[i]] = { ...current[fields[i]] };
        current = current[fields[i]];
      }
      current[fields[fields.length - 1]] = value;
      
      return newData;
    });
    setHasUnsavedChanges(true);
  };

  const addListItem = (listName: 'services' | 'convenios') => {
    const newItem = prompt(`Digite o nome do novo ${listName === 'services' ? 'serviço' : 'convênio'}:`);
    if (newItem?.trim()) {
      updateData(listName, [...siteData[listName], newItem.trim()]);
    }
  };

  const removeListItem = (listName: 'services' | 'convenios', index: number) => {
    const confirm = window.confirm(`Deseja realmente remover este ${listName === 'services' ? 'serviço' : 'convênio'}?`);
    if (confirm) {
      updateData(listName, siteData[listName].filter((_, i) => i !== index));
    }
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
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              {hasUnsavedChanges && (
                <div className="text-sm text-amber-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Alterações não salvas
                </div>
              )}
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
                      placeholder="(XX) XXXX-XXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={siteData.whatsapp}
                      onChange={(e) => updateData('whatsapp', e.target.value)}
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={siteData.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    placeholder="contato@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Textarea
                    id="address"
                    value={siteData.address}
                    onChange={(e) => updateData('address', e.target.value)}
                    rows={3}
                    placeholder="Rua, número, bairro, cidade - UF"
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
                    value={siteData.workingHours.weekdays}
                    onChange={(e) => updateData('workingHours.weekdays', e.target.value)}
                    placeholder="07h às 17h"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saturdayHours">Sábado</Label>
                  <Input
                    id="saturdayHours"
                    value={siteData.workingHours.saturday}
                    onChange={(e) => updateData('workingHours.saturday', e.target.value)}
                    placeholder="07h às 11h"
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
                    value={siteData.socialMedia.instagram}
                    onChange={(e) => updateData('socialMedia.instagram', e.target.value)}
                    placeholder="https://instagram.com/seu_perfil"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={siteData.socialMedia.facebook}
                    onChange={(e) => updateData('socialMedia.facebook', e.target.value)}
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
                    <Button onClick={() => addListItem('services')} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {siteData.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                        <span>{service}</span>
                        <Button
                          onClick={() => removeListItem('services', index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {siteData.services.length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        Nenhum serviço cadastrado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Convênios
                    <Button onClick={() => addListItem('convenios')} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {siteData.convenios.map((convenio, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                        <span>{convenio}</span>
                        <Button
                          onClick={() => removeListItem('convenios', index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {siteData.convenios.length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        Nenhum convênio cadastrado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={handleSave} 
            size="lg" 
            className="shadow-lg"
            disabled={!hasUnsavedChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            {hasUnsavedChanges ? 'Salvar Alterações' : 'Alterações Salvas'}
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