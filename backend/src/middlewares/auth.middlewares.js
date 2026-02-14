import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if(!token){
    return res.status(401).json({message: "Access denied"});
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({msg: "Invalid token"})
  }
}

export default verifyToken;