import AppError from "../../error/appError";
import User from "../user/user.model";
import * as bcrypt from "bcryptjs";

const changePassword = async (
  email: string,
  newPassword: string,
  oldPassword: string
) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) throw new AppError(404, "User not found!!");

  const storedPassword = isUserExist.password;
  const isMatchedPassword = await bcrypt.compare(oldPassword, storedPassword);
  if (!isMatchedPassword) throw new AppError(403, "Password not matched");

  isUserExist.password = await bcrypt.hash(newPassword, 10);
  await isUserExist.save();
  return isUserExist;
};

const resetPassword = async (
  email: string,
  phone: string,
  password: string
) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) throw new AppError(404, "User not found!!");

  const checkPhoneNumber = isUserExist.phone === phone;

  if (!checkPhoneNumber) throw new AppError(403, "Wrong phone number");

  isUserExist.password = await bcrypt.hash(password, 10);
  await isUserExist.save();

    const { password: _password, ...rest } = isUserExist.toObject();

  return rest;
};

export const authService = {
  changePassword,
  resetPassword
};
