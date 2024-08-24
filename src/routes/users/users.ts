import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
//import { prisma } from "../lib/prisma";
//import { mailClient } from "../lib/mail";
//import {dayjs} from "../lib/dayjs";
//import nodemailer from 'nodemailer';

import { userToCreateDTO } from "../../validation/user.schemas";
import { Prisma } from "../../database/prisma";

export async function createUser(app: FastifyInstance) {


  app.withTypeProvider<ZodTypeProvider>().post("/users", {
    schema: {
      body: userToCreateDTO, 
    },
  }, async (request, reply) => {
    try {
      const { name, email, password } = request.body; 
      const user = await Prisma.user.create({
        data: {
          name,
          email,
          password, 
        },
      });

      return {
        created: true,
        uri: `http://localhost:3333/users/${user.id}`
      }
    } catch (error) {
      console.error(error);
    // return reply.internalServerError('An error occurred while creating the user.');
    }
  });
}

export async function getUserById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/users/:userId",
      {
          schema: {
              params: z.object({
                userId: z.string().uuid()
              })
          }
      },
    async (request) => {
      
      const {userId}  = request.params
     const user = await Prisma.user.findUnique(
          {where: {
              id: userId
          },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        }}
      )

      return {user}
    },
  );
}


export async function getAllUsersAsResource(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/users", async (request) => {
      
     const result = await Prisma.user.findMany(
      {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        }}
      )

      const users  = result.map( (user) => {
            return {
              userId: user.id,
              email: user.email,
              uri: `http://localhost:3333/users/${user.id}`
            }
      }) 

      return {users}
    },
  );
}