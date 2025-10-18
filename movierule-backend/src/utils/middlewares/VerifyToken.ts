import jwt from "jsonwebtoken";
import { generateAccessToken } from "../jwt";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  _id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
export const jwtMiddleware =
  (roles?: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { access_token, refresh_token } = req.cookies;

      if (!access_token && !refresh_token) {
        res.status(401).json({ success: false, message: "No token provided" });
        return;
      }

      let user: UserPayload | undefined = undefined;

      // ✅ verify access token
      if (access_token) {
        try {
          user = jwt.verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET!
          ) as UserPayload;
        } catch (error) {
          console.warn("Access token invalid/expired");
        }
      }

      // ✅ fallback to refresh token
      if (!user && refresh_token) {
        try {
          user = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET!
          ) as UserPayload;

          if (user) {
            const newAccessToken = generateAccessToken(user);
            res.cookie("access_token", newAccessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
          }
        } catch (error) {
          res
            .status(401)
            .json({ success: false, message: "Invalid refresh token" });
          return;
        }
      }

      if (!user) {
        res
          .status(401)
          .json({ success: false, message: "Authentication failed" });
        return;
      }

      // ✅ if roles specified, check match
      if (roles && !roles.includes(user.role)) {
        res.status(403).json({ success: false, message: "Forbidden" });
        return;
      }

      req.user = user; // ✅ always UserPayload | undefined
      next();
    } catch (error) {
      console.error("Error in JWT middleware:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
