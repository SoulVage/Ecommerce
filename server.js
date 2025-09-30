const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// فولدر استاتیک برای فرانت
app.use(express.static(path.join(__dirname, 'src')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = '1h'; // توکن اصلی 1 ساعت معتبره
const USERS_FILE = path.join(__dirname, 'data', 'user.json'); // ../data/user.json

// ساده ولی کارا: rate limit برای endpoint حسّاس
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // حداکثر 20 درخواست در بازه
  message: { message: 'Too many requests, try again later' }
});

// helper: خواندن کاربران از فایل (هر بار می‌خونه تا تغییرات سریع اعمال شه)
async function readUsers() {
  const raw = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(raw);
}

// helper: ارسال پاسخ عمومی برای خطاهای لاگین (جلوگیری از user enumeration)
function invalidCredentials(res) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

// POST /api/login
app.post('/api/login', authLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const users = await readUsers();
    const user = users.find(u => String(u.email || '').toLowerCase() === email);

    if (!user) return invalidCredentials(res);

    // **توجه**: چون user.json پسورد رو به‌صورت plain داره، اینجا مستقیم مقایسه می‌کنیم.
    // در عمل: بهتره password_hash ذخیره کنی و از bcrypt.compare استفاده کنی.
    if (user.password !== password) return invalidCredentials(res);

    // payload کوچک و مفید
    const payload = { sub: user.id, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // ست کردن کوکی امن
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // در prod باید true باشه (HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 // 1 ساعت مطابق با expiresIn
    });

    // برمی‌گردونیم اطلاعاتی که نیاز به نمایش در فرانت داره (بدون پسورد)
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    return res.json({ message: 'Authenticated', user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/me -> چک می‌کنه کوکی JWT رو و اطلاعات کاربر رو می‌فرسته
app.get('/api/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const users = await readUsers();
    const user = users.find(u => u.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    return res.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/logout -> پاک کردن کوکی
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Logged out' });
});

// پورت رو انتخاب کن
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
