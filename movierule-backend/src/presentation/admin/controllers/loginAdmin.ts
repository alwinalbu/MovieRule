import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const loginAdminController = (dependencies: IAdminDependencies) => {
  const {
    useCases: { loginAdminUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const isProduction = process.env.NODE_ENV === "production";

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const admin = await loginAdminUseCase(dependencies).execute(
        email,
        password
      );

      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = generateAccessToken({
        _id: String(admin._id),
        email: admin.email!,
        role: admin.role!,
      });
      const refreshToken = generateRefreshToken({
        _id: String(admin._id),
        email: admin.email!,
        role: admin.role!,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
      });

      return res.status(200).json({
        message: "Login successful",
        data: admin,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
