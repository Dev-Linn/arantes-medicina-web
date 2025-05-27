
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

const queryClient = new QueryClient();

const initialSiteDataObject = {
  phone: '(34) 3251-2055',
  whatsapp: '(34) 93251-2055',
  address: 'Avenida Joaquim Ribeiro de Gouveia, 1969 – Bairro Amoreiras, Santa Vitória – MG',
  workingHours: {
    weekdays: 'Segunda a Sexta: 07h às 17h',
    saturday: 'Sábado: 07h às 11h',
  },
  services: ['Análises Clínicas Gerais', 'Exames de Sangue', 'Exames de Urina', 'Exames Hormonais', 'Exames Cardiológicos', 'Check-up Completo'],
  convenios: ['SUS - Sistema Único de Saúde', 'Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'Particular'],
  socialMedia: {
    instagram: 'https://instagram.com/aranteslaboratorio',
    facebook: 'https://facebook.com/aranteslaboratorio',
  },
  homeTitle: 'Arantes Medicina Laboratorial<span class="text-primary-teal-600 block">Tradição e Qualidade</span>',
  homeSubtitle: 'Excelência em análises clínicas com mais de 30 anos de tradição em Santa Vitória',
  aboutText: 'O Laboratório Arantes é referência em análises clínicas na região, oferecendo serviços de alta qualidade com equipamentos modernos e profissionais especializados.',
};

const App = () => {
  const [siteData, setSiteData] = useState(initialSiteDataObject);

  const loadSiteData = useCallback(async () => {
    console.log('App.tsx: Attempting to load siteData...');
    try {
      const storedData = localStorage.getItem('arantesSiteConfig');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const mergedData = {
          ...initialSiteDataObject,
          ...parsedData,
          workingHours: {
            ...initialSiteDataObject.workingHours,
            ...(parsedData.workingHours || {}),
          },
          socialMedia: {
            ...initialSiteDataObject.socialMedia,
            ...(parsedData.socialMedia || {}),
          },
          services: parsedData.services && parsedData.services.length > 0 ? parsedData.services : initialSiteDataObject.services,
          convenios: parsedData.convenios && parsedData.convenios.length > 0 ? parsedData.convenios : initialSiteDataObject.convenios,
        };
        setSiteData(mergedData);
        console.log('App.tsx: siteData loaded/updated:', mergedData);
      } else {
        setSiteData(initialSiteDataObject);
        console.log('App.tsx: No siteData in localStorage, using initialSiteDataObject.');
      }
    } catch (error) {
      console.error('App.tsx: Error loading siteData from localStorage:', error);
      setSiteData(initialSiteDataObject);
      console.log('App.tsx: Error occurred, set siteData to initialSiteDataObject.');
    }
  }, []); // useCallback dependency array is empty as it doesn't depend on props/state from App

  useEffect(() => {
    loadSiteData(); // Initial load

    const handleSiteDataUpdate = () => {
      console.log('App.tsx: siteDataUpdated event received. Reloading data.');
      loadSiteData();
    };

    window.addEventListener('siteDataUpdated', handleSiteDataUpdate);

    return () => {
      window.removeEventListener('siteDataUpdated', handleSiteDataUpdate);
    };
  }, [loadSiteData]); // useEffect depends on loadSiteData

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header siteData={siteData} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index siteData={siteData} />} />
                <Route path="/sobre" element={<About siteData={siteData} />} />
                <Route path="/servicos" element={<Services siteData={siteData} />} />
                <Route path="/resultados" element={<Results />} /> {/* Results page might not need siteData */}
                <Route path="/contato" element={<Contact siteData={siteData} />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer siteData={siteData} />
            <WhatsAppFloat siteData={siteData} /> {/* Assuming WhatsAppFloat might also use it */}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
