import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log("JWT TT");
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(410, "Please login first"));
    }
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         if(err){
             return next(errorHandler(403, "Token is not valid"));
         }
         req.user = user;
         next();
     })

}