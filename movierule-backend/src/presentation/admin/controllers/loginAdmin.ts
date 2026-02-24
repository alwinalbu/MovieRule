import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response, CookieOptions } from "express";

export const loginAdminController = (dependencies: IAdminDependencies) => {
  const {
    useCases: { loginAdminUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // ✅ Verify credentials
      const admin = await loginAdminUseCase(dependencies).execute(
        email,
        password
      );

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // ✅ Generate tokens
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

      // ✅ Environment detection
      const isProduction = process.env.NODE_ENV === "production";

      // ✅ Shared cookie options
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, // Only true on HTTPS (production)
        sameSite: (isProduction ? "none" : "lax") as
          | true
          | "none"
          | "lax"
          | "strict",
        domain: isProduction ? ".movierule.shop" : undefined, // ✅ Works across subdomains
        path: "/", // ✅ Send on all routes
      };

      // ✅ Set cookies
      res.cookie("access_token", accessToken, cookieOptions);
      res.cookie("refresh_token", refreshToken, cookieOptions);

      // ✅ Send response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: admin,
      });
    } catch (error: any) {
      console.error("Admin login error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};

