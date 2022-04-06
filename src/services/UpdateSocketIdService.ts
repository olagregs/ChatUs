import { getCustomRepository } from 'typeorm';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { Connection } from '../entities/Connection';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUpdateSocket {
  user_id: string;
  socket_id: string;
}

class UpdateSocketIdService {
  async update({ user_id, socket_id }: IUpdateSocket) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne(user_id);

    if (!userExists) {
      throw new Error("User does not exists");
    }

    const connectionsRepository = getCustomRepository(ConnectionsRepository);

    await connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ socket_id })
      .where("user_id = :user_id", { user_id })
      .execute();
  }
}

export { UpdateSocketIdService }