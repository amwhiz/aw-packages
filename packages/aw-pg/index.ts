import { CheckoutPayload } from './types/checkout';
import { PaymentProvider } from './interfaces/paymentProvider';
import { AuthType } from './aw-peach/interfaces/payment';

export class PaymentProcessor {
  private provider: PaymentProvider;

  constructor(provider: PaymentProvider) {
    this.provider = provider;
  }

  async createCheckout(checkout: CheckoutPayload, notes: object): Promise<string | void> {
    return await this.provider.createCheckoutLink(checkout, notes);
  }

  async auth(): Promise<AuthType> {
    if ('auth' in this.provider) {
      return await this.provider.auth();
    } else {
      throw new Error('Access token is not supported by the provider.');
    }
  }
}
