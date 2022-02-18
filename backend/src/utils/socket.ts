import { Server, Socket } from "socket.io";
import RoomService from "../services/RoomService";
import { formatMessage } from "./room.util";

interface RoomMemebrShip {
  username: string; 
  room: string;
}

let io: any;

const appName = "Chat room";

module.exports = {
  init: (httpServer: Server) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: "*",
      }
    });

    io.on("connection", (socket: any) => {

      let joinedRoom: string | null = null;

      socket.on('joinRoom', async ({ username, room }: RoomMemebrShip) => {
        const user = await RoomService.addMemberToRoom(socket.id, username, room);

        // TODO No room with name
        if (!user) return;
        
        joinedRoom = room;
    
        socket.join(room);
    
        socket.emit('message', formatMessage(appName, 'Welcome to ChatCord!'));
    
        socket.broadcast
          .to(room)
          .emit(
            'message',
            formatMessage(appName, `${username} has joined the chat`),
          );
    
        const roomMembers = await RoomService.getRoomMembers(room);
        io.to(room).emit('roomUsers', {
          room: room,
          users: roomMembers,
        });
      });

      // TODO send messages in a room

      socket.on('disconnect', async () => {
        const user = await RoomService.removeMemberFromRoom(socket.id, joinedRoom);
   
        if (user && joinedRoom) {
          const messangeContent = `${user.name} has left the chat`;
          io.to(joinedRoom).emit(
            'message',
            formatMessage(appName, messangeContent),
          );
    
          const roomMembers = await RoomService.getRoomMembers(joinedRoom);
          io.to(joinedRoom).emit('roomUsers', {
            room: joinedRoom,
            users: roomMembers,
          });
        }
      });
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