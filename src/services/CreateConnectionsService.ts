import { getCustomRepository } from 'typeorm';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface ICreateConnection {
  user_id: string;
  admin_id?: string;
  socket_id?: string;
}

class CreateConnectionsService {
  async create({ user_id, admin_id, socket_id }: ICreateConnection) {
    const connectionsRepository = getCustomRepository(ConnectionsRepository);

    const connectionExists = await connectionsRepository.findOne(user_id);

    if (connectionExists) {
      throw new Error("Connection already exsits");
    }

    const connection = connectionsRepository.create({
      user_id,
      admin_id,
      socket_id
    });

    await connectionsRepository.save(connection);

    return connection;
  }
}

export { CreateConnectionsService }