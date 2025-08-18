import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

 export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const userId = req.params.id
    const userUpdated = await userService.updateUser(userData, userId);
    res.status(201).json(userUpdated);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando usuario', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando usuario', error });
  }
};


