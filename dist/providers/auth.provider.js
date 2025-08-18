"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const prisma_provider_1 = __importDefault(require("../providers/prisma.provider"));
exports.authProvider = {
    register: async (userData) => {
        const user = await prisma_provider_1.default.user.create({
            data: userData.data
        });
        return user;
    }
};
