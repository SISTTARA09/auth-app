import { Router } from "express";
import { getLoginController, postLoginController, getSignupController, postSignupController, } from "../controllers/auth-controllers.js";
// IMPORTS
// ROUTER
const authRouter = Router();
///
// LOGIN
authRouter.get("/login", getLoginController);
authRouter.post("/login", postLoginController);
///
// SIGN_UP
authRouter.get("/signup", getSignupController);
authRouter.post("/signup", postSignupController);
///
export default authRouter;
