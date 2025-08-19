"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRateLimit = exports.authRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Rate limiting para autenticación (login y registro)
exports.authRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos por IP
    message: {
        message: 'Demasiados intentos de autenticación. Intenta de nuevo en 15 minutos.',
        error: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // No contar intentos exitosos
});
// Rate limiting general para todas las rutas
exports.generalRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
    message: {
        message: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.',
        error: 'RATE_LIMIT_EXCEEDED'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
