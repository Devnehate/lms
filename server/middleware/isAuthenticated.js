import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while authenticating"
    });
  }
};

export default isAuthenticated;