import axios from "axios";

const videoUpload = async (video: File) => {
  const preset_key = "ml_default";
  const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;

  if (!cloud_name) {
    console.error("Cloudinary cloud name is missing");
    return null;
  }

  const formData = new FormData();
  formData.append("file", video);
  formData.append("upload_preset", preset_key);

  try {
    console.log("Uploading to Cloudinary...");
    console.log(
      `Cloudinary URL: https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
      formData
    );
    const { format, secure_url } = res.data;

    console.log(secure_url, "video url");

    if (["mp4", "avi", "mkv", "mov"].includes(format)) {
      return secure_url;
    } else {
      console.error("Unsupported file format:", format);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error uploading video:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default videoUpload;
