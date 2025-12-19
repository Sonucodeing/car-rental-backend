import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    console.log("🟦 Incoming Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Remove Bearer prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("🟩 Decoded Token:", decoded);

    if (!decoded?.id) {
      console.log("❌ Invalid token structure");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // FETCH USER
    const user = await User.findById(decoded.id).select("-password");

    console.log("🟨 User Fetched From DB:", user);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;

    console.log("✅ Final req.user:", req.user);

    next();

  } catch (error) {
    console.log("🔥 ERROR in protect middleware:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
