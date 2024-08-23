
import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";


export const handleBlockUnblockController = (dependencies:IAdminDependencies) => {

  const {useCases:{adminHandleBlockUnblockUserUseCase}}=dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
  
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedUser = await adminHandleBlockUnblockUserUseCase(dependencies).execute(id,status);
      
      console.log(updatedUser,"inside the backend controller");

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error:any) {
      console.error("Failed to handle block/unblock:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
