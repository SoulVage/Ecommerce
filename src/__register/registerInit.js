import { loginInit } from "../__login_script/loginInit.js"


export async function signup(email, username, password) {
  try {
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email, username, password
        })
    })
    if (res.ok) {
        loginInit(email, password)
    }else {
        console.log("problem happened")
    }
  }catch (err) {
    console.log(err)
  }
}