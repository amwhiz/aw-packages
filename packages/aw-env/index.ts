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
  googleCalenderAuthUrl: process.env.GOOGLE_CALENDER_AUTH_URL,
  razorPayKeyId: process.env.RAZORPAY_KEY_ID,
  razorPaySecretKey: process.env.RAZORPAY_SECRET_KEY,
  razorPayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  bucketEndpoint: process.env.BUCKET_ENDPOINT,
  peachBaseUri: process.env.PEACH_BASE_URI,
  peachEntityId: process.env.PEACH_ENTITY_ID,
  peachClientId: process.env.PEACH_CLIENT_ID,
  peachClientSecretId: process.env.PEACH_CLIENT_SECRET_ID,
  peachMerchantId: process.env.PEACH_MERCHANT_ID,
  peachAuthUri: process.env.PEACH_AUTH_URI,
  stage: process.env.STAGE,
  parcelNinjaToken: process.env.PARCEL_NINJA_TOKEN,
  zeptoMailBaseUri: process.env.ZEPTO_MAIL_BASE_URI,
  mailProvider: process.env.MAIL_PROVIDER,
  zeptoMainAgentToken: process.env.ZEPTO_MAIL_AGENT_2_TOKEN,
  zeptoToken: process.env.ZEPTO_TOKEN,
  mailHost: process.env.MAIL_HOST,
  mailUserName: process.env.MAIL_SMTP_USER_NAME,
  schedulerRoleArn: process.env.SCHEDULER_ROLE_ARN,
  schedulerTargetArn: process.env.SCHEDULER_TARGET_ARN,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
