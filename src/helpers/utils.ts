import { IDatabaseUser, IFrontUser } from "types/user";

export const formatDatabaseUser = (databaseUser: IDatabaseUser): IFrontUser => {
  const { name, email } = databaseUser;

  const user = {
    name,
    email,
  };

  return user;
};
