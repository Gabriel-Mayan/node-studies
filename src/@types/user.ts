export interface IDatabaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUpdatedUser {
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

export type ICreateUser = Omit<IDatabaseUser, "id" | "isActive"| "createdAt" | "updatedAt" | "deletedAt">;
export type IFrontUser = Omit<IDatabaseUser, "id" | "isActive" | "password" | "createdAt" | "updatedAt" | "deletedAt">;
export type IUserToken = Omit<IDatabaseUser, "name" | "isActive" | "password" | "createdAt" | "updatedAt" | "deletedAt">;
