import { BasePaymentProvider } from '../base';
import Razorpay from 'razorpay';
import { env } from '@aw/env';
import { DEFAULT } from './constants/default';
import { CheckoutPayload } from '../types/checkout';
import { PaymentLinks } from 'razorpay/dist/types/paymentLink';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

// More info https://razorpay.com/docs/api/payments/payment-links
export class RazorPayPayment extends BasePaymentProvider {
  private client: Razorpay;

  constructor() {
    super();
    this.client = new Razorpay({
      key_id: env('razorPayKeyId') as string,
      headers: {
        'Content-Type': 'application/json',
      },
      key_secret: env('razorPaySecretKey') as string,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlerError(err: any): void {
    throw new Error(err);
  }

  async createCheckoutLink(payload: CheckoutPayload, notes: PaymentLinks.RazorpayPaymentLinkBaseRequestBody['notes'] = {}): Promise<string | void> {
    const checkoutRequest: PaymentLinks.RazorpayPaymentLinkCreateRequestBody = {
      amount: parseFloat(Number(payload.amount).toFixed(2)) * 100,
      customer: {
        name: payload?.customerName,
        contact: payload?.whatsapp,
        email: payload?.email,
      },
      accept_partial: false,
      callback_url: DEFAULT.callBackURL,
      currency: DEFAULT.currency?.toLowerCase(),
      expire_by: payload.expireAt,
      description: payload?.description,
      notes: notes,
      notify: {
        email: true,
        whatsapp: !!payload?.whatsapp,
      },
      reference_id: payload?.invoiceId,
    };

    const checkoutSessionUrl: PaymentLinks.RazorpayPaymentLink | void = await this.client.paymentLink
      .create(checkoutRequest)
      .catch((e) => this.handlerError(e));
    return checkoutSessionUrl?.short_url;
  }

  async verifyWebhook(webhookBody: object, webhookSignature: string): Promise<boolean> {
    try {
      const webhookBodyNew = JSON.stringify(webhookBody).replace(/\//g, '\\/');
      return validateWebhookSignature(webhookBodyNew, webhookSignature, env('razorPayWebhookSecret') as string);
    } catch (e) {
      return false;
    }
  }
}
