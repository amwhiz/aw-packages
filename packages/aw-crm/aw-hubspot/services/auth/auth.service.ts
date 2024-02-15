import { Client } from '@hubspot/api-client';
import { AuthService } from '../../../interfaces/crmServices';
import { RefreshTokenRequest, TokenResponse } from '../interfaces/auth';

export class Auth implements AuthService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async token(tokenRequest: RefreshTokenRequest): Promise<TokenResponse | undefined> {
    try {
      return (await this.client.oauth.tokensApi.create(
        tokenRequest.grantType,
        tokenRequest?.code,
        tokenRequest?.redirectUri,
        tokenRequest?.clientId,
        tokenRequest?.clientSecret,
        tokenRequest?.refreshToken
      )) as TokenResponse;
    } catch (e) {
      return;
    }
  }

  async tokenInfo(token: string): Promise<TokenResponse | undefined> {
    try {
      return (await this.client.oauth.accessTokensApi.get(token)) as TokenResponse;
    } catch (e) {
      return;
    }
  }
}
