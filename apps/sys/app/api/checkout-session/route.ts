import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID es requerido' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'subscription'],
    });

    console.log(session)

    const responseData = {
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      metadata: session.metadata,
      invoiceNumber: session.invoice,
      subscription: session.subscription,
      created: session.created,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    
    if (typeof error === 'object' && error !== null && 'type' in error && (error).type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Sesión de checkout no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error al obtener información de la sesión',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}