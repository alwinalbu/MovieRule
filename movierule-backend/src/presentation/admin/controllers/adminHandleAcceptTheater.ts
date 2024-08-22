// import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
// import { NextFunction, Request, Response } from "express";

// export const adminHandleAcceptTheaterController = (
//   dependencies: IAdminDependencies
// ) => {
//   const {
//     useCases: { adminHandleAcceptTheaterUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;
//       const { status } = req.body;

//       const updatedTheater = await adminHandleAcceptTheaterUseCase(
//         dependencies
//       ).execute(id, status);

//       console.log(updatedTheater, "inside the backend controller");

//       if (!updatedTheater) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Theater not found" });
//       }

//       res.status(200).json({ success: true, data: updatedTheater });
//     } catch (error: any) {
//       console.error("Failed to handle accept theater:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error" });
//     }
//   };
// };



// import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
// import { sendAcceptanceEmail } from "@/utils/email/sendAcceptanceEmail";
// import { NextFunction, Request, Response } from "express";


// export const adminHandleAcceptTheaterController = (
//   dependencies: IAdminDependencies
// ) => {
//   const {
//     useCases: { adminHandleAcceptTheaterUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;
//       const { status } = req.body;

//       const updatedTheater = await adminHandleAcceptTheaterUseCase(
//         dependencies
//       ).execute(id, status);

//       console.log(updatedTheater, "inside the backend controller");

//       if (!updatedTheater) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Theater not found" });
//       }

//       // Send acceptance email if the status is updated to 'active'
//       if (status === "active") {
//         const emailSent = await sendAcceptanceEmail(
//           updatedTheater.email,
//           updatedTheater.username
//         );

//         if (!emailSent) {
//           console.warn("Acceptance email could not be sent");
//         }
//       }

//       res.status(200).json({ success: true, data: updatedTheater });
//     } catch (error: any) {
//       console.error("Failed to handle accept theater:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error" });
//     }
//   };
// };

import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { sendAcceptanceEmail } from "@/utils/email/sendAcceptanceEmail";
import { sendRejectionEmail } from "@/utils/email/sendRejectionEmail";
import { Request, Response, NextFunction } from "express";



export const adminHandleAcceptTheaterController = (
  dependencies: IAdminDependencies
) => {
  const {
    useCases: { adminHandleAcceptTheaterUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, comments } = req.body;

      const updatedTheater = await adminHandleAcceptTheaterUseCase(
        dependencies
      ).execute(id, status);

      console.log(updatedTheater, "inside the backend controller");

      if (!updatedTheater) {
        return res
          .status(404)
          .json({ success: false, message: "Theater not found" });
      }

      if (status === "active") {
        const emailSent = await sendAcceptanceEmail(
          updatedTheater.email,
          updatedTheater.username
        );
        if (!emailSent) {
          console.warn("Acceptance email could not be sent");
        }
      } else if (status === "rejected") {
        const emailSent = await sendRejectionEmail(
          updatedTheater.email,
          updatedTheater.username,
          comments
        );
        if (!emailSent) {
          console.warn("Rejection email could not be sent");
        }
      }

      res.status(200).json({ success: true, data: updatedTheater });
    } catch (error: any) {
      console.error("Failed to handle accept/reject theater:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
};
