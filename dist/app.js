var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import path from "path";
import authRouter from "./routes/auth-routes.js";
import { userRouter } from "./routes/user-routes.js";
config();
/// IMPORTS
// APP
const app = express();
///
// SET CSS
app.use(express.static("dist"));
///
// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
///
// PUG SETTINGS
app.set("views", path.join(process.cwd(), "dist/views"));
app.set("view engine", "pug");
///
// ROUTES
app.use("/auth", authRouter);
app.use("/user", userRouter);
///
// METHODS
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("public/home", { title: "Home" });
}));
///
// GLOBALS
app.get("/*", (req, res) => {
    res.render("helpers/error", { title: "Error" });
});
///
// LISTEN
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(String(process.env.MONGODB_URI));
        app.listen(process.env.PORT, () => {
            console.log(`running on port: ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("not listenning!!!: ", error.message);
    }
}))();
///
