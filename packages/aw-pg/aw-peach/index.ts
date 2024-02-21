/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePaymentProvider } from '../base';
import { env } from '@aw/env';
import { defaultPaymentLink } from './constants/default';
import { CheckoutPayload } from '../types/checkout';
import { AuthType, GenerateLinkType, ICustomer } from './interfaces/payment';
import { axiosClient } from '@aw/axios';

/** For More info Peach: https://developer.peachpayments.com/reference/post_checkout-initiate */
export class PeachPayment extends BasePaymentProvider {
  constructor(token: string) {
    super();
    axiosClient.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  async auth(): Promise<AuthType> {
    const url = `${env('peachAuthUri')}/oauth/token`;
    const response: { data: AuthType } = await axiosClient.post(url, {
      clientId: env('peachClientId'),
      clientSecret: env('peachClientSecretId'),
      merchantId: env('peachMerchantId'),
    });

    this.handleError(response, null, url);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async handleError(response: any, _requestPayload: any, _requestUrl: string): Promise<void> {
    // Handle your DB log Here
    if (response?.['errors'] || !response?.message) {
      throw new Error('Something went wrong!'); // Need to handle error
    }
  }

  async createCheckoutLink(payload: CheckoutPayload, notes: object = {}): Promise<string> {
    const paymentProp = {
      payment: {
        amount: payload.amount,
        currency: payload?.currency,
        merchantInvoiceId: payload.invoiceId,
        notes: Object.values(notes).join(','),
      },
      checkout: defaultPaymentLink.checkout,
      customer: {
        email: payload?.email,
        givenName: payload?.customerName,
        whatsapp: payload?.whatsapp,
        surname: payload?.customerName,
        mobile: payload?.whatsapp,
      } as ICustomer,
      options: {
        expiryTime: payload?.['expiryTime'],
        sendEmail: true,
      },
    };
    const url = `${env('peachBaseUri')}/channels/${env('peachEntityId')}/payments`;
    const response: { data: GenerateLinkType } = await axiosClient.post(url, paymentProp);

    this.handleError(response, null, url);
    return response?.data?.url as string;
  }

  verifyWebhook(_webhookBody: object, _webhookSignature: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
