'use client'

import { useState } from 'react';
import { Check, Star, Zap, Shield, Users, Crown } from 'lucide-react';
import CheckoutButton from '@/components/stripe/CheckoutButton';

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  icon: React.ReactNode;
  popular: boolean;
  features: string[];
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Básico",
      description: "Perfecto para empezar",
      monthlyPrice: 9,
      annualPrice: 90,
      monthlyPriceId: "price_1RWJBtPQte4Key5qtR58FewD",
      annualPriceId: "price_1RWKaPPQte4Key5qfLMPE3qa",
      icon: <Users className="w-6 h-6" />,
      popular: false,
      features: [
        "Hasta 5 proyectos",
        "5GB de almacenamiento",
        "Soporte por email",
        "Dashboard básico",
        "API básica"
      ]
    },
    {
      name: "Profesional",
      description: "Para equipos en crecimiento",
      monthlyPrice: 29,
      annualPrice: 290,
      monthlyPriceId: "price_1RWJYIPQte4Key5qhfLFyIr7",
      annualPriceId: "price_1RWJFePQte4Key5q4Hc293dK",
      icon: <Zap className="w-6 h-6" />,
      popular: true,
      features: [
        "Proyectos ilimitados",
        "100GB de almacenamiento",
        "Soporte prioritario 24/7",
        "Dashboard avanzado",
        "API completa",
        "Integraciones premium",
        "Analytics detallados"
      ]
    },
    {
      name: "Empresarial",
      description: "Para grandes organizaciones",
      monthlyPrice: 99,
      annualPrice: 990,
      monthlyPriceId: "price_1RWKbUPQte4Key5qayJRj5pd",
      annualPriceId: "price_1RWKbxPQte4Key5qmLGdSDyQ",
      icon: <Crown className="w-6 h-6" />,
      popular: false,
      features: [
        "Todo lo del plan Profesional",
        "Almacenamiento ilimitado",
        "Gerente de cuenta dedicado",
        "SLA garantizado",
        "Seguridad avanzada",
        "Implementación personalizada",
        "Capacitación del equipo",
        "Reportes personalizados"
      ]
    }
  ];

  const getPrice = (plan: Plan) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: Plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice;
    return monthlyCost - annualCost;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Planes y <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Precios</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Elige el plan perfecto para tu negocio. Todos incluyen nuestra garantía de 30 días.
          </p>

          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Anual
            </span>
            {isAnnual && (
              <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Ahorra hasta 20%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105 z-10' : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Más Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{isAnnual ? 'año' : 'mes'}
                    </span>
                  </div>

                  {isAnnual && (
                    <div className="text-sm text-green-600 font-semibold">
                      Ahorras ${getSavings(plan)} al año
                    </div>
                  )}
                </div>

                <CheckoutButton
                  planName={plan.name}
                  isAnnual={isAnnual}
                  popular={plan.popular}
                  priceId={isAnnual ? plan.annualPriceId : plan.monthlyPriceId}
                  className="mb-8"
                />

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        plan.popular ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-gray-600">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejarán en tu próxima facturación.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Ofrecen reembolsos?
              </h3>
              <p className="text-gray-600">
                Ofrecemos una garantía de reembolso de 30 días sin preguntas para todos nuestros planes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="text-gray-600">
                Aceptamos todas las tarjetas de crédito principales, PayPal y transferencias bancarias para planes empresariales.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Necesito ayuda para implementar?
              </h3>
              <p className="text-gray-600">
                Nuestro equipo de soporte está disponible para ayudarte. Los planes empresariales incluyen implementación dedicada.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Únete a más de 10,000 empresas que confían en nosotros
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Comenzar prueba gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
