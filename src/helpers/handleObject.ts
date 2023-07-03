import { IDatabaseUser, IFrontUser } from "types/user";

export const formatDatabaseUser = (databaseUser: IDatabaseUser): IFrontUser => {
  const {
    id, password, createdAt, updatedAt, deletedAt, ...user
  } = databaseUser;

  return user;
};
