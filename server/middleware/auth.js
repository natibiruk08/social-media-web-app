import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) return res.status(403).json({ message: "Access denied" });

    const verified = await Jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) return res.status(401).json({ message: "Token invalid" });

    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
