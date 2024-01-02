/* eslint-disable no-undef */
const Environments = Object.freeze({
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  serviceName: process.env.SERVICE_NAME,
  enableLogger: process.env.ENABLE_LOGGER,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  messageBirdAccessKey: process.env.MESSAGE_BIRD_ACCESS_KEY,
  watiAccessToken: process.env.WATI_ACCESS_TOKEN,
  watiBaseUri: process.env.WATI_BASE_URI,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
