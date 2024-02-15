import { GrantType } from '../types/grantType';

export interface RefreshTokenRequest {
  grantType: GrantType;
  code?: string;
  redirectUri?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType?: string;
  token: string;
  user?: string;
  hubDomain?: string;
  scopes?: Array<string>;
  scopeToScopeGroupPks?: Array<number>;
  trialScopes?: Array<string>;
  trialScopeToScopeGroupPks?: Array<number>;
  hubId?: number;
  appId?: number;
  userId?: number;
}
