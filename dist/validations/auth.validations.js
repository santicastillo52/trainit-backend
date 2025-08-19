"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es requerido',
        'string.empty': 'El email no puede estar vacío'
    }),
    password: joi_1.default.string()
        .min(6)
        .max(50)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'string.max': 'La contraseña no puede exceder 50 caracteres',
        'string.pattern.base': 'La contraseña debe contener al menos una minúscula, una mayúscula y un número',
        'any.required': 'La contraseña es requerida',
        'string.empty': 'La contraseña no puede estar vacía'
    }),
    name: joi_1.default.string()
        .min(2)
        .max(50)
        .required()
        .messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 50 caracteres',
        'any.required': 'El nombre es requerido',
        'string.empty': 'El nombre no puede estar vacío'
    })
});
exports.loginValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es requerido',
        'string.empty': 'El email no puede estar vacío'
    }),
    password: joi_1.default.string()
        .required()
        .messages({
        'any.required': 'La contraseña es requerida',
        'string.empty': 'La contraseña no puede estar vacía'
    })
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).optional(),
    email: joi_1.default.string().email().optional(),
});
