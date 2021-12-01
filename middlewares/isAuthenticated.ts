import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload } from 'jsonwebtoken' 
import { Error } from "mongoose";
import { customResponse } from '../helpers/customResponse';
import User from "../models/user";

interface TokenInterface {
  uid: string
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let response
  let nextBool: boolean = false 
  try {
    if(req.headers && req.header('x-token')){
      
      const token: string = req.header('x-token') || ''
      const { uid }: TokenInterface = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as TokenInterface
      
      if(uid){
        
        const user = await User.findById(uid)
        if(user && user.active){
          nextBool = true
          next()
        }

      }
  
    } 
      
    response = customResponse(500, {} , true, 'Debes iniciar sesión para realizar cualquier acción.')
    

    if(!nextBool){
      res.send(response)
    }
  } catch (error: any) {
    console.log({ error })
    res.send(customResponse(500, {} , true, error.message))
  }
  
}
