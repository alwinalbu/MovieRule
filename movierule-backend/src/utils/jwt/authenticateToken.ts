// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// interface TokenPayload {
//   _id: string;
//   email: string;
//   role: string;
// }

// export const authenticateAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Check if access_token is present in cookies
//   const accessToken = req.cookies.access_token;

//   if (!accessToken) {
//     return res.status(401).json({ message: "Access token not found" });
//   }

//   try {
//     // Verify access_token
//     const decoded = jwt.verify(
//       accessToken,
//       process.env.ACCESS_TOKEN_SECRET as string
//     ) as TokenPayload;

//     // Check if user role is admin
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Unauthorized access" });
//     }

//     // Attach user data to request object
//     req.user = decoded;

//     // Proceed to next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
