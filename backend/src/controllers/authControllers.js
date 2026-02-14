import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const register = async (req, res) => {
  const {name, email, password, role} = req.body;

  try {
    const user = await User.findOne({email});
    if(user) {
      return res.status(httpStatus.NOT_FOUND).json({message: "User Already Exist"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, password: hashedPassword, role
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({message: "User Register"})
  } catch (err) {
    res.json({message: `Something went wrong ${err}`});
  }
}

export { register };