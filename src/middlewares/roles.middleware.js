import cookieExtractor from "../utils/cookieExtractor.js";
import { verifyToken } from "../utils/jwt.js";
import env from "../config/env.config.js";

const checkAuthRoles = (role) => {
  return (req, res, next) => {
    const token = cookieExtractor(req);
    if (!token)
      return res
        .status(401)
        .json({ status: "error", code: 401, message: "unauthorized" });

    try {
      const decoded = verifyToken(token, env.jwt_secret);

      if (role.includes(decoded.user.role)) {
        next();
      } else {
        return res
          .status(403)
          .json({ status: "error", code: 403, message: "Access prohibited" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ status: "error", code: 500, message: e.message });
    }
  };
};

export default checkAuthRoles;
