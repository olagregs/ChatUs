import { io } from "../http";
import { CreateMessagesService } from "../services/CreateMessagesService";
import { FindConnectionsService } from "../services/FindConnectionsService";
import { ListMessagesService } from "../services/ListMessagesService";

interface Iparams {
  user_id: string,
  text: string,
  room: string
}

io.on("connect", async (socket) => {
  const admin_id = socket.id;

  const findConnectionsService = new FindConnectionsService();
  const createMessagesService = new CreateMessagesService();

  const connections = await findConnectionsService.find();

  io.emit("connections_to_attend", connections);

  socket.on("admin_list_user_message", async (params, callback) => {
    const { user_id } = params as Iparams;

    const listMessagesService = new ListMessagesService();

    const messages = await listMessagesService.list(user_id);

    callback(messages);
  });

  socket.on("admin_send_message", async (message) => {
    const { user_id, text, room } = message as Iparams;

    const { created_at } = await createMessagesService.create({
      admin_id,
      text,
      user_id
    });

    const params = {
      admin_id,
      text,
      created_at
    }

    socket.to(room).emit("admin_send_message_to_client", params);
  });
});