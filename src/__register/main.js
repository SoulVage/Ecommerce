import { checkLogin } from "../__login_script/checkLogin.js"
import { inputValidate } from "./inputValidate.js"

if (await checkLogin()) {
    window.location="../index.html"
}
const submitBtn = document.getElementById("submit")

submitBtn.addEventListener("click", (e)=> {
    inputValidate()
    e.preventDefault()
})