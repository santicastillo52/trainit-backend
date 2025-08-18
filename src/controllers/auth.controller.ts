import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const registerController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        console.log(userData);
        const userRegistered = await authService.createUser(userData);
        res.status(201).json(userRegistered);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al registrar usuario', error: errorMessage });
    }
}

