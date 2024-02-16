export type CheckoutPayload = {
  email: string;
  amount: number;
  expireAt: number;
  customerName: string;
  description: string;
  whatsapp?: string;
  invoiceId: string;
  currency?: string;
};
