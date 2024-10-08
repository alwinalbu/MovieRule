import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const loginUserController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await loginUserUseCase(dependencies).execute(
        email,
        password
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Ensure user properties exist before generating tokens
      const userId = user._id?.toString();
      const userEmail = user.email;
      const userRole = user.role;

      if (!userId || !userEmail || !userRole) {
        return res
          .status(500)
          .json({ message: "User information is incomplete" });
      }

      // Generate JWT tokens using user._id
      const accessToken = generateAccessToken({
        _id: userId,
        email: userEmail,
        role: userRole,
      });

      const refreshToken = generateRefreshToken({
        _id: userId,
        email: userEmail,
        role: userRole,
      });

      // Set cookies with tokens
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure:true,
        sameSite : "none",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({
         message: "Login successful",
          data:user
         });
    } catch (error: any) {
      console.error("Login error:", error); // Log error for debugging
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
