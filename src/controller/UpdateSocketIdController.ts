import { Request, Response } from 'express';

import { UpdateSocketIdService } from '../services/UpdateSocketIdService';

class UpdateSocketIdController {
  async execute(request: Request, response: Response) {
    const { user_id, socket_id } = request.body;

    const updateSocketIdService = new UpdateSocketIdService();

    try {
      await updateSocketIdService.update({ user_id, socket_id });

      return response.status(202).json({
        message: "Socket updated successfully"
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}

export { UpdateSocketIdController }