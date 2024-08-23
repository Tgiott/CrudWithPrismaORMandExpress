import dotenv from "dotenv"


// OUR ORM FRAMEWORK 
import { PrismaClient } from "@prisma/client";


// REQUEST LOGGER
import morgan from "morgan";

// EXPRESS 
import express, { Application } from "express";

// Routes
import { route } from "./routes";

dotenv.config();
const app: Application  = express();



app.use(express.json());
app.use(morgan('tiny'));
app.use(route);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log( `Server running on port ${PORT}`)
});