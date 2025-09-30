import { fetchUser } from "../__login_script/fetchUser.js"

export async function userUi() {
    const userUi = document.getElementById("login-ui")
    const data = await fetchUser();
if (data) {
    userUi.innerHTML=
    `
    <a href="">${data.user.username}</a>
    `
}
}