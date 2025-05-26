
import { useState } from 'react'; // useEffect will be removed
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

interface SiteDataForHeader {
  phone: string;
  // Add other fields from initialSiteDataObject if Header needs them
}

interface HeaderProps {
  siteData: SiteDataForHeader;
}

const Header = ({ siteData }: HeaderProps) => {
  console.log('Header.tsx received siteData prop:', siteData);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const formatPhoneNumber = (phone: string) => (phone || '').replace(/\D/g, '');

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Arantes</h1>
              <p className="text-sm text-blue-600 -mt-1">Medicina Laboratorial</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/resultados">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Resultados Online
              </Button>
            </Link>
            <a href={`tel:${formatPhoneNumber(siteData.phone)}`}>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                {siteData.phone || '(00) 0000-0000'}
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Arantes</h2>
                    <p className="text-xs text-blue-600">Medicina Laboratorial</p>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Link to="/resultados" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                      Resultados Online
                    </Button>
                  </Link>
                  <a href={`tel:${formatPhoneNumber(siteData.phone)}`} onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      {siteData.phone || '(00) 0000-0000'}
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
