import { email } from "zod";
import { IUser } from "./user.interface";
import User from "./user.model";
import * as bcrypt from "bcryptjs";
import AppError from "../../error/appError";

const registerUser = async (payload: IUser) => {
  payload.password = await bcrypt.hash(payload.password, 10);

  const user = new User(payload);

  const data = await user.save();
  return data;
};
const loginUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (!isUserExist) throw new AppError(404, "User not found!!");

  const checkPassword = await bcrypt.compare(payload.password, isUserExist.password);

  if(!checkPassword) throw new AppError(403, "Password not matched");

  return isUserExist;
};

export const userService = {
  registerUser,
  loginUser,
};
