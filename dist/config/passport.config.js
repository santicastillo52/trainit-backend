"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_provider_1 = __importDefault(require("../providers/prisma.provider"));
// Configuración de la estrategia local (email/password)
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await prisma_provider_1.default.user.findUnique({
            where: { email }
        });
        if (!user) {
            return done(null, false, { message: 'Credenciales inválidas' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Credenciales inválidas' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
// Configuración de la estrategia JWT
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'tu-secreto-jwt-aqui'
}, async (payload, done) => {
    try {
        const user = await prisma_provider_1.default.user.findUnique({
            where: { id: payload.id }
        });
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.default = passport_1.default;
