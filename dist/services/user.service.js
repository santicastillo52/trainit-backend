"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_provider_1 = require("../providers/user.provider");
class UserService {
    async fetchAllUsers() {
        return await (0, user_provider_1.findAllUsersFromDB)();
    }
    async updateUser(userData, userId) {
        return await (0, user_provider_1.updateUserInDB)(userData, userId);
    }
    async deleteUser(userId) {
        return await (0, user_provider_1.deleteUserFromDB)(userId);
    }
}
exports.UserService = UserService;
