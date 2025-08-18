"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_provider_1 = __importDefault(require("../providers/prisma.provider"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_provider_1 = require("../providers/jwt.provider");
const auth_provider_1 = require("../providers/auth.provider");
class AuthService {
    async createUser(userData) {
        const existingUser = await prisma_provider_1.default.user.findUnique({
            where: { email: userData.email }
        });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const newUser = await auth_provider_1.authProvider.register({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            }
        });
        const token = (0, jwt_provider_1.generateToken)({
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
    async loginUser(email, password) {
        const user = await prisma_provider_1.default.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }
        const token = (0, jwt_provider_1.generateToken)({
            id: user.id,
            email: user.email,
            name: user.name
        });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }
}
exports.AuthService = AuthService;
