export interface IUser {
  id: string;
  name: string;
  password?: string;
  email: string;
}

export interface IUserToken {
  id: number;
  name: string;
}
