"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const getUsers = async (req, res) => {
    try {
        const users = await userService.fetchAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error obteniendo usuarios', error });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const userId = req.params.id;
        const userUpdated = await userService.updateUser(userData, userId);
        res.status(201).json(userUpdated);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando usuario', error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error eliminando usuario', error });
    }
};
exports.deleteUser = deleteUser;
