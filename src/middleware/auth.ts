import { NextFunction, Request, Response } from "express";
import AppError from "../error/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user.model";

export const auth =
  (role: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) throw new AppError(401, "Authorization header not found");
    //> console.log("token:", token);

    const isVerified = jwt.verify(token, "Very Secret") as JwtPayload;
    //> console.log("verified data: ", isVerified);

    const isUserExist = await User.findOne({email: isVerified.email});
    if (!isUserExist) throw new AppError(404, "User not found!!");

    console.log("role: ", role, isVerified.role);
    if(!role.includes(isVerified.role)) throw new AppError(401,"You can not access here!!")

      req.user = isUserExist;

    next();
  };
