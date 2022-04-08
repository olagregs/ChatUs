import { getCustomRepository } from "typeorm";

import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IUpdateAdminId {
  user_id: string;
  admin_id: string;
}

class UpdateAdminIdService {
  async update({ user_id, admin_id }: IUpdateAdminId) {
    const connectionsRepository = getCustomRepository(ConnectionsRepository);

    await connectionsRepository.update(user_id, { admin_id });
  }
}

export { UpdateAdminIdService }
