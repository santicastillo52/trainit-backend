"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromDB = exports.updateUserInDB = exports.findAllUsersFromDB = void 0;
const prisma_provider_1 = __importDefault(require("./prisma.provider"));
const findAllUsersFromDB = async () => {
    return await prisma_provider_1.default.user.findMany();
};
exports.findAllUsersFromDB = findAllUsersFromDB;
const updateUserInDB = async (userData, userId) => {
    const user = await prisma_provider_1.default.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return await prisma_provider_1.default.user.update({
        where: { id: userId },
        data: userData
    });
};
exports.updateUserInDB = updateUserInDB;
const deleteUserFromDB = async (userId) => {
    const user = await prisma_provider_1.default.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return await prisma_provider_1.default.user.delete({
        where: { id: userId }
    });
};
exports.deleteUserFromDB = deleteUserFromDB;
