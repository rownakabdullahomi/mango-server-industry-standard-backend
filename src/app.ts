import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./modules/routes";
import cookieParser from "cookie-parser";


const app: Application = express();


app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);


app.use((error: any, req: Request, res: Response, next: NextFunction)=>{
  res.status(500).json({
    success: false,
    message: error.message || "Something went wrong",
    errorDetails: error
  })
})

app.get("/", (req, res) => {
  res.send({ success: true, message: "Server is running" });
});



export default app;