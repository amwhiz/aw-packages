/* eslint-disable no-undef */
import { createHmac } from 'crypto';

export class HmacVerifier {
  static isValid(secretKeyBase64: string, receivedBody: string, expectedHmac: string): boolean {
    const hmac = createHmac('sha256', Buffer.from(secretKeyBase64, 'base64'));
    hmac.update(JSON.stringify(JSON.parse(receivedBody)), 'ascii');
    const computedHmac = 'hmac-sha256=' + hmac.digest('hex');

    // Compare computed HMAC with expected HMAC
    return computedHmac === expectedHmac;
  }
}
