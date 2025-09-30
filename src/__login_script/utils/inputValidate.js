import { errorMessage } from "../../ui/msgLogin.js";
import { loginInit } from "../loginInit.js";

export function inputValidate() {
    const emailValue = document.getElementById("email").value
    const passwordValue = document.getElementById("password").value
    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (emailValue === "" || passwordValue === "") {
        errorMessage("fields Are Empty!")
    }else if (!validateEmail(emailValue)) {
        errorMessage("Email Format Is Incorrect!")
    }else {
        loginInit(emailValue.toLowerCase(), passwordValue)
    }
}