import { GetAccessToken } from './accessToken/getAccessToken';
import { RefreshAccessToken } from './refreshAccessToken/refreshAccessToken';

export class Auth {
  protected _accessToken: GetAccessToken | undefined;
  protected _refreshAccessToken: RefreshAccessToken | undefined;
  protected payload: object;

  constructor(payload: object) {
    this.payload = payload;
    this.init();
  }

  private init(): void {
    this._accessToken = undefined;
    this._refreshAccessToken = undefined;
  }

  // hubspot class
  get accessToken(): GetAccessToken | undefined {
    if (!this._accessToken) this._accessToken = new GetAccessToken(this.payload);
    return this._accessToken;
  }
  get refreshAccessToken(): RefreshAccessToken | undefined {
    if (!this._refreshAccessToken) this._refreshAccessToken = new RefreshAccessToken(this.payload);
    return this._refreshAccessToken;
  }
}
