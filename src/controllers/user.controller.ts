import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

 export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error });
  }
};

 export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creando usuario', error });
  }
};



