"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_provider_1 = __importDefault(require("../providers/prisma.provider"));
class UserService {
    async findAll() {
        return await prisma_provider_1.default.user.findMany();
    }
    async createUser(userData) {
        return await prisma_provider_1.default.user.create({
            data: userData
        });
    }
}
exports.UserService = UserService;
