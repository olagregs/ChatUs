import { Request, Response } from 'express';

import { ListMessagesService } from '../services/ListMessagesService';

class ListMessagesController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.params;

    const listMessagesService = new ListMessagesService();

    const messages = await listMessagesService.list(user_id);

    return response.status(200).json(messages);
  }
}

export { ListMessagesController }