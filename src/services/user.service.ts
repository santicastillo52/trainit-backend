
import prisma from '../providers/prisma.provider';
import { CreateUserData, User } from '../types/user';


export class UserService {
  async findAll() {
    return await prisma.user.findMany();
  }

  async createUser(userData: CreateUserData) {
    return await prisma.user.create({
      data: userData
    });
  }
}