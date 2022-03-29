import { Request, Response } from 'express';

import { CreateMessagesService } from '../services/CreateMessagesService';

class CreateMessagesController {
  async execute(request: Request, response: Response) {
    const { user_id, admin_id, text } = request.body;

    try {
      const createMessagesService = new CreateMessagesService();

      const message = await createMessagesService.create({
        user_id,
        admin_id,
        text
      });

      return response.status(201).json(message);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}

export { CreateMessagesController }