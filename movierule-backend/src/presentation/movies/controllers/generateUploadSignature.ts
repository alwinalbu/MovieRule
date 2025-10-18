import cloudinary from "cloudinary";
import { Request, Response } from "express";

cloudinary.v2.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
});

export const generateUploadSignature = (req: Request, res: Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = "ott_videos";

  // ✅ Include resource_type & type fields in signature for authenticated upload
  const paramsToSign = {
    timestamp,
    folder,
    resource_type: "video",
    type: "authenticated", // 👈 THIS MAKES UPLOAD PRIVATE
  };

  const signature = cloudinary.v2.utils.api_sign_request(
    paramsToSign,
    process.env.CLD_API_SECRET!
  );

  console.log("✅ Signature generated for authenticated upload:", signature);

  res.json({
    timestamp,
    signature,
    api_key: process.env.CLD_API_KEY,
    folder,
  });
};
