import { Router } from "express";
import { jwtMiddleware } from "../../utils/middlewares/VerifyToken";
import { User } from "../database/mogodb/models/userSchema";
import { Theater } from "../database/mogodb/models/theaterSchema";
import { Admin } from "../database/mogodb/models/adminSchema";


const authRouter = Router();

authRouter.get("/current", jwtMiddleware(), async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  let account: any = null;

  switch (req.user.role) {
    case "user":
      account = await User.findById(req.user._id).lean();
      if (!account) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.json({
        success: true,
        data: {
          _id: account._id,
          email: account.email,
          role: account.role,
          status: account.status || "active", 
        },
      });

    case "theatre":
      account = await Theater.findById(req.user._id).lean();
      if (!account) {
        return res
          .status(404)
          .json({ success: false, message: "Theatre not found" });
      }
      return res.json({
        success: true,
        data: {
          _id: account._id,
          email: account.email,
          role: account.role,
          status: account.status || "pending", 
        },
      });

    case "admin":
      account = await Admin.findById(req.user._id).lean();
      if (!account) {
        return res
          .status(404)
          .json({ success: false, message: "Admin not found" });
      }
      return res.json({
        success: true,
        data: {
          _id: account._id,
          email: account.email,
          role: account.role,
        },
      });

    default:
      return res.status(400).json({ success: false, message: "Unknown role" });
  }
});

export default authRouter;
