export async function fetchUser() {
    try {
        const res = await fetch("/api/me", {
            method: "GET",
            credentials: "include"
        })
        if (res.ok) {
            const data = await res.json()
            return  data
        }else {
            return null
        }
    }catch (err) {
        console.error(err)
        return null
    }
  }