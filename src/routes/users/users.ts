import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
//import { prisma } from "../lib/prisma";
//import { mailClient } from "../lib/mail";
//import {dayjs} from "../lib/dayjs";
//import nodemailer from 'nodemailer';

import { userToCreateDTO } from "../../validation/user.schemas";
import { prisma } from "../../database/prisma";


export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/users",
    {
        schema: {
            body: z.object( {
              name: z.string(),
              email: z.string(),
              password: z.string(),
              confirmPassword: z.string()
          })
          
        }
    },
    async (request, reply) => {

        const {name,email, password, confirmPassword} = request.body

       const user = await prisma.user.create({
            data: {
                name,
                email,
                password  
            }
        })

      return reply.redirect(`http://localhost:3000/users/${user.id}`)
    }
  )
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
     const user = await prisma.user.findUnique(
          {where: {
              id: userId
          }}
      )

      return {user}
    },
  );
}
