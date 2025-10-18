// import axios from "axios";
// import { config, URL } from "../../config/constants";

// interface UploadOptions {
//   onProgress?: (percent: number) => void;
// }

// const videoUpload = async (video: File, uploadOptions?: UploadOptions) => {
//   const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;

//   if (!cloud_name) {
//     console.error("❌ Missing Cloudinary cloud name");
//     return null;
//   }

//   try {
//     // 1️⃣ Ask backend for signed upload params
//     const signRes = await axios.get(`${URL}/ott/cloudinary/signature`, config);
//     const { timestamp, signature, api_key, folder } = signRes.data;

//     console.log("✅ Got signature from backend:", signature);

//     // 2️⃣ Create form data (must match backend signature)
//     const formData = new FormData();
//     formData.append("file", video);
//     formData.append("api_key", api_key);
//     formData.append("timestamp", timestamp.toString());
//     formData.append("signature", signature);
//     formData.append("folder", folder);
    
   

//     console.log("🚀 Uploading securely to Cloudinary...");

//     // 3️⃣ Perform signed upload
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (event) => {
//           if (event.total && uploadOptions?.onProgress) {
//             const percent = Math.round((event.loaded * 100) / event.total);
//             uploadOptions.onProgress(percent);
//           }
//         },
//       }
//     );

//     const { public_id, format } = res.data;
//     console.log("✅ Upload success:", public_id);

//     if (["mp4", "mkv", "mov", "avi"].includes(format)) {
//       return public_id;
//     } else {
//       console.warn("⚠️ Unsupported format:", format);
//       return null;
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("❌ Upload failed:", error.response?.data || error.message);
//     } else {
//       console.error("❌ Unexpected error:", error);
//     }
//     throw error;
//   }
// };

// export default videoUpload;

import axios from "axios";
import { config, URL } from "../../config/constants";

interface UploadOptions {
  onProgress?: (percent: number) => void;
}

const videoUpload = async (
  movieId: string,
  video: File,
  uploadOptions?: UploadOptions
) => {
  try {
    const formData = new FormData();
    formData.append("file", video);

    console.log("🚀 Uploading video via backend (private)...");

    const response = await axios.post(
      `${URL}/ott/upload-video/${movieId}`,
      formData,
      {
        ...config,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total && uploadOptions?.onProgress) {
            const percent = Math.round((event.loaded * 100) / event.total);
            uploadOptions.onProgress(percent);
          }
        },
      }
    );

    console.log("✅ Backend upload success:", response.data);
    return response.data.public_id;
  } catch (error) {
    console.error("❌ Video upload failed:", error);
    throw error;
  }
};

export default videoUpload;
