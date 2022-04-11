import { getCustomRepository } from "typeorm";

import { io } from "../http";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateConnectionsService } from "../services/CreateConnectionsService";
import { CreateMessagesService } from "../services/CreateMessagesService";
import { CreateUsersService } from "../services/CreateUsersService";
import { ListMessagesService } from "../services/ListMessagesService";
import { UpdateSocketIdService } from "../services/UpdateSocketIdService";

interface Iparams {
  admin_id: string,
  text: string
}

io.on("connect", socket => {
  const usersRepository = getCustomRepository(UsersRepository);
  const connectionsRepository = getCustomRepository(ConnectionsRepository);

  const createUsersService = new CreateUsersService();
  const createConnectionsService = new CreateConnectionsService();
  const updateSocketIdService = new UpdateSocketIdService();
  const createMessagesService = new CreateMessagesService();
  const listMessagesService = new ListMessagesService();

  socket.on("first_access", async (params) => {
    let user_id = null;
    const socket_id = socket.id;
    const { email, text } = params;

    const userExists = await usersRepository.findOne({ email });

    if (!userExists) {
      const user = await createUsersService.create(email);
      user_id = user.id;

      await createConnectionsService.create({
        user_id,
        socket_id
      });
    } else {
      user_id = userExists.id;

      const valdateConnection = await connectionsRepository.findOne({ user_id });

      if (!valdateConnection) {
        await createConnectionsService.create({
          user_id,
          socket_id
        });
      } else {
        await updateSocketIdService.update({
          user_id,
          socket_id
        });
      }
    }

    await createMessagesService.create({
      user_id,
      text
    });

    const messages = await listMessagesService.list(user_id);

    socket.emit("client_list_all_messages", messages);

    socket.on("client_send_message", async (params) => {
      const { admin_id, text } = params as Iparams;

      const { created_at } = await createMessagesService.create({
        user_id,
        text
      });

      const messasge = {
        text,
        created_at
      }

      io.to(admin_id).emit("client_send_to_admin", messasge);
    });
  });
});