/* eslint-disable no-undef */
const Environments = Object.freeze({
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  serviceName: process.env.SERVICE_NAME,
  enableLogger: process.env.ENABLE_LOGGER,
  messageBirdAccessKey: process.env.MESSAGE_BIRD_ACCESS_KEY,
  watiAccessToken: process.env.WATI_ACCESS_TOKEN,
  watiBaseUri: process.env.WATI_BASE_URI,
  stripeApiKey: process.env.STRIPE_API_KEY,
  razorPayKeyId: process.env.RAZORPAY_KEY_ID,
  razorPaySecretKey: process.env.RAZORPAY_SECRET_KEY,
  razorPayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  bucketEndpoint: process.env.BUCKET_ENDPOINT,
  stage: process.env.STAGE,
  parcelNinjaToken: process.env.PARCEL_NINJA_TOKEN,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
