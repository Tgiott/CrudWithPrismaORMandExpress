import { Router, Request, Response } from "express";
import { UserService } from "./user.service";


export const route = Router();

route.get('/users', (req: Request, res: Response) => {
  
    res.send("hellow")
 })
 
 route.post('/create-user', (req: Request, res: Response) => {
 
   res.json({message: 'Hello world'})
 
 })


 route.put('/update-user', (req: Request, res: Response) => {
 
    res.json({message: 'Hello world'})
  
  })
 

  route.delete('/update-user', (req: Request, res: Response) => {
 
    res.json({message: 'Hello world'})
  
  })
 

