/* eslint-disable no-undef */
const Environments = Object.freeze({
  cdsUserName: process.env.CDS_AUTH_USERNAME,
  cdsPassword: process.env.CDS_AUTH_PASSWORD,
  cdsEncryptionKey: process.env.SIM_ACTIVATION_ENCRYPTION_KEY,
  serviceName: process.env.SERVICE_NAME,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
