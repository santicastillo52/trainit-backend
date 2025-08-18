import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import passport from 'passport';
import { generateToken } from '../providers/jwt.provider';

const authService = new AuthService();

export const registerController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        
        const userRegistered = await authService.createUser(userData);
        
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: userRegistered
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        
        if (errorMessage.includes('Unique constraint')) {
            return res.status(409).json({ 
                message: 'El email ya está registrado',
                error: 'EMAIL_ALREADY_EXISTS'
            });
        }
        
        res.status(500).json({ 
            message: 'Error al registrar usuario', 
            error: errorMessage 
        });
    }
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

        try {
            const token = generateToken({
                id: user.id,
                email: user.email,
                name: user.name
            });

            return res.json({
                message: 'Autenticación exitosa',
                token,
                user: { 
                    id: user.id, 
                    email: user.email,
                    name: user.name 
                }
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

