import { findAllUsersFromDB, updateUserInDB, deleteUserFromDB } from '../providers/user.provider';



export class UserService {
  async fetchAllUsers() {
    return await findAllUsersFromDB();
  }

 async updateUser(userData: any, userId: string){
  return await updateUserInDB(userData, userId);
 }

 async deleteUser(userId: string) {
  return await deleteUserFromDB(userId);
 }
}