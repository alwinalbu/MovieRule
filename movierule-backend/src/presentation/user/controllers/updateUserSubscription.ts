import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/user/interfaces/IDependencies";

export const updateUserSubscriptionController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { updateUserSubscriptionUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { isSubscribed } = req.body; 

      console.log(isSubscribed, "body from front end");
      console.log(userId, "user id");

      if (!userId || !isSubscribed) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const updatedUser = await updateUserSubscriptionUseCase(
        dependencies
      ).execute(userId, isSubscribed);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log(updatedUser, "updated user");

      res.status(200).json({
        success: true,
        message: "User subscription updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      console.error("Error updating user subscription:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };
};
