import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { sendResponse } from "../utils/response";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

const access = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return sendResponse(res, 401, false, "Forbidden");
      }

      if (!session.user.emailVerified) {
        return sendResponse(res, 403, false, "Email varification required");
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return sendResponse(res, 403, false, "Forbidden");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default access;
