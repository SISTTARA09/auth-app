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
import * as bcrypt from "bcrypt";
// IMPORTS
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter Your Name!!"],
        maxlength: [9, "Name less Than 9 chars!!"],
        minlength: [3, "must be at least 3 chars!!"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Enter Your email!!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter Your Password!!"],
        minlength: [6, "must be at least 6 chars!!"],
    },
});
// HASING PASSWORD
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
        next();
    });
});
const User = mongoose.model("User", userSchema);
export default User;
