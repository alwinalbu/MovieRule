import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { Movie } from "../../../infrastructure/database/mogodb/models/movieSchema";

cloudinary.v2.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
  secure: true, 
});

export const getSecureVideoURL = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found in DB" });
    }

    if (!movie.streamingPublicId) {
      console.log("⚠️ Movie found but missing streamingPublicId");
      return res.status(404).json({ message: "No streaming video linked" });
    }

    // ✅ Expire in 2 minutes (120s) for smoother playback
    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 2;

    // ✅ Generate signed (authenticated) Cloudinary video URL
    const signedUrl = cloudinary.v2.url(movie.streamingPublicId, {
      resource_type: "video",
      type: "authenticated",
      sign_url: true,
      expires_at: expiresAt,
      secure: true, // always https
    });

    console.log("🎥 Generated secure video URL:", signedUrl);

    res.status(200).json({ secureUrl: signedUrl });
  } catch (err) {
    console.error("❌ Error generating secure URL:", err);
    res.status(500).json({ message: "Failed to generate secure URL" });
  }
};
