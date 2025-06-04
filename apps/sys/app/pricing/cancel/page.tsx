'use client';

import React, { useState, useEffect } from 'react';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft, CreditCard, Shield, Headphones } from 'lucide-react';

const CancelPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const reasons = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Problema con el método de pago",
      description: "Tu tarjeta fue rechazada o expiró",
      action: "Actualizar método de pago"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Preocupaciones de seguridad",
      description: "Necesitas más información sobre la seguridad",
      action: "Ver política de seguridad"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Necesitas más información",
      description: "Quieres conocer mejor nuestros servicios",
      action: "Hablar con un experto"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header con animación */}
        <div className={`text-center transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Icono de cancelación */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <XCircle className="w-16 h-16 text-white" />
            </div>
            
            {/* Círculos decorativos */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Pago <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Cancelado</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No te preocupes, tu información está segura. No se realizó ningún cargo.
          </p>
        </div>

        {/* Mensaje principal */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Esperamos verte pronto!
              </h2>
              <p className="text-lg text-gray-600">
                Entendemos que a veces las cosas no salen como se espera. Estamos aquí para ayudarte.
              </p>
            </div>

            {/* Posibles razones */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                ¿Qué pudo haber pasado?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reasons.map((reason, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-200">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                      {reason.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{reason.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{reason.description}</p>
                    <button className="text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors duration-200">
                      {reason.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Intentar de nuevo
              </button>
              
              <button className="w-full sm:w-auto bg-white text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a los planes
              </button>
            </div>
          </div>
        </div>

        {/* Ofertas especiales */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Oferta especial */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">¡Oferta Especial!</h3>
                <p className="mb-4 opacity-90">
                  Por tiempo limitado, obtén 20% de descuento en tu primer mes.
                </p>
                <div className="bg-yellow-400 text-gray-900 inline-block px-4 py-2 rounded-lg font-bold mb-4">
                  Código: SEGUNDAOPORTUNIDAD
                </div>
                <br />
                <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Usar descuento
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            {/* Soporte */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
                <p className="text-gray-600 mb-6">
                  Nuestro equipo está disponible 24/7 para resolver cualquier duda o problema que tengas.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Chat en vivo
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    Enviar email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios rápidos */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-700 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Lo que dicen nuestros usuarios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana García</p>
                    <p className="text-sm text-gray-500">CEO, StartupXYZ</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  La plataforma transformó completamente nuestra productividad. ¡Increíble soporte!
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-green-600">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Miguel López</p>
                    <p className="text-sm text-gray-500">Freelancer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Fácil de usar y muy potente. El plan profesional vale cada centavo.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-purple-600">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sofia Ramos</p>
                    <p className="text-sm text-gray-500">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Las integraciones son perfectas. Ahorra horas de trabajo cada semana.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            ¿Tienes preguntas? Contáctanos en <a href="mailto:soporte@tuempresa.com" className="text-orange-600 hover:text-orange-700 transition-colors">soporte@tuempresa.com</a>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Tu información está completamente segura y no se realizó ningún cargo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;