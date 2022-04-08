import { io } from "../http";
import { FindConnectionsService } from "../services/FindConnectionsService";
import { ListMessagesService } from "../services/ListMessagesService";
import { UpdateAdminIdService } from "../services/UpdateAdminIdService";

interface Id {
  user_id: string;
}

io.on("connect", async (socket) => {
  const admin_id = socket.id;

  const findConnectionsService = new FindConnectionsService();

  const connections = await findConnectionsService.find();

  io.emit("connections_to_attend", connections);

  socket.on("admin_list_user_message", async (params, callback) => {
    const { user_id } = params as Id;

    const listMessagesService = new ListMessagesService();

    const messages = await listMessagesService.list(user_id);

    callback(messages);
  });
});