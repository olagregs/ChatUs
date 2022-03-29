import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';

interface ICreateSettings {
  user: string,
  chat: boolean
}

class CreateSettingsService {
  async create({ user, chat = true }: ICreateSettings) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userExists = await settingsRepository.findOne({ user });

    if (userExists) {
      throw new Error("User already exists!");
    }

    const setting = settingsRepository.create({
      user,
      chat
    });

    await settingsRepository.save(setting);

    return setting;
  }
}

export { CreateSettingsService }