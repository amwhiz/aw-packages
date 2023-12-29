/* eslint-disable no-undef */
const Environments = Object.freeze({
  accessKey: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  serviceName: process.env.SERVICE_NAME,
  enableLogger: process.env.ENABLE_LOGGER,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
