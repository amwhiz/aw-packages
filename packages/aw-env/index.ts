/* eslint-disable no-undef */
const Environments = Object.freeze({
  cdsUserName: process.env.CDS_AUTH_USERNAME,
  cdsPassword: process.env.CDS_AUTH_PASSWORD,
  cdsEncryptionKey: process.env.SIM_ACTIVATION_ENCRYPTION_KEY,
  region: process.env.REGION,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  messageBirdAccessKey: process.env.MESSAGE_BIRD_ACCESS_KEY,
});

type KeyType = keyof typeof Environments;

export const env = (key: KeyType): string | null => Environments?.[key] || null;
