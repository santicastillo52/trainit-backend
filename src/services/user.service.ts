
import prisma from '../providers/prisma.provider';
import { CreateUserData, User } from '../types/user';


export class UserService {
  async findAll() {
    return await prisma.user.findMany();
  }

 
}