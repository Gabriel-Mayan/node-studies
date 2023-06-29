import { Request, Response, NextFunction } from "express";
import { UserRepository } from "@repositories/User";
import { validateToken } from "@helpers/handleToken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
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

    const { id, email } = tokenInfo;
    const user = await UserRepository.findUser({ id, email });

    if (!user) {
      return res.status(401).json("Auth Error");
    }

    next();
  } catch (error) {
    return res.status(401).json("Auth Error");
  }
};

export default auth;
