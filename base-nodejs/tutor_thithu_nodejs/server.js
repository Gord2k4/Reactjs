import express from "express";
import connectMongoDB from "./config/dbconfig.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
connectMongoDB("mongodb://127.0.0.1:27017/angular");
app.listen(3000);
app.use("/", router);
export const viteNodeApp = app;
