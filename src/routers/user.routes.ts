import {Router} from "../../deps.ts"
import { getAllUserControllers, createUserControllers, findUserControllers, deletUserControllers, updateUserIDController } from "../controllers/user.Controllers.ts";

export const userRouter = new Router()
.get("/users", getAllUserControllers)
.get("/users/:id", findUserControllers)
.post("/users", createUserControllers)
.delete("/users/:id", deletUserControllers)
.put("/users/:id", updateUserIDController)