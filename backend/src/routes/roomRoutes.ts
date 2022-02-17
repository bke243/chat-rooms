import { Router } from "express";
import RoomController from "../controllers/RoomController";

const router = Router();

router.get("/", RoomController.getAllRooms);
router.post("/", RoomController.createRoom);


export default router;