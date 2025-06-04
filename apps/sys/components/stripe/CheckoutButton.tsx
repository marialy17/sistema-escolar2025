'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ 
  planName = "Plan", 
  isAnnual = false, 
  popular = false,
  className = "",
  priceId = "" 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          planName: planName,
          billing: isAnnual ? 'annual' : 'monthly',
        }),
      });

      if (!res.ok) {
        throw new Error('Error al procesar el pago');
      }

      const data = await res.json();

      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({ sessionId: data.id });
      
      if (result?.error) {
        console.error(result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      alert('Hubo un error al procesar el pago. Por favor intenta de nuevo.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        disabled:cursor-not-allowed disabled:opacity-50
        ${popular
          ? `bg-gradient-to-r from-blue-600 to-purple-600 text-white 
             hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl
             focus:ring-blue-300 transform hover:scale-105 active:scale-95`
          : `bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200
             hover:border-gray-300 focus:ring-gray-300`
        }
        ${className}
      `}
    >
      <span className="flex items-center justify-center">
        {isLoading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Procesando...
          </>
        ) : (
          <>
            {popular && (
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            )}
            Comenzar con el plan: {planName}
          </>
        )}
      </span>
    </button>
  );
}