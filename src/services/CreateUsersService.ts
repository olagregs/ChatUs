import { getCustomRepository } from "typeorm";

import { UsersRepository } from '../repositories/UsersRepository';

class CreateUsersService {
  async create(email: string) {

    if (!email) {
      throw new Error("No email address was given!");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new Error("User already exists!");
    }

    const user = usersRepository.create({ email });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUsersService }