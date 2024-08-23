import { IAdminDependencies } from "../../../application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";

export const getTheaterDetailsController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { getTheaterDetailsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { theaterId } = req.params;

      console.log(theaterId, "id of theater backend");
      

      const theaterDetails = await getTheaterDetailsUseCase(
        dependencies
      ).execute(theaterId);

      console.log(theaterDetails, "inside the backend controller");

      if (!theaterDetails) {
        return res
          .status(404)
          .json({ success: false, message: "Theater not found" });
      }

      res.status(200).json({ success: true, data: theaterDetails });
    } catch (error: any) {
      console.error("Failed to get theater details:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
