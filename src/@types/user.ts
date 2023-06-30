export interface IDatabaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUpdatedUser {
  name?: string;
  email?: string;
  password?: string;
}

export type ICreateUser = Omit<IDatabaseUser, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type IFrontUser = Omit<IDatabaseUser, "password" | "createdAt" | "updatedAt" | "deletedAt">;
export type IUserToken = Omit<IDatabaseUser, "name" | "password" | "createdAt" | "updatedAt" | "deletedAt">;
