// import * as yup from "yup";

// export const ValidationSchema = yup.object().shape({
//   username: yup
//     .string()
//     .min(3, "Username must be at least 3 characters")
//     .max(10, "Username cannot exceed 10 characters")
//     .matches(/^\S*$/, "Username cannot contain spaces")
//     .required("Username is required"),

//   email: yup
//     .string()
//     .email("Invalid email address")
//     .required("Email is required"),

//   password: yup
//     .string()
//     .required("Password is required")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
//     )
//     .max(10, "Must be less than 10 characters"),

//   confirmPassword: yup
//     .string()
//     .required("confirm your Password")
//     .oneOf([yup.ref("password")], "Passwords must Match"),
// });


import * as yup from "yup";


const validateImageFile = (value: File | undefined): boolean => {
  if (!value) return true;

  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  return validTypes.includes(value.type);
};

export const ValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username cannot exceed 10 characters")
    .matches(/^\S*$/, "Username cannot contain spaces")
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include an uppercase letter, lowercase letter, and special character"
    )
    .max(10, "Password must be less than 10 characters"),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),

  profilePicture: yup
    .mixed<File>()
    .required("Profile picture is required")
    .test("fileType", "Unsupported file format", (value) =>
      validateImageFile(value as File)
    ),

  aadhaarCard: yup
    .mixed<File>()
    .required("Aadhaar card is required")
    .test("fileType", "Unsupported file format", (value) =>
      validateImageFile(value as File)
    ),

  licenseDocument: yup
    .mixed<File>()
    .required("License document is required")
    .test("fileType", "Unsupported file format", (value) =>
      validateImageFile(value as File)
    ),
});
