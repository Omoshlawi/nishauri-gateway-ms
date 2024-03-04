import { Entity } from "../../../shared/types";

export interface Account extends Entity {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

export interface User extends Entity {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  // gender  ?:        Gender
  accountVerified?: Date;
  image?: string;
  password?: string;
  lastLogin?: Date;
  active: boolean;
  accounts: Account[];
}
