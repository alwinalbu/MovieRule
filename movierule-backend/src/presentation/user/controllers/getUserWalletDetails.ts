import { IDependencies } from "../../../application/user/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getUserWalletDetailsController = (dependencies: IDependencies) => {
  const {
    useCases: { getUserWalletDetailsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    
    
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const { userId } = req.params;

    try {
      const userWalletDetails = await getUserWalletDetailsUseCase(
        dependencies
      ).execute(userId);

      if (!userWalletDetails) {
        return res.status(404).json({
          success: false,
          message: "User wallet details not found",
        });
      }

      res.status(200).json({
        success: true,
        data: userWalletDetails,
        message: "User wallet details fetched successfully",
      });
    } catch (error: any) {
      console.error("Failed to fetch user wallet details:", error);
      res.status(500).json({
        success: false,
        message: (error as Error)?.message || "Internal server error",
      });
    }
  };
};
