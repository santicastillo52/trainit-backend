import prisma from './prisma.provider';

export const findAllUsersFromDB = async () => {
    return await prisma.user.findMany();
};

export const updateUserInDB = async (userData: any, userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
  
    return await prisma.user.update({
        where: { id: userId },
        data: userData
    });
};

export const deleteUserFromDB = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
  
    return await prisma.user.delete({
        where: { id: userId }
    });
};