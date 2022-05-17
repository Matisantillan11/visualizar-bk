import { Request } from "express"
import User from "src/modules/user/interfaces/user.interface"

export interface RequestAuthenticate extends Request {
  user: User
  database: string
}