/* eslint-disable no-undef */
const Environments = Object.freeze({
  cdsUserName: process.env.CDS_AUTH_USERNAME,
  cdsPassword: process.env.CDS_AUTH_PASSWORD,
  cdsEncryptionKey: process.env.SIM_ACTIVATION_ENCRYPTION_KEY,
  serviceName: process.env.SERVICE_NAME,
  region: process.env.REGION,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  messageBirdAccessKey: process.env.MESSAGE_BIRD_ACCESS_KEY,
  watiAccessToken: process.env.WATI_ACCESS_TOKEN,
  watiBaseUri: process.env.WATI_BASE_URI,
  stripeApiKey: process.env.STRIPE_API_KEY,
  googleCalenderAuthUrl: process.env.GOOGLE_CALENDER_AUTH_URL,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
