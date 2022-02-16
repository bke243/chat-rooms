import Room from "../models/Room";

class RoomService {
  private roomModel: typeof Room = Room;

  public getAllRooms = async () => {
    return this.roomModel.find();
  }

  public createAndSaveRoom = async (roomName: string) => {
    const room =  new this.roomModel({ name: roomName, created: Date.now() });
    return room.save();
  };
}

export default new RoomService();