export async function emailCheck(email) {
    try {
        const res = await fetch("/api/users", {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) {
            console.log("Failed to fetch users:", res.status);
            return false; // اگر سرور خطا داد، اجازه نده ثبت‌نام ادامه پیدا کنه
        }

        const data = await res.json();
        const filter = data.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

        return !filter; // اگر پیدا شد، false برگردون، یعنی ایمیل تکراریه
    } catch (err) {
        console.log(err);
        return false;
    }
}
