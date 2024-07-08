
export interface UserSignupdata {
  _id?: string;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  otp?: string[];
  role: "user";
  profilePicture?: string | null; // Add this line to include profile picture URL
}


