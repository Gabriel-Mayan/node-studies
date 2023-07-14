import { Response, NextFunction } from "express";
import { RequestWithUserRole } from "types/express";

const verifyPermissions = (
  userType: string,
) => async (request: RequestWithUserRole, response: Response, next: NextFunction) => {
  try {
    const { user } = request;

    if (!user) {
      return response.status(401).json("User not Found");
    }

    const isAuthorized = user.userType.name === userType;

    if (!isAuthorized) {
      return response.status(400).json("User Not Authorized");
    }

    next();
  } catch (error) {
    return response.status(401).json("Admin Error");
  }
};

export default verifyPermissions;
