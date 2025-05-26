
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "5534932512055";
    const message = "Olá! Gostaria de mais informações sobre os serviços do laboratório Arantes.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Tooltip */}
      {showTooltip && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs animate-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Precisa de ajuda?</p>
              <p className="text-xs text-gray-600 mt-1">Converse conosco no WhatsApp!</p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom-2"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
};

export default WhatsAppFloat;
