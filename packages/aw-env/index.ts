/* eslint-disable no-undef */
const Environments = Object.freeze({
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  queueUrl: process.env.QUEUE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET_ID,
  serviceName: process.env.SERVICE_NAME,
  enableLogger: process.env.ENABLE_LOGGER,
  hubClientSecret: process.env.HUB_CLIENT_SECRET,
  lambdaUri: process.env.LAMBDA_URI,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
