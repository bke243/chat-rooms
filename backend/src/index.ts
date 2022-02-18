import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bodyParder from "body-parser";
import morgan from "morgan";
import cors from "cors";
import RoomRoutes from "./routes/roomRoutes";

const socketIo = require("./utils/socket");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// log all requests
app.use(morgan("combined"))

// cors as of now only "http://localhost:3000"
app.use(cors({
  origin: ["*"],
}));

// parse all the request body
app.use(bodyParder.json());

app.use("/rooms", RoomRoutes);

const APPLICATION_PORT = process.env.PORT || 6000;
const MONGODB_URL = process.env.MONGODB_URL || "";

mongoose.connect(MONGODB_URL).then(_successConnexionResult => {
  const appServer = app.listen(APPLICATION_PORT, () => {
    console.log(`============= The application started on port ${APPLICATION_PORT} ============`);
  })
  // seting  up the websocket connection
  socketIo.init(appServer);
}).catch(_error => {
  process.exit();
})


