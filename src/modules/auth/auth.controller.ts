import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";


const changePassword = catchAsync(async(req:Request, res:Response)=>{
    const {email} = req.user;
    const {newPassword, oldPassword} = req.body;

    const result = await authService.changePassword(email, newPassword, oldPassword)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password changed successfully",
        data: result,
      });
})

const resetPassword = catchAsync(async(req:Request, res:Response)=>{
    const {email, phone, password} = req.body;

    const result = await authService.resetPassword(email, phone, password)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Password reset successfully",
        data: result,
      });
})

const logout = catchAsync(async(req, res)=>{
await res.clearCookie("accessToken");
await res.clearCookie("refreshToken");

sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logout successfully",
        data: "",
      });
})

export const authController = {
    changePassword,
    resetPassword, 
    logout
}