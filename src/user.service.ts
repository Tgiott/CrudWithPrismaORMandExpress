import { PrismaClient } from "@prisma/client";
import { UpdateUserDTO, UserDTO, UserToCreateDTO } from "./types";


const prisma = new PrismaClient();

export class UserService {

async createdUser(usersToCreate: UserToCreateDTO ): Promise<UserDTO | any>  { 
  const createdUsers =  await prisma.user.createMany({
    data: usersToCreate,
    skipDuplicates: true, // Optional: Skip duplicate entries if any
  });

  return createdUsers;
}
  // Find all users
  async allUsers (): Promise<UserDTO[] | any> {
      const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  // Find a user by id
  async userById(id: string): Promise<UserDTO | any > {

      const userById = await prisma.user.findUnique({
        where: {
          id: id
        },select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
      });

     return userById;
      
  }

  // Update a user
  async updatedUser(updateUser: UpdateUserDTO): Promise<UpdateUserDTO | any> {
      
      const updatedUser = await prisma.user.update({
        where: {
          id: updateUser.id,
        },
        data: {
          name: updateUser.name,
          email: updateUser.email
        },
      });

      return updateUser;
  }

  // Delete a user
  async deletedUser(idUserToBeDeleted: string) {

      const deletedUser = await prisma.user.delete({
        where: {
          id: idUserToBeDeleted,
        },
      });

      console.log(deletedUser);
      console.log(`User with id ${idUserToBeDeleted} deleted`); // Informative message
 

  }
}

