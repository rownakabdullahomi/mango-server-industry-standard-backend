import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interfaces/error";
import mongoose from "mongoose";
import { ZodError } from "zod";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Internal server error"
  let errorSources: TErrorSources[] = [];

  if (error.code === 11000) {
    const duplicate = error.message.match(/"([^"]*)"/)[1];
    message = `${duplicate} is already exists..`
  }
  else if(error instanceof mongoose.Error.CastError){
    message = "Invalid Mongodb ObjectId"
  }
  
  else if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors);

    errors.forEach((err) => {
      errorSources.push({
        path: err.path,
        message: err.message,
      });
    });
  }

  else if (error instanceof ZodError){
    error.issues.forEach((issue)=>{
      errorSources.push({
        path: issue.path[issue.path.length - 1] as string,
        message: issue.message
      })
    })
  }

  res.status(statusCode).json({
    success: false,
    message: message || "Something went wrong",
    errorDetails: error,
    error: errorSources,
  });
}

export default globalErrorHandler;