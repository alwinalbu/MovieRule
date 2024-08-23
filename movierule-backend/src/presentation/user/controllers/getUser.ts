import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const getUserController = (dependencies: IDependencies) => {
  const {
    useCases: { findMainUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

     console.log(payload.role,"role of the current user");
     console.log(payload._id, "id of the current user");
     

      if (!payload?._id) {
        return res.status(400).json({ error: "Missing userId" });
      }

      const user = await findMainUserUseCase(dependencies).execute(payload?._id,payload?.role);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
     return res.status(200).json(user);
    } catch (error) {
      console.error("Failed to get user details:", error);
      res.status(500).json({ error: "Failed to get user details" });
    }
  };
};

