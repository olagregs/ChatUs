import { Request, Response } from 'express';

import { FindConnectionsService } from '../services/FindConnectionsService';

class FindConnectionsController {
  async execute(request: Request, response: Response) {
    const findConnectionsService = new FindConnectionsService();

    const connections = await findConnectionsService.find();

    return response.status(200).json({ connections });
  }
}

export { FindConnectionsController }