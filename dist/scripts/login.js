var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const from = document.querySelector("form");
// const usernameError = document.querySelector(
// 	".error.username"
// ) as HTMLParagraphElement;
const emailError = document.querySelector(".error.email");
const passwordError = document.querySelector(".error.password");
/// GET ELEMENTS
// SUBMIT
from === null || from === void 0 ? void 0 : from.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    // post to db
    try {
        const response = yield fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.redirected) {
            window.location.assign(response.url);
        }
        else {
            const errorObj = yield response.json();
            console.log("before show errors", errorObj);
            showErrors(errorObj);
        }
    }
    catch (error) {
        console.log("fetch error: ", error.message);
    }
}));
///
// show errors
function showErrors(errorObj) {
    emailError.textContent = errorObj.email || " ";
    passwordError.textContent = errorObj.password || " ";
    return;
}
export {};
///
