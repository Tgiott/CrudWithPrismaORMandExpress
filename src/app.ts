import dotenv from "dotenv"
import fastify from "fastify";
import cors from '@fastify/cors'
import morgan from "morgan";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createUser, getAllUsersAsResource, getUserById } from "./routes/users/users";

dotenv.config();



// REQUEST LOGGER
const app  = fastify();
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors,  {
  origin: true
})


app.register(createUser);
app.register(getUserById);
app.register(getAllUsersAsResource)


app.listen({
  port: 3333
})