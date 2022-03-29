import { response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';

class ListSettingsService {
  async list(user: string) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = await settingsRepository.findOne({ user });

    return settings;
  }
}

export { ListSettingsService }