import { ITheaterDependencies } from "../../../application/theater/interfaces/ITheaterDependencies";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const theaterLoginController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { loginTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { email, password } = req.body;
      

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const theater = await loginTheaterUseCase(dependencies).execute(
        email,
        password
      );

       if (theater?.status !== "active") {
         return res.status(403).json({ message: "You are not approved yet" });
       }

         


        if (!theater) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

      // Ensure theater properties exist before generating tokens
      const theaterId = theater._id?.toString();
      const theaterEmail = theater.email;
      const theaterRole = theater.role;

      if (!theaterId || !theaterEmail || !theaterRole) {
        return res
          .status(500)
          .json({ message: "Theater information is incomplete" });
      }

      // Generate JWT tokens using theater._id
      const accessToken = generateAccessToken({
        _id: theaterId,
        email: theaterEmail,
        role: theaterRole,
      });

      const refreshToken = generateRefreshToken({
        _id: theaterId,
        email: theaterEmail,
        role: theaterRole,
      });

     
      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });

      return res.status(200).json({
        message: "Login successful",
        data: theater,
      });
    } catch (error: any) {
      console.error("Login error:", error); 
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
