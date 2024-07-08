// import { IDependencies } from "@/application/user/interfaces/IDependencies";
// import { Request, Response, NextFunction } from "express";
// import { comparePassword, hashPassword } from "@/utils/bcrypt";

// export const updateUserController = (dependencies: IDependencies) => {
//   const {
//     useCases: { findUserByIdUseCase },
//   } = dependencies;

//   return async (req: Request, res: Response, next: NextFunction) => {
//     const { userId } = req.params;
//     const { username, oldPassword, password, profilePic } = req.body;

//     try {
//       // Validate presence of userId
//       if (!userId) {
//         return res.status(400).json({ error: "Missing userId" });
//       }

//       const user = await findUserByIdUseCase(dependencies).execute(userId);

//       // Handle case where user is not found
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       // Compare old password if password change is requested
//       if (password) {
//         const isOldPasswordCorrect = await comparePassword(
//           oldPassword,
//           user.password
//         );
//         if (!isOldPasswordCorrect) {
//           return res.status(400).json({ error: "Incorrect old password" });
//         }
//       }

//       // Update user details based on provided fields
//       if (username) {
//         user.username = username;
//       }

//       if (password) {
//         const hashedPassword = await hashPassword(password);
//         user.password = hashedPassword;
//       }

//       if (profilePic) {
//         user.profilePicture = profilePic;
//       }

//       // Save updated user
//       await user.save();

//       res
//         .status(200)
//         .json({ message: "User details updated successfully", user });
//     } catch (error) {
//       console.error("Failed to update user details:", error);
//       res.status(500).json({ error: "Failed to update user details" });
//     }
//   };
// };

import { IDependencies } from "@/application/user/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "@/utils/bcrypt";

export const updateUserController = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { username, oldPassword, password, profilePic } = req.body;

    try {
      
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }

      

      const user = await findUserByIdUseCase(dependencies).execute(userId);

      console.log(user,"user by find by ID useCase");
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

  
      if (password) {
        if (!oldPassword) {
          return res
            .status(400)
            .json({ error: "Old password is required to change the password" });
        }

        const isOldPasswordCorrect = await comparePassword(
          oldPassword,
          user.password
        );
        if (!isOldPasswordCorrect) {
          return res.status(400).json({ error: "Incorrect old password" });
        }
      }

      // Update user details based on provided fields
      if (username) {
        user.username = username;
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
      }

      if (profilePic) {
        user.profilePicture = profilePic;
      }

      // Save updated user
      await user.save();

      res
        .status(200)
        .json({ message: "User details updated successfully", user });
    } catch (error) {
      console.error("Failed to update user details:", error);
      res.status(500).json({ error: "Failed to update user details" });
    }
  };
};