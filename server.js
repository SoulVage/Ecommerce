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
const JWT_EXPIRES_IN = '1h';
const USERS_FILE = path.join(__dirname, 'data', 'user.json');

// rate limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests, try again later' }
});

// helper: خواندن کاربران از فایل
async function readUsers() {
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// helper: نوشتن کاربران در فایل
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// helper: پاسخ خطای ورود
function invalidCredentials(res) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

// helper: ساخت id یکتا با dynamic import
async function generateId() {
  const { v4: uuidv4 } = await import('uuid');
  return uuidv4();
}

// ========== API ها ==========

// POST /api/register
app.post('/api/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const users = await readUsers();
    const existing = users.find(
      u => String(u.email).toLowerCase() === String(email).toLowerCase()
    );
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = {
      id: await generateId(),
      email: email.toLowerCase(),
      username,
      password, // ⚠️ در حالت واقعی باید هش بشه
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json({
      message: 'User registered',
      user: { id: newUser.id, email: newUser.email, username: newUser.username }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const users = await readUsers();
    const safeUsers = users.map(u => ({
      id: u.id,
      email: u.email,
      username: u.username,
      role: u.role
    }));
    return res.json(safeUsers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/login
app.post('/api/login', authLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const users = await readUsers();
    const user = users.find(u => String(u.email || '').toLowerCase() === email);

    if (!user || user.password !== password) return invalidCredentials(res);

    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60
    });

    const safeUser = { id: user.id, username: user.username, email: user.email, role: user.role };
    return res.json({ message: 'Authenticated', user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/me
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

    const safeUser = { id: user.id, username: user.username, email: user.email, role: user.role };
    return res.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Logged out' });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
