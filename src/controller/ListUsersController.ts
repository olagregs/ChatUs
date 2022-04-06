import { Request, Response } from 'express';

import { ListUsersService } from '../services/ListUsersService';

class ListUsersController {
  async execute(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.List();

    return response.status(200).json(users);
  }
}

export { ListUsersController }