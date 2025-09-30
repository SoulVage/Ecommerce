export function errorMessage(error) {
    const msgWrapper = document.getElementById("msg")

    if (msgWrapper.innerHTML) {
        msgWrapper.innerHTML = ""
    }
    msgWrapper.innerHTML = 
    `
    <p class="w-full bg-red-600 text-white p-2 my-4 text-sm">${error}</p>
    `
}