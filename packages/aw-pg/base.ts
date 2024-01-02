import { CheckoutPayload } from './types/checkout';
import { PaymentProvider } from './interfaces/paymentProvider';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BasePaymentProvider implements PaymentProvider {
  abstract createCheckoutLink(CheckoutPayload: CheckoutPayload, notes?: object): Promise<string>;
}
