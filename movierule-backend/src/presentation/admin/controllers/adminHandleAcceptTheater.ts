import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const adminHandleAcceptTheaterController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { adminHandleAcceptTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedTheater = await adminHandleAcceptTheaterUseCase(
        dependencies
      ).execute(id, status);

      console.log(updatedTheater, "inside the backend controller");

      if (!updatedTheater) {
        return res
          .status(404)
          .json({ success: false, message: "Theater not found" });
      }

      res.status(200).json({ success: true, data: updatedTheater });
    } catch (error: any) {
      console.error("Failed to handle accept theater:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
