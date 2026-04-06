import httpStatus from "http-status";

const rolestatus = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return res.status(httpStatus.UNAUTHORIZED).json({msg:"Access denied"});
    }
    next();
  };
};
const isSenior = (req, res, next) => {
  if (req.user.role !== "senior") {
    return res.status(403).json({ msg: "Access denied. Seniors only." });
  }
  next();
};

export { isSenior,rolestatus };
