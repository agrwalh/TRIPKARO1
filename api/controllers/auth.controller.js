import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//signup
export const signup = async (req, res, next) => {

 
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// signin
export const signin = async (req, res, next) => {
 
  const { email, password } = req.body;

  
  
  try {
    // check if email exist or not
    
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credientials! "));
    }
    // create token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // removing password before sending it to the database/client
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// googleAuth
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // separated passowrd , we don't want to send it to the client
      const { password, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      //  since password in userMODEL is required but in case googleAUTH we don't need passowrd therfore firstly
      // we are generating password for the user model.
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.image,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// signout
export const signout = async (req, res, next) => {
 
  try {
    res.clearCookie("access_token")
    res.status(200).json("User has been Logged out!");
  } catch (error) {
    next(error)
  }
}