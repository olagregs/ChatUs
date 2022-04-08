import { Request, Response } from 'express';

import { UpdateAdminIdService } from '../services/UpdateAdminIdService';

class UpdateAdminIdController {
  async execute(request: Request, response: Response) {
    const { user_id, admin_id } = request.body;

    const updateAdminIdService = new UpdateAdminIdService();

    try {
      await updateAdminIdService.update({ user_id, admin_id });

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

export { UpdateAdminIdController }