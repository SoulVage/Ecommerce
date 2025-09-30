import { errorMessage } from "../../ui/msgLogin.js";
import { emailCheck } from "./fetchEmail.js";
import { signup } from "./registerInit.js";

export async function inputValidate() {
    const emailValue = document.getElementById("email").value
    const passwordValue = document.getElementById("password").value
    const repeatPassValue = document.getElementById("repeat-password").value
    const usernameValue = document.getElementById("username").value

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (emailValue === "" || passwordValue === "" || repeatPassValue === "" || usernameValue === "") {
        errorMessage("fields Are Empty!")
    }else if (!validateEmail(emailValue)) {
        errorMessage("Email Format Is Incorrect!")
    }else if (passwordValue !== repeatPassValue) {
        errorMessage("passwords does not match")
    }else if (!(await emailCheck(emailValue))) {
        errorMessage("Account already exists with this email")
    }else {
        signup(emailValue, usernameValue, passwordValue)
    }
}