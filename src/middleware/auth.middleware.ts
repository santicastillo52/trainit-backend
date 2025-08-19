import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.status(401).json({ 
                message: 'Token inválido o expirado',
                error: 'INVALID_TOKEN'
            });
        }


        try {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                const { tokenService } = await import('../services/token.service');
                
                if (tokenService.isTokenRevoked(token)) {
                    return res.status(401).json({ 
                        message: 'Token revocado',
                        error: 'TOKEN_REVOKED'
                    });
                }
            }
        } catch (error) {
            console.error('Error verificando token revocado:', error);
          
        }

        req.user = user;
        next();
    })(req, res, next);
};
