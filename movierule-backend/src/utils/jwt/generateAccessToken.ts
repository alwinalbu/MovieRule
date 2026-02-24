import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: {
  _id: string;
  email: string;
  role: string;
}) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error("Access Token secret is not defined!");
  }

  const { _id, email, role } = payload;

  try {
    return jwt.sign({ _id, email, role }, secret, { expiresIn: "24h" });
  } catch (error: any) {
    throw new Error("Failed to generate access token.");
  }
};
