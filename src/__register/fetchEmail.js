export async function emailCheck(email) {
    try {
        const res = await fetch("/api/users", {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) {
            console.log("Failed to fetch users:", res.status);
            return false; 
        }

        const data = await res.json();
        const filter = data.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

        return !filter;
    } catch (err) {
        console.log(err);
        return false;
    }
}
