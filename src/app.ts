import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./modules/routes";
import cookieParser from "cookie-parser";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { TErrorSources } from "./interfaces/error";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({ success: true, message: "Server is running" });
});

app.use(globalErrorHandler);

export default app;
