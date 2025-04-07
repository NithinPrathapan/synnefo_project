import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const getCurrentUserId = ClerkExpressRequireAuth({
  // Optional: Add your Clerk configuration here if needed
  // audience: process.env.CLERK_AUDIENCE,
  // issuer: process.env.CLERK_ISSUER,
})(async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No user ID found in authentication token",
      });
    }

    req.currentUserId = userId;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      error: "Authentication failed",
      message: error.message,
    });
  }
});
