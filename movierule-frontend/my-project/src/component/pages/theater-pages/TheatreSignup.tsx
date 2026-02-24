import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Image, Button } from "@nextui-org/react";
import { AppDispatch, RootState } from "../../../redux/store";
import { signUpTheater } from "../../../redux/actions/theaters/theaterActions";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import EyeFilledIcon from "../../icons/EyeFilledIcon";
import EyeSlashFilledIcon from "../../icons/EyeSlashFilledIcon";
import ImageUpload from "../../imageUpoad/ImageUpload";

const TheaterSignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.theater);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "theatre",
    status: "pending",
    OwnerName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    profilePicture: "",
    aadhaarCard: "",
    licenseDocument: "",
  });

  const [profilePictureform, setProfilePictureform] = useState<File | null>(
    null
  );
  const [aadhaarCardform, setAadhaarCardform] = useState<File | null>(null);
  const [licenseDocumentform, setLicenseDocumentform] = useState<File | null>(
    null
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    const file = files?.[0] || null;
    switch (id) {
      case "profilePicture":
        setProfilePictureform(file);
        break;
      case "aadhaarCard":
        setAadhaarCardform(file);
        break;
      case "licenseDocument":
        setLicenseDocumentform(file);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please check and try again.",
      });
      return;
    }

    try {
      const profilePicture = profilePictureform
        ? await ImageUpload(profilePictureform)
        : "";
      const aadhaarCard = aadhaarCardform
        ? await ImageUpload(aadhaarCardform)
        : "";
      const licenseDocument = licenseDocumentform
        ? await ImageUpload(licenseDocumentform)
        : "";

      const updatedFormData = {
        ...formData,
        profilePicture,
        aadhaarCard,
        licenseDocument,
      };

      const formSubmissionData = new FormData();
      Object.keys(updatedFormData).forEach((key) => {
        formSubmissionData.append(
          key,
          updatedFormData[key as keyof typeof updatedFormData]
        );
      });

      await dispatch(signUpTheater(formSubmissionData)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "You have successfully signed up! Please verify your email to continue.",
      }).then(() => navigate("/theater/verifyOtp"));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-red-900/80 to-black">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6">
        <div className="p-6 rounded shadow-lg w-full max-w-md bg-black/80 backdrop-blur">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Create An Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <Input
                id="username"
                type="text"
                label="Username"
                variant="bordered"
                value={formData.username}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <Input
                id="password"
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                type={isPasswordVisible ? "text" : "password"}
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400" />
                    )}
                  </button>
                }
                value={formData.password}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-4">
              <Input
                id="confirmPassword"
                label="Confirm Password"
                variant="bordered"
                placeholder="Confirm your password"
                type={isPasswordVisible ? "text" : "password"}
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400" />
                    )}
                  </button>
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            {/* Other fields (Owner, Address, City, etc.) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input
                id="OwnerName"
                type="text"
                label="Owner Name"
                variant="bordered"
                value={formData.OwnerName}
                onChange={handleChange}
                className="w-full text-white"
              />
              <Input
                id="phone"
                type="text"
                label="Phone"
                variant="bordered"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            <div className="mb-4">
              <Input
                id="address"
                type="text"
                label="Address"
                variant="bordered"
                value={formData.address}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Input
                id="city"
                type="text"
                label="City"
                variant="bordered"
                value={formData.city}
                onChange={handleChange}
                className="w-full text-white"
              />
              <Input
                id="state"
                type="text"
                label="State"
                variant="bordered"
                value={formData.state}
                onChange={handleChange}
                className="w-full text-white"
              />
              <Input
                id="zipCode"
                type="text"
                label="Zip Code"
                variant="bordered"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full text-white"
              />
            </div>

            {/* File Uploads */}
            <div className="mb-4 text-gray-200">
              <label className="block mb-2">Profile Picture</label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {profilePictureform && (
                <Image
                  src={URL.createObjectURL(profilePictureform)}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="mt-2 rounded"
                />
              )}
            </div>
            <div className="mb-4 text-gray-200">
              <label className="block mb-2">Aadhaar Card</label>
              <input
                id="aadhaarCard"
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {aadhaarCardform && (
                <Image
                  src={URL.createObjectURL(aadhaarCardform)}
                  alt="Aadhaar Card Preview"
                  width={100}
                  height={100}
                  className="mt-2 rounded"
                />
              )}
            </div>
            <div className="mb-4 text-gray-200">
              <label className="block mb-2">License Document</label>
              <input
                id="licenseDocument"
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
              {licenseDocumentform && (
                <Image
                  src={URL.createObjectURL(licenseDocumentform)}
                  alt="License Document Preview"
                  width={100}
                  height={100}
                  className="mt-2 rounded"
                />
              )}
            </div>

            <Button
              type="submit"
              color="danger"
              className="w-full mt-4"
              isLoading={loading}
              isDisabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TheaterSignUp;
