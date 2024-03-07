import { Router } from "express";
import { getProfileController } from "../controllers/user-controllers.js";
import { checkLogin } from "../middlewares/auth-middleware.js";
const userRouter = Router();
userRouter.get("/profile", checkLogin, getProfileController);
export { userRouter };
