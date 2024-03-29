import { Response, NextFunction } from "express";
import { RequestWithUserRole } from "types/express";

import { UserRepository } from "@repositories/User";
import { validateToken } from "@helpers/handleToken";

const authentication = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json("Auth Error");
    }

    const token = authorization.replace("Bearer", "").trim();
    const tokenInfo = validateToken(token);

    if (typeof tokenInfo === "string") {
      return res.status(401).json("Auth Error");
    }

    const user = await UserRepository.findUser({ email: tokenInfo.email });

    if (!user) {
      return res.status(401).json("Auth Error");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json("Auth Error");
  }
};

export default authentication;
