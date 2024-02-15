import { CheckoutPayload } from '../types/checkout';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentProvider {
  createCheckoutLink(payload: CheckoutPayload, notes?: object): Promise<string | void>;
  verifyWebhook(webhookBody: object, webhookSignature: string): Promise<boolean>;
}
