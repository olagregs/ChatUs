import { Request, Response } from 'express';

import { ListSettingsService } from '../services/ListSettingsService';

class ListSettingsController {
  async execute(request: Request, response: Response) {
    const { user } = request.params;

    const listSettingsService = new ListSettingsService();

    const setting = await listSettingsService.list(user);

    return response.status(200).json(setting);
  }
}

export { ListSettingsController }