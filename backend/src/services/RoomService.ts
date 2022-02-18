import Room from "../models/Room";
import { RoomMember } from "../utils/room.util";

class RoomService {
  private roomModel: typeof Room = Room;

  public getAllRooms = async () => {
    return this.roomModel.find();
  }

  public createAndSaveRoom = async (roomName: string) => {
    const existingRoom = await this.roomModel.findOne({ name: roomName });
    if (existingRoom) throw new Error("Room already exists");
    const room =  new this.roomModel({ name: roomName, created: Date.now() });
    return room.save();
  };

  public addMemberToRoom = async (socketId: string, username: string, roomName: string) => {
    const newRoomMember: RoomMember = { socketId, name: username, joinDate: Date.now() };
    return this.roomModel
      .findOne({ name: roomName })
      .then(async (room) => {
      // TODO do we need to add a check for the existance of the room
        if (!room) return;
        await  room.addMemberToRoom(newRoomMember);
        return newRoomMember;
    });
  }

  public removeMemberFromRoom = async (socketId: string, roomName: string | null) => {
    return this.roomModel
      .findOne({ name: roomName })
      .then(async (room) => {
        // TODO do we need to add a check for the existance of the room
        if (!room) return;
        return  room.removeMemberFromRoom(socketId);
    });
  }

  public getRoomMembers = async (roomName: string) => {
    return this.roomModel
      .findOne({ name: roomName })
      .then(async (room) => {
        return room.members;
    });
  }
}
export default new RoomService();