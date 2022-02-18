import moment from "moment";

export interface RoomMember {
  socketId: string;
  name: string;
  joinDate: number;
}

export const formatMessage = (sender: string, message: string) => {
  return {
    sender,
    message,
    time: moment().format("h:mm a")
  }
}