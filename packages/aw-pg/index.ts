import { CheckoutPayload } from './types/checkout';
import { PaymentProvider } from './interfaces/paymentProvider';

export class PaymentProcessor {
  private provider: PaymentProvider;

  constructor(provider: PaymentProvider) {
    this.provider = provider;
  }

  async createCheckout(checkout: CheckoutPayload, notes: object): Promise<string | void> {
    return await this.provider.createCheckoutLink(checkout, notes);
  }
}
