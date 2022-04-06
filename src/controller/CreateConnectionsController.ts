import { Request, Response } from 'express';

import { CreateConnectionsService } from '../services/CreateConnectionsService';

class CreateConnectionsController {
  async execute(request: Request, response: Response) {
    const { user_id, admin_id, socket_id } = request.body;

    const createConnectionsService = new CreateConnectionsService();

    const connection = await createConnectionsService.create({
      user_id,
      admin_id,
      socket_id
    });

    return response.status(201).json(connection);
  }
}

export { CreateConnectionsController }