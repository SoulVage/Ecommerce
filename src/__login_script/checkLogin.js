export async function checkLogin() {
    try {
        const res = await fetch("/api/me", {
            method: "GET",
            credentials: "include"
        })
        if (res.ok) {
            const data = await res.json()
            return  true
        }else {
            return false
        }
    }catch (err) {
        console.error(err)
        return null
    }
  }