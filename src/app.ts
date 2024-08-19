import dotenv from "dotenv"


// OUR ORM FRAMEWORK 
import { PrismaClient } from "@prisma/client";


// REQUEST LOGGER
import morgan from "morgan";

// EXPRESS 
import express from "express";
import { Router, Request, Response } from "express";
import { UserService } from "./user.service";

dotenv.config();



const app = express();
const route = Router();


app.use(express.json());
app.use(morgan('tiny'));


route.get('/users', (req: Request, res: Response) => {
  
   return new UserService().allUsers();
})

route.post('/create-user', (req: Request, res: Response) => {

  res.json({message: 'Hello world'})

})




const PORT = process.env.PORT || 8000;

app.use(route);

app.listen(PORT, ()=> `Server running on port ${PORT}`)

