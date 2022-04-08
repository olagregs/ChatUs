import { getCustomRepository } from 'typeorm';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

class FindConnectionsService {
  async find() {
    const connectionsRepository = getCustomRepository(ConnectionsRepository);

    const connections = await connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    });

    return connections;
  }

}

export { FindConnectionsService }