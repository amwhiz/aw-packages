import { AuthType } from '../aw-peach/interfaces/payment';
import { CheckoutPayload } from '../types/checkout';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentProvider {
  createCheckoutLink(payload: CheckoutPayload, notes?: object): Promise<string | void>;
  verifyWebhook(webhookBody: object, webhookSignature: string): Promise<boolean>;
  auth(): Promise<AuthType>;
}
