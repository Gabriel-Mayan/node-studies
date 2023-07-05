export interface IDatabaseRecovery {
  id: string;
  user: any;
  createdAt: Date;
  expiresIn: Date;
}

export type ICreateRecovery = Omit< IDatabaseRecovery, "createdAt" >;
