import { checkLogin } from "./checkLogin.js"
import { loginInit } from "./loginInit.js"
import { inputValidate } from "./utils/inputValidate.js"

if (await checkLogin()) {
    window.location="../index.html"
}
const submitBtn = document.getElementById("submit")

submitBtn.addEventListener("click", (e)=> {
    inputValidate()
    e.preventDefault()
})



