"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const getUsers = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error obteniendo usuarios', error });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando usuario', error });
    }
};
exports.createUser = createUser;
