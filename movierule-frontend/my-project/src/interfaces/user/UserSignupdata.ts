
// export interface UserSignupdata {
//   _id?: string;
//   username?: string | null;
//   email?: string | null;
//   password?: string | null;
//   confirmPassword?: string | null;
//   otp?: string[];
//   role: "user";
//   profilePicture?: string | null;
//   city?: string;
//   isSubscribed?:boolean;
// }

export interface UserSignupdata {
  _id?: string;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  status?: string;
  otp?: string[];
  role: "user";
  profilePicture?: string | null;
  city?: string;
  isSubscribed?: {
    status: "initiated" | "active" | "inactive";
    sessionId: string;
    amount: number;
    paymentStatus: "pending" | "completed" | "failed";
  };
}

