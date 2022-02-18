import { Request, Response } from "express";
import RoomService from "../services/RoomService";
import { HTTP_STATUS_CODES } from "../utils/statusCode";

class RoomController {
  public getAllRooms = async (_request: Request, response: Response) => {
    return RoomService.getAllRooms().then((rooms) => {
      return response.json(rooms);
    });
  }

  public createRoom = async (request: Request<{}, {}, { roomName?: string }>, response: Response) => {
    const roomName = request.body?.roomName;
    if (!Boolean(roomName)) return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json("Missing the roomName");

    return RoomService.createAndSaveRoom(roomName!)
      .then((createdRoom) => {
        return response.json(createdRoom);
        })
      .catch((error) => {
        // TODO as of now only conflict is possible 
        return response.status(HTTP_STATUS_CODES.CONFLICT).json(error.message);
    });
  }
}

export default new RoomController();