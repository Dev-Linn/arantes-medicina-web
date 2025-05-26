
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

interface SiteDataForFooter {
  phone: string;
  address: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  // Add other fields from initialSiteDataObject if Footer needs them
}

interface FooterProps {
  siteData: SiteDataForFooter;
}

const Footer = ({ siteData }: FooterProps) => {
  const formatPhoneNumber = (phone: string) => (phone || '').replace(/\D/g, '');

  // Prepare address display (simple split by comma for now, can be enhanced)
  const addressParts = (siteData.address || 'Endereço Padrão').split(', ');


  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h3 className="font-bold">Arantes</h3>
                <p className="text-sm text-blue-400">Medicina Laboratorial</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Excelência em análises clínicas com tecnologia de ponta e atendimento humanizado em Santa Vitória-MG.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-400">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Início
              </Link>
              <Link to="/sobre" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Sobre Nós
              </Link>
              <Link to="/servicos" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Serviços
              </Link>
              <Link to="/resultados" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Resultados Online
              </Link>
              <Link to="/contato" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  {addressParts.map((part, index) => (
                    <span key={index}>{part}<br /></span>
                  ))}
                   {addressParts.length === 1 && <span>{siteData.address || 'Endereço Padrão'}</span>} {/* Fallback if no commas */}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a 
                  href={`tel:${formatPhoneNumber(siteData.phone)}`} 
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  {siteData.phone || '(00) 0000-0000'}
                </a>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-400">Horários</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p><strong>Segunda a Sexta:</strong></p>
                  <p>{(siteData.workingHours?.weekdays || '00h às 00h').replace('Segunda a Sexta: ', '')}</p>
                  <p className="mt-2"><strong>Sábado:</strong></p>
                  <p>{(siteData.workingHours?.saturday || '00h às 00h').replace('Sábado: ', '')}</p>
                </div>
              </div>
            </div>
            
            {/* Redes Sociais */}
            <div className="pt-4">
              <p className="text-sm font-medium text-blue-400 mb-2">Siga-nos</p>
              <div className="flex space-x-3">
                <a 
                  href={siteData.socialMedia?.instagram || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href={siteData.socialMedia?.facebook || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Arantes Medicina Laboratorial. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
