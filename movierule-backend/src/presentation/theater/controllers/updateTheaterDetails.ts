import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "@/utils/bcrypt";
import { ITheaterDependencies } from "@/application/theater/interfaces/ITheaterDependencies";

export const updateTheaterController = (dependencies: ITheaterDependencies) => {
  const {
    useCases: { findTheaterByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const { theaterId } = req.params;
    const { username, oldPassword, password, profilePicture, city } = req.body;

    console.log(theaterId, username, "Theater update - starting");

    try {

      console.log(req.user, "theater req inside update deatails");

      if (!req.user || !req.user._id) {
        return res.status(402).json("Authentication failed");
      }
      
      if (!theaterId) {
        return res.status(400).json({ error: "Missing theaterId" });
      }

      const theater = await findTheaterByIdUseCase(dependencies).execute(
        theaterId
      );

      // Handle case where theater is not found
      if (!theater) {
        return res.status(404).json({ error: "Theater not found" });
      }

      // Compare old password if password change is requested
      if (password) {
        if (!oldPassword) {
          return res
            .status(400)
            .json({ error: "Old password is required to change the password" });
        }

        const isOldPasswordCorrect = await comparePassword(
          oldPassword,
          theater.password
        );
        if (!isOldPasswordCorrect) {
          return res.status(400).json({ error: "Incorrect old password" });
        }
      }

      // Update theater details based on provided fields
      if (username) {
        theater.username = username;
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        theater.password = hashedPassword;
      }

      if (profilePicture) {
        theater.profilePicture = profilePicture;
      }

      if (city) {
        theater.city = city;
      }

      // Save updated theater
      await theater.save();

      res
        .status(200)
        .json({ message: "Theater details updated successfully", theater });
    } catch (error) {
      console.error("Failed to update theater details:", error);
      res.status(500).json({ error: "Failed to update theater details" });
    }
  };
};
