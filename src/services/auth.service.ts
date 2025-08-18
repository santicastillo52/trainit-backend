import prisma from '../providers/prisma.provider';
import bcrypt from 'bcrypt';
import { generateToken } from '../providers/jwt.provider';
import { CreateUserData } from '../types/user';

export class AuthService {
    async createUser(userData: CreateUserData) {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            }
        });

        const token = generateToken({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
        });
        return {
            message: "Usuario registrado correctamente",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            },
        };



    }
}