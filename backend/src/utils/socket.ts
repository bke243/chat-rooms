import { Server, Socket } from "socket.io";

let io: any;

module.exports = {
  init: (httpServer: Server) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: "*",
      }
    });

    io.on("connection", (_socket: any) => {
        // TODO add more here 
        console.log(" new Client connected");
      });
    return io as Socket;
  },
  getIO : () => {
    if (!io) {
      throw new Error("Errorcls while setting the io socket");
    }
    return io as Socket;
  }, 
}