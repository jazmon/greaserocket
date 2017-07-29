export interface Auth0ExtraInfo {
  locale?: string;
  family_name?: string;
  gender?: string;
  given_name?: string;
  updated_at: string;
  clientID?: string;
  global_client_id?: string;
}

export interface Auth0Identity {
  social: boolean;
  provider: string;
  identityId: string;
  userId: string;
  connection: string;
}

export interface Auth0Profile {
  name: string;
  nickname: string;
  picture: string;
  userId: string;
  email?: string;
  email_verified?: string;
  createdAt: number;
  extraInfo?: Auth0ExtraInfo;
  identities: Auth0Identity[];
}

export interface Auth0Token {
  refreshToken: string;
  tokenType: string;
  accessToken: string;
  idToken: string;
}
