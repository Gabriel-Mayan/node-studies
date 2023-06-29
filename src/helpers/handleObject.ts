import { IDatabaseUser, IFrontUser } from "types/user";

export const formatDatabaseUser = (databaseUser: IDatabaseUser): IFrontUser => {
  const {
    createdAt, updatedAt, deletedAt, password, ...user
  } = databaseUser;

  return user;
};
