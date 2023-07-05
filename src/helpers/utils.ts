import { IDatabaseUser, IFrontUser } from "types/user";

export const formatDatabaseUser = (databaseUser: IDatabaseUser): IFrontUser => {
  const { name, email, userType } = databaseUser;

  const user = {
    name,
    email,
    userType: userType.name,
  };

  return user;
};
