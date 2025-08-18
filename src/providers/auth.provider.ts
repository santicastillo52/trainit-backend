
import prisma from '../providers/prisma.provider';

export const authProvider = {
    register: async (userData: any) => {
        const user = await prisma.user.create({
            data: userData.data
        })
        return user
    }
}