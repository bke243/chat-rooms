import express from "express";
import http from "http";
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
  origin: ["http://localhost:3000"],
}));

// parse all the request body
app.use(bodyParder.json());

app.use("/rooms", RoomRoutes);

const APPLICATION_PORT = process.env.PORT || 6000;
const MONGODB_URL = process.env.MONGODB_URL || "";

mongoose.connect(MONGODB_URL).then(_successConnexionResult => {
  app.listen(APPLICATION_PORT, () => {
    console.log(`============= The application started on port ${APPLICATION_PORT} ============`);
    // seting  up the websocket connection
    const applicationServer = http.createServer(app);
    socketIo.init(applicationServer);
  })
}).catch(error => {
  console.log(error);
  process.exit();
})


