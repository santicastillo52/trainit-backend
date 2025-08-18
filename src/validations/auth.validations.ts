import Joi from 'joi';

export const registerValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El email debe tener un formato válido',
            'any.required': 'El email es requerido',
            'string.empty': 'El email no puede estar vacío'
        }),
    password: Joi.string()
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
    name: Joi.string()
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

export const loginValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El email debe tener un formato válido',
            'any.required': 'El email es requerido',
            'string.empty': 'El email no puede estar vacío'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'La contraseña es requerida',
            'string.empty': 'La contraseña no puede estar vacía'
        })
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
});

