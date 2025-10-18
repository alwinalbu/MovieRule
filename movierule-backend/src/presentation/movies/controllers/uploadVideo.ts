import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Movie } from "../../../infrastructure/database/mogodb/models/movieSchema";

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.v2.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
});

export const uploadVideo = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const fileBuffer = req.file?.buffer;
      if (!fileBuffer) {
        return res.status(400).json({ message: "No video file provided" });
      }

      console.log("🎥 Uploading video securely to Cloudinary...");

      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "video",
          type: "authenticated", 
          folder: "ott_videos",
        },
        async (error, result) => {
          if (error || !result) {
            console.error("❌ Cloudinary error:", error);
            return res.status(500).json({ message: "Upload failed" });
          }

          console.log(
            "✅ Upload success:",
            result.public_id,
            result.type,
            result.access_control
          );

          await Movie.findByIdAndUpdate(id, {
            streamingPublicId: result.public_id,
            streamingURL: null,
          });

          res.status(200).json({
            message: "Video uploaded successfully",
            public_id: result.public_id,
          });
        }
      );

      uploadStream.end(fileBuffer);
    } catch (err) {
      console.error("Server upload error:", err);
      res.status(500).json({ message: "Server error during upload" });
    }
  },
];

