import { io } from "../http";
import { FindConnectionsService } from "../services/FindConnectionsService";

io.on("connect", async (socket) => {
  const findConnectionsService = new FindConnectionsService();

  const connections = await findConnectionsService.find();

  io.emit("connections_to_attend", connections);
});