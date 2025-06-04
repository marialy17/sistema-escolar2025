import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceId, planName, billing} = body;

    if (!priceId || !planName || !billing) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: priceId y planName' },
        { status: 400 }
      );
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing/cancel`,

      metadata: {
        plan_name: body.planName,
        billing_cycle: body.billing,
        created_at: new Date().toISOString(),
      },
      
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

    return NextResponse.json({ 
      id: session.id,
      url: session.url,
      customer: session.customer,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
        code: typeof error === 'object' && error !== null && 'code' in error ? (error).code : 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}
