import { getCustomRepository } from 'typeorm';

import { MessagesRepository } from '../repositories/MessagesRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface ICreateMessage {
  user_id: string,
  admin_id?: string,
  text: string
}

class CreateMessagesService {
  async create({ user_id, admin_id, text }: ICreateMessage) {
    const messagesRepository = getCustomRepository(MessagesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne(user_id);

    if (!userExists) {
      throw new Error("Invalid user_id!");
    }

    const message = messagesRepository.create({
      user_id,
      admin_id,
      text
    });

    await messagesRepository.save(message);

    return message;
  }
}

export { CreateMessagesService }