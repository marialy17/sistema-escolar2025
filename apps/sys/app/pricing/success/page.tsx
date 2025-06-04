'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Mail, Calendar, CreditCard, Download, ArrowRight, Home, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  type SessionType = {
    metadata?: {
      plan_name?: string;
      billing_cycle?: string;
      created_at?: string; 
    };
    amount_total: number;
    customer_email: string;
    currency?: string;
    invoiceNumber?: string;
    subscription?: {
      id: string;
      current_period_end: number;
    }

  };

  const [session, setSession] = useState<SessionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener información de la sesión');
        }
        
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error(error)
        setError("Error al cargar los datos de la sesión, Por favor intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
    setTimeout(() => setIsLoaded(true), 300);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Verificando tu pago...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error al Verificar el Pago
          </h1>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.href = '/pricing'}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Volver a Precios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className={`text-center transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>

          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white animate-pulse" />
            </div>
            
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            ¡Pago <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Exitoso</span>!
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Tu suscripción ha sido activada correctamente. ¡Bienvenido a bordo!
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
            {session && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  Detalles de tu Suscripción
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Plan seleccionado:</span>
                    <span className="font-semibold text-gray-900">{session.metadata?.plan_name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Cantidad pagada:</span>
                    <span className="font-semibold text-gray-900">{(session.amount_total/ 100).toFixed(2) } {session.currency?.toUpperCase()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Frecuencia:</span>
                    <span className="font-semibold text-gray-900 capitalize">{session.metadata?.billing_cycle === 'annual' ? 'Anual' : 'Mensual'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-gray-900">{session.customer_email}</span>
                  </div>

                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                  ¿Qué sigue?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Revisa tu email</h3>
                      <p className="text-gray-600 text-sm">Te hemos enviado la confirmación y recibo a tu correo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Accede a tu cuenta</h3>
                      <p className="text-gray-600 text-sm">Tu plan ya está activo y puedes comenzar a usar todas las funcionalidades.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Configura tu perfil</h3>
                      <p className="text-gray-600 text-sm">Personaliza tu experiencia y configura tus preferencias.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        <div className={`text-center transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
              Ir al Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button className="w-full sm:w-auto bg-white text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Descargar Recibo
            </button>
          </div>

          <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto">
            <Home className="w-4 h-4 mr-2" />
            Volver al inicio
          </button>
        </div>

        <div className={`max-w-4xl mx-auto mt-12 transition-all duration-1000 delay-700 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">¿Necesitas ayuda?</h3>
            <p className="opacity-90 mb-4">
              Nuestro equipo de soporte está aquí para ayudarte en cualquier momento.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Contactar Soporte
            </button>
          </div>
        </div>
        {session && (
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Número de factura: {session.invoiceNumber} | ID de suscripción: {session.subscription?.id}</p>
        </div>
        )}
      </div>
    </div>
  );
};
