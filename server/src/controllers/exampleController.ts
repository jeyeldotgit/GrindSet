import { Request, Response } from 'express';

export const exampleController = {
  getExample: (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'Example controller is working!',
      timestamp: new Date().toISOString(),
    });
  },
};

