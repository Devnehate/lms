import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",      // Changed from "none" to "lax"
            secure: process.env.NODE_ENV === "production",  // Only use secure in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: "/"             // Added path
        }).json({
            success: true,
            message,
            user
        });
};