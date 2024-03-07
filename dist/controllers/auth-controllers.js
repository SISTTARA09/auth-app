var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import { handleCredentialsErrors } from "../errors/auth-errors.js";
import bcrypt from "bcrypt";
import { generateToken } from "../configs/jwt-token.js";
/// IMPORTS
// GET
function getSignupController(req, res) {
    res.status(200).render("auth/signup-form", { title: "Sign-up:)" });
}
function getLoginController(req, res) {
    res.render("auth/login-form", { title: "user Form" });
}
///
// POST
function postSignupController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = req.body;
        try {
            yield User.create(Object.assign({}, userData));
            console.log("user is created");
            res.redirect(301, "/auth/login");
        }
        catch (error) {
            const errorObj = yield handleCredentialsErrors(error);
            res.status(500).send(errorObj);
        }
    });
}
function postLoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield User.findOne({ email });
            // if user
            if (user) {
                const isPassword = yield bcrypt.compare(password, user.password);
                // if wrong password
                if (!isPassword)
                    return res.send({ password: "wrong password!!" });
                ///
                const token = generateToken(user);
                return res
                    .status(200)
                    .cookie("jwt", token, {
                    maxAge: 60 * 60 * 1000,
                    secure: true,
                    httpOnly: true,
                })
                    .redirect("/");
            }
            // if there is no user
            return res.send({ email: "this email is not signed yet!!" });
        }
        catch (error) {
            const errorObj = yield handleCredentialsErrors(error);
            res.status(500).send(errorObj);
        }
    });
}
///
export { getLoginController, getSignupController, postSignupController, postLoginController, };
