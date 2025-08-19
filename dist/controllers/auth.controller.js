"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const passport_1 = __importDefault(require("passport"));
const jwt_provider_1 = require("../providers/jwt.provider");
const authService = new auth_service_1.AuthService();
const registerController = async (req, res) => {
    try {
        const userData = req.body;
        const userRegistered = await authService.createUser(userData);
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: userRegistered
        });
    }
    catch (error) {
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
};
exports.registerController = registerController;
const loginController = async (req, res, next) => {
    passport_1.default.authenticate('local', async (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ message: 'Credenciales inválidas' });
        try {
            const token = (0, jwt_provider_1.generateToken)({
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
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
};
exports.loginController = loginController;
