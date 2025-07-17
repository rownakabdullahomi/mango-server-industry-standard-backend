import { Router } from "express";
import { getUsers, loginUser, registerUser } from "./user.controller";
import { userZodSchema } from "./user.validate";
import { validateRequest } from "../../middleware/validateRequest";

const userRoute = Router();

userRoute.post(
  "/",
  validateRequest(userZodSchema.userCreateZodSchema),
  registerUser
);
userRoute.post(
  "/login",
  validateRequest(userZodSchema.userLoginZodSchema),
  loginUser
);
userRoute.get("/", getUsers);

export default userRoute;
