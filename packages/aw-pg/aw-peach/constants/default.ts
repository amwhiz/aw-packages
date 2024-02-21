export const defaultPaymentLink = {
  payment: {
    merchantInvoiceId: '',
    amount: 0,
    currency: '',
    files: [],
    notes: '',
  },
  customer: {
    givenName: '',
    surname: '',
    email: '',
    mobile: '',
    whatsapp: '',
    billing: {
      street1: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  },
  options: {
    sendEmail: false,
    sendSms: false,
    sendWhatsapp: false,
    emailCc: '',
    emailBcc: '',
    expiryTime: 5,
    notificationUrl: '',
  },
  checkout: {
    defaultPaymentMethod: '',
  },
};
