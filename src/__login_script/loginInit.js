export async function loginInit(email, password) {
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
            credentials: "include"
        });
        const data = await res.json()

        if (res.ok) {
            window.location.href = "../index.html";
        }else if (res.status === 401) {
            console.log("⚠️ Login failed: wrong email or password");
        }
        else {
            console.log("login fialed")
        }

    }catch (err) {
        console.log("network or parse error")
    }
}

