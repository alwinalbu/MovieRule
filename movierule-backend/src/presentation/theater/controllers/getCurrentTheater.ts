
import { Theater } from "../../../infrastructure/database/mogodb/models/theaterSchema";
import { Request, Response } from "express";


export const getCurrentTheaterController = async (req: Request, res: Response) => {
  try {
    const theater = req.user; // ✅ already set by middleware

    if (!theater?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Fetch from DB using the ID inside req.user
    const theaterData = await Theater.findById(theater._id).select("-password");

    if (!theaterData) {
      return res
        .status(404)
        .json({ success: false, message: "Theater not found" });
    }

    res.status(200).json({ success: true, data: theaterData });
  } catch (error) {
    console.error("❌ Error fetching theater:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
