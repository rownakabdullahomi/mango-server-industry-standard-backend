import express, { Application } from "express";
import routes from "./modules/routes";


const app: Application = express();


app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({ success: true, message: "Server is running" });
});


export default app;