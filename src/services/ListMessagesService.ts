import { getCustomRepository } from "typeorm";

import { MessagesRepository } from "../repositories/MessagesRepository";

class ListMessagesService {
  async list(user_id: string) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const messages = await messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return messages;
  }
}

export { ListMessagesService }