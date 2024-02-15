/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePaymentProvider } from '../base';
import Stripe from 'stripe';
import { env } from '@aw/env';
import { DEFAULT } from './constants/default';
import { CheckoutPayload } from '../types/checkout';

export class StripePayment extends BasePaymentProvider {
  private client: Stripe;

  constructor() {
    super();
    this.client = new Stripe(env('stripeApiKey') as string);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlerError(err: any): void {
    throw new Error(err);
  }

  async createCheckoutLink(payload: CheckoutPayload, notes: Stripe.MetadataParam = {}): Promise<string> {
    const checkoutRequest: Stripe.Checkout.SessionCreateParams = {
      customer_email: payload?.email,
      metadata: notes,
      allow_promotion_codes: true,
      success_url: DEFAULT.urls.successUrl,
      cancel_url: DEFAULT.urls.cancelUrl,
      phone_number_collection: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: DEFAULT.currency,
            unit_amount: parseFloat(Number(payload.amount).toFixed(2)) * 100,
          },
          quantity: 1,
        },
      ],
      submit_type: 'auto',
      mode: 'payment',
    };

    const checkoutSessionUrl = await this.client.checkout.sessions.create(checkoutRequest).catch((e) => this.handlerError(e));
    return checkoutSessionUrl?.url as string;
  }

  verifyWebhook(_webhookBody: object, _webhookSignature: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
