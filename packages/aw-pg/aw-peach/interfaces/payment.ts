export interface IPaymentLink {
  payment: IPayment;
  customer: ICustomer;
  options: IOptions;
  checkout: ICheckout;
}

export interface IPayment {
  merchantInvoiceId: string;
  amount: number;
  currency: 'ZAR' | 'KES' | 'USD';
  files?: [];
  notes?: string;
}

export interface ICustomer {
  givenName: string;
  surname?: string;
  email: string;
  mobile?: string;
  whatsapp: string;
  billing?: {
    street1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface IOptions {
  sendEmail?: boolean;
  sendSms?: boolean;
  sendWhatsapp?: boolean;
  emailCc?: string;
  emailBcc?: string;
  expiryTime?: number;
  notificationUrl?: string;
}

export interface ICheckout {
  defaultPaymentMethod: string;
}

export interface IPeachData {
  amount: number;
  invoiceId: string;
  customer: ICustomer;
  notes: { [key: string]: string | number };
  expiryTime?: number;
}

export interface IPeachPayment {
  payment?: {
    id?: string;
    payment?: {
      linkId?: string;
      linkUrl?: string;
      amount?: number;
      entityId?: string;
      merchantInvoiceId?: string;
      currency?: string;
      notes?: string;
      expiryTime?: string;
      status?: string;
    };
    createdAt?: string;
    updatedAt?: string;
    customer?: {
      givenName?: string;
      surname?: string;
      email?: string;
      mobile?: string;
      whatsapp?: string;
      billing?: {
        street1?: null;
        city?: null;
        state?: null;
        postalCode?: null;
        country?: null;
      };
    };
    options?: {
      sendEmail?: false;
      sendSms?: false;
      sendWhatsapp?: false;
      emailCc?: string;
      emailBcc?: string;
      notificationUrl?: null;
    };
    checkout?: {
      defaultPaymentMethod?: null;
      forceDefaultMethod?: false;
      tokeniseCard?: false;
      registrationId?: null;
      checkoutId?: string;
      transactionUniqueId?: string;
      resultCode?: string;
      paymentBrand?: string;
    };
    source?: string;
    invoiceMetaData?: [];
    batchId?: null;
    termsOfService?: {
      id?: null;
      accepted?: false;
    };
  };
  audit?: [
    {
      oldStatus?: string;
      newStatus?: string;
      timestamp?: string;
    },
    {
      oldStatus?: string;
      newStatus?: string;
      timestamp?: string;
    },
    {
      oldStatus?: string;
      newStatus?: string;
      timestamp?: string;
    },
    {
      oldStatus?: string;
      newStatus?: string;
      timestamp?: string;
    },
  ];
}

export interface GenerateLinkType {
  url?: string;
  id: string;
}

export interface AuthType {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
}
