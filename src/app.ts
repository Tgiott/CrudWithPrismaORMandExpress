import dotenv from "dotenv"
import fastify from "fastify";
import cors from '@fastify/cors'
import morgan from "morgan";
import { createUser, getUserById } from "./routes/users/users";

dotenv.config();



// REQUEST LOGGER
const app  = fastify();

app.register(cors,  {
  origin: true
})


app.register(createUser);
app.register(getUserById);


app.listen({
  port: 3333
})