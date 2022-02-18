import mongoose , { Schema } from "mongoose";
import { RoomMember } from "../utils/room.util";

const roomSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  members: { type: [{
    socketId: { type: String, required: true },
    name: { type: String, required: true },
    joinDate: { type: Date, required: true },
    }], 
    default: [], 
  },
  messages: {
    type: [{
      sender: {  },
      content: { type: String, required: true },
      sendDate: { type: Date, required: true },
    }],
    default: [],
  }
})

roomSchema.methods.addMemberToRoom = function (newRoomMember: RoomMember) {
  const upadatedRoomMembers = [...this.members, newRoomMember];
  this.members = upadatedRoomMembers;
  return this.save();
}

roomSchema.methods.removeMemberFromRoom = async function (socketId: string) {
  // TODO reduce the  number of iterations
  const roomMembers = [...this.members];
  const userIndex = roomMembers.findIndex((member) => member.socketId === socketId);
  const userDetails = roomMembers[userIndex];
  const upadatedRoomMembers = [...this.members].filter(member => member.socketId !== socketId);
  this.members = upadatedRoomMembers;
  await this.save();
  return userDetails;
}

export default mongoose.model("Room", roomSchema);
