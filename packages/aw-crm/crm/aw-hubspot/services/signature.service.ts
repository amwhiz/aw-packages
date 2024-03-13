import * as crypto from 'crypto';
import { ISignatureOptions } from '../../../interfaces/signature';
import { SignatureService } from '../../../interfaces/crmServices';

/** For More info validating-requests: https://developers.hubspot.com/docs/api/webhooks/validating-requests */
export class Signature implements SignatureService {
  public static readonly MAX_ALLOWED_TIMESTAMP = 300000;

  private getSignature(method: string, signatureVersion: string, options: ISignatureOptions): string {
    let sourceString: string | null = null;
    switch (signatureVersion) {
      case 'v1':
        sourceString = options.clientSecret + options.requestBody;
        return crypto.createHash('sha256').update(sourceString).digest('hex');
      case 'v2':
        sourceString = options.clientSecret + method + options.url + options.requestBody;
        return crypto.createHash('sha256').update(sourceString).digest('hex');
      case 'v3':
        sourceString = method + options.url + options.requestBody + options.timestamp;
        return crypto.createHmac('sha256', options.clientSecret).update(sourceString).digest('base64');
      default:
        throw new Error(`Not supported signature version: ${signatureVersion}`);
    }
  }

  isValid({ method = 'POST', signatureVersion = 'v1', ...options }: ISignatureOptions): boolean {
    const hash = this.getSignature(method, signatureVersion, options);
    if (signatureVersion === 'v3') {
      const currentTime = Date.now();
      if (options.timestamp === undefined || currentTime - options.timestamp > Signature.MAX_ALLOWED_TIMESTAMP) {
        throw new Error('Timestamp is invalid, reject request');
      }
    }
    return options.signature === hash;
  }
}
