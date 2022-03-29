import { Request, Response } from 'express';

import { CreateUsersService } from '../services/CreateUsersService';

class CreateUsersController {
  async execute(request: Request, response: Response) {
    const { email } = request.body;

    const createUsersService = new CreateUsersService();

    try {
      const user = await createUsersService.create(email);

      return response.status(201).json(user);
    } catch (err) {
      return response.json({
        message: err.message
      })
    }
  }
}

export { CreateUsersController }