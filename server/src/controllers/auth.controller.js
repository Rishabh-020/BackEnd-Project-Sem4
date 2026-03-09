import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "..", "..", "data", "users.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

// Read users array from JSON file
function readUsers() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Write users array back to JSON file
function writeUsers(users) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// POST /api/auth/signup
export const signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered" });
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({
    message: "User created successfully",
    user: { id: newUser.id, name, email },
  });
};

// POST /api/auth/signin
export const signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json({
    message: "Sign in successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
};

// GET /api/auth/users
export const getAllUsers = (req, res) => {
  const users = readUsers();
  const safe = users.map(({ password, ...rest }) => rest);
  res.json(safe);
};