import { Request, Response } from 'express';

import { CreateSettingsService } from '../services/CreateSettingsService';

class CreateSettingsController {
  async execute(request: Request, response: Response) {
    const { user, chat } = request.body;

    const createSettingsService = new CreateSettingsService();

    try {
      const settings = await createSettingsService.create({
        user,
        chat
      });

      return response.status(201).json(settings);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}

export { CreateSettingsController }