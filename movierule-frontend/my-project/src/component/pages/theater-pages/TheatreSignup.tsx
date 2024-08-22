// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
// import { ValidationSchema } from "../../../schemas/ValidationSchema";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { signUpTheater } from "../../../redux/actions/theaters/theaterActions";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

// const TheaterSignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.theater);

//   const initialValues: TheaterEntity = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "theatre",
//     status: "pending",
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: ValidationSchema,
//     onSubmit: (values) => {
//       dispatch(signUpTheater(values))
//         .unwrap()
//         .then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Signup Successful",
//             text: "You have successfully signed up! Please verify your email to continue.",
//           }).then(() => {
//             navigate("/theater/verifyOtp", {

//             });
//           });
//         })
//         .catch((err: any) => {
//           console.error("Signup failed:", err);
//           Swal.fire({
//             icon: "error",
//             title: "Signup Failed",
//             text: err.message || "An unexpected error occurred.",
//           });
//         });
//     },
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-movie-theater">
//       <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6">
//         <div className="p-6 rounded shadow-md w-full max-w-md bg-white">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
//             Create An Account (Theater)
//           </h2>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="username"
//                 className="block text-gray-950 text-start"
//               >
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 {...formik.getFieldProps("username")}
//                 className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//               />
//               {formik.touched.username && formik.errors.username ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.username}
//                 </div>
//               ) : null}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-950 text-start">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 {...formik.getFieldProps("email")}
//                 className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.email}
//                 </div>
//               ) : null}
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-950 text-start"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 {...formik.getFieldProps("password")}
//                 className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.password}
//                 </div>
//               ) : null}
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-gray-950 text-start"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 {...formik.getFieldProps("confirmPassword")}
//                 className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//               />
//               {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.confirmPassword}
//                 </div>
//               ) : null}
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="w-full p-2 border border-gray-300 rounded-lg mt-1"
//                 style={{ backgroundColor: "#f57792" }}
//               >
//                 {loading ? "Signing Up..." : "Sign Up"}
//               </button>
//               {error && (
//                 <div className="text-red-500 text-sm mt-2">{error}</div>
//               )}
//             </div>
//           </form>
//           <div className="mt-4 text-center">
//             <span className="text-gray-950">
//               Already have an account?{" "}
//               <a href="/theater/login" style={{ color: "#f57792" }}>
//                 Log in
//               </a>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TheaterSignUp;

// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Input, Image, Button } from "@nextui-org/react";
// import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
// import { ValidationSchema } from "../../../schemas/ValidationSchema";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { signUpTheater } from "../../../redux/actions/theaters/theaterActions";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

// import EyeFilledIcon from "../../icons/EyeFilledIcon";
// import EyeSlashFilledIcon from "../../icons/EyeSlashFilledIcon";

// const TheaterSignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading } = useSelector((state: RootState) => state.theater);

// const [profilePicture, setProfilePicture] = React.useState<File | null>(null);
// const [aadhaarCard, setAadhaarCard] = React.useState<File | null>(null);
// const [licenseDocument, setLicenseDocument] = React.useState<File | null>(null);

//   const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

//   const togglePasswordVisibility = () =>
//     setIsPasswordVisible(!isPasswordVisible);

//   const handleFileChange =
//     (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0] || null;
//       setter(file);
//     };

  // const initialValues: TheaterEntity = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "theatre",
//     status: "pending",
//     OwnerName: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     phone: "",
//   };

//   const formik = useFormik({
//       initialValues: initialValues,
//       validationSchema: ValidationSchema,
//       onSubmit: (values) => {

//       console.log("Form Submitted", values);

//       const formData = new FormData();
//       formData.append("username", values.username || "");
//       formData.append("email", values.email || "");
//       formData.append("password", values.password || "");
//       formData.append("confirmPassword", values.confirmPassword || "");
//       formData.append("role", values.role);
//       formData.append("status", values.status || "");
//       formData.append("OwnerName", values.OwnerName || "");
//       formData.append("address", values.address || "");
//       formData.append("city", values.city || "");
//       formData.append("state", values.state || "");
//       formData.append("zipCode", values.zipCode || "");
//       formData.append("phone", values.phone || "");
//       formData.append("profilePicture", profilePicture as File);
//       formData.append("aadhaarCard", aadhaarCard as File);
//       formData.append("licenseDocument", licenseDocument as File);

//       console.log(formData,"data here");

//       dispatch(signUpTheater(formData))
//         .unwrap()
//         .then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Signup Successful",
//             text: "You have successfully signed up! Please verify your email to continue.",
//           }).then(() => {
//             navigate("/theater/verifyOtp");
//           });
//         })
//         .catch((err: any) => {
//           console.error("Signup failed:", err);
//           Swal.fire({
//             icon: "error",
//             title: "Signup Failed",
//             text: err.message || "An unexpected error occurred.",
//           });
//         });
//     },
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
//       <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6 rounded">
//         <div className="p-6 rounded shadow-md w-full max-w-md bg-white">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
//             Create An Account
//           </h2>
//           <form onSubmit={formik.handleSubmit}>
//             {/* Username Field */}
//             <div className="mb-4">
//               <Input
//                 id="username"
//                 type="text"
//                 label="Username"
//                 variant="bordered"
//                 {...formik.getFieldProps("username")}
//                 className="w-full"
//               />
//               {formik.touched.username && formik.errors.username ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.username}
//                 </div>
//               ) : null}
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <Input
//                 id="email"
//                 type="email"
//                 label="Email"
//                 variant="bordered"
//                 {...formik.getFieldProps("email")}
//                 className="w-full"
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.email}
//                 </div>
//               ) : null}
//             </div>

//             {/* Password Field */}
//             <div className="mb-4">
//               <Input
//                 id="password"
//                 label="Password"
//                 variant="bordered"
//                 placeholder="Enter your password"
//                 type={isPasswordVisible ? "text" : "password"}
//                 endContent={
//                   <button
//                     className="focus:outline-none"
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     aria-label="toggle password visibility"
//                   >
//                     {isPasswordVisible ? (
//                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//                 {...formik.getFieldProps("password")}
//                 className="w-full"
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.password}
//                 </div>
//               ) : null}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-4">
//               <Input
//                 id="confirmPassword"
//                 label="Confirm Password"
//                 variant="bordered"
//                 placeholder="Confirm your password"
//                 type={isPasswordVisible ? "text" : "password"}
//                 endContent={
//                   <button
//                     className="focus:outline-none"
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     aria-label="toggle password visibility"
//                   >
//                     {isPasswordVisible ? (
//                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//                 {...formik.getFieldProps("confirmPassword")}
//                 className="w-full"
//               />
//               {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.confirmPassword}
//                 </div>
//               ) : null}
//             </div>

//             {/* Owner Name Field */}
//             <div className="mb-4">
//               <Input
//                 id="OwnerName"
//                 type="text"
//                 label="Owner Name"
//                 variant="bordered"
//                 {...formik.getFieldProps("OwnerName")}
//                 className="w-full"
//               />
//               {formik.touched.OwnerName && formik.errors.OwnerName ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.OwnerName}
//                 </div>
//               ) : null}
//             </div>

//             {/* Address Field */}
//             <div className="mb-4">
//               <Input
//                 id="address"
//                 type="text"
//                 label="Address"
//                 variant="bordered"
//                 {...formik.getFieldProps("address")}
//                 className="w-full"
//               />
//               {formik.touched.address && formik.errors.address ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.address}
//                 </div>
//               ) : null}
//             </div>

//             {/* City Field */}
//             <div className="mb-4">
//               <Input
//                 id="city"
//                 type="text"
//                 label="City"
//                 variant="bordered"
//                 {...formik.getFieldProps("city")}
//                 className="w-full"
//               />
//               {formik.touched.city && formik.errors.city ? (
//                 <div className="text-red-500 text-sm">{formik.errors.city}</div>
//               ) : null}
//             </div>

//             {/* State Field */}
//             <div className="mb-4">
//               <Input
//                 id="state"
//                 type="text"
//                 label="State"
//                 variant="bordered"
//                 {...formik.getFieldProps("state")}
//                 className="w-full"
//               />
//               {formik.touched.state && formik.errors.state ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.state}
//                 </div>
//               ) : null}
//             </div>

//             {/* Zip Code Field */}
//             <div className="mb-4">
//               <Input
//                 id="zipCode"
//                 type="text"
//                 label="Zip Code"
//                 variant="bordered"
//                 {...formik.getFieldProps("zipCode")}
//                 className="w-full"
//               />
//               {formik.touched.zipCode && formik.errors.zipCode ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.zipCode}
//                 </div>
//               ) : null}
//             </div>

//             {/* Phone Field */}
//             <div className="mb-4">
//               <Input
//                 id="phone"
//                 type="text"
//                 label="Phone"
//                 variant="bordered"
//                 {...formik.getFieldProps("phone")}
//                 className="w-full"
//               />
//               {formik.touched.phone && formik.errors.phone ? (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.phone}
//                 </div>
//               ) : null}
//             </div>

//             {/* Profile Picture Upload */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Profile Picture</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange(setProfilePicture)}
//                 className="w-full p-2 border border-gray-300 rounded-full mt-1 text-gray-950"
//               />
//               {formik.errors.profilePicture && (
//                 <div>{formik.errors.profilePicture}</div>
//               )}
//               {profilePicture && (
//                 <div className="mt-2">
//                   <Image
//                     width={150}
//                     alt="Profile Picture"
//                     src={
//                       profilePicture
//                         ? URL.createObjectURL(profilePicture)
//                         : "https://via.placeholder.com/150"
//                     }
//                     className="rounded-full"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Aadhaar Card Upload */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Aadhaar Card</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange(setAadhaarCard)}
//                 className="w-full p-2 border border-gray-300 rounded-full mt-1 text-gray-950"
//               />
//               {formik.errors.aadhaarCard && (
//                 <div>{formik.errors.aadhaarCard}</div>
//               )}
//               {aadhaarCard && (
//                 <div className="mt-2">
//                   <Image
//                     width={150}
//                     alt="Aadhaar Card"
//                     src={
//                       aadhaarCard
//                         ? URL.createObjectURL(aadhaarCard)
//                         : "https://via.placeholder.com/150"
//                     }
//                     className="rounded-full"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* License Document Upload */}
//             <div className="mb-4">
//               <label className="block text-gray-700">License Document</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange(setLicenseDocument)}
//                 className="w-full p-2 border border-gray-300 rounded-full mt-1 text-gray-950"
//               />
//               {formik.errors.licenseDocument && (
//                 <div>{formik.errors.licenseDocument}</div>
//               )}
//               {licenseDocument && (
//                 <div className="mt-2">
//                   <Image
//                     width={150}
//                     alt="License Document"
//                     src={
//                       licenseDocument
//                         ? URL.createObjectURL(licenseDocument)
//                         : "https://via.placeholder.com/150"
//                     }
//                     className="rounded-full"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               color="primary"
//               className="w-full mt-4"
//               isLoading={loading}
//               isDisabled={loading}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </Button>
//             <div className="mt-4 text-center">
//               <p className="text-gray-700 text-sm">
//                 Already have an account?{" "}
//                 <a
//                   href="/theater/login"
//                   className="text-blue-500 hover:underline"
//                 >
//                   Log In
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TheaterSignUp;

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
  const { loading} = useSelector((state: RootState) => state.theater);

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

  const [profilePictureform, setProfilePictureform] = useState<File | null>(null);
  const [aadhaarCardform, setAadhaarCardform] = useState<File | null>(null);
  const [licenseDocumentform, setLicenseDocumentform] = useState<File | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
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
      default:
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

    // Upload images and get URLs
    try {
      const profilePicture = profilePictureform
        ? await ImageUpload(profilePictureform)
        : "";
      const aadhaarCard = aadhaarCardform ? await ImageUpload(aadhaarCardform) : "";
      const licenseDocument = licenseDocumentform
        ? await ImageUpload(licenseDocumentform)
        : "";

      // Update formData with URLs
      const updatedFormData = {
        ...formData,
        profilePicture,
        aadhaarCard,
        licenseDocument,
      };

      // Remove file-related keys
      const formSubmissionData = new FormData();
      Object.keys(updatedFormData).forEach((key) => {
        formSubmissionData.append(
          key,
          updatedFormData[key as keyof typeof updatedFormData]
        );
      });

      // Debug form submission data
      for (let [key, value] of formSubmissionData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: ${value.name}, ${value.type}, ${value.size} bytes`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Dispatch sign up action
      await dispatch(signUpTheater(formSubmissionData)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "You have successfully signed up! Please verify your email to continue.",
      }).then(() => {
        navigate("/theater/verifyOtp");
      });
    } catch (error:any) {
      console.error("Signup failed:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6 rounded">
        <div className="p-6 rounded shadow-md w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Create An Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                id="username"
                type="text"
                label="Username"
                variant="bordered"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="email"
                type="email"
                label="Email"
                variant="bordered"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="password"
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                type={isPasswordVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                value={formData.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="confirmPassword"
                label="Confirm Password"
                variant="bordered"
                placeholder="Confirm your password"
                type={isPasswordVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="OwnerName"
                type="text"
                label="Owner Name"
                variant="bordered"
                value={formData.OwnerName}
                onChange={handleChange}
                className="w-full"
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
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="city"
                type="text"
                label="City"
                variant="bordered"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="state"
                type="text"
                label="State"
                variant="bordered"
                value={formData.state}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="zipCode"
                type="text"
                label="Zip Code"
                variant="bordered"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <Input
                id="phone"
                type="text"
                label="Phone"
                variant="bordered"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-600">
                Profile Picture
              </label>
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
                  className="mt-2"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Aadhaar Card</label>
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
                  className="mt-2"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-600">
                License Document
              </label>
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
                  className="mt-2"
                />
              )}
            </div>

            <Button
              type="submit"
              color="primary"
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

              