const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "..", "Data", "login.json");
const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads", "profilePictures");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

function readUsers() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (error) {
    fs.writeFileSync(DATA_FILE, "[]");
    return [];
  }
}

function writeUsers(users) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

const signup = (req, res) => {
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

const signin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.email === email && u.password === password);
  const user = users[userIndex];
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const updatedUser = {
    ...user,
    lastLoginAt: new Date().toISOString(),
    loginCount: (user.loginCount || 0) + 1,
  };

  users[userIndex] = updatedUser;
  writeUsers(users);

  res.json({
    message: "Sign in successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
};

const getAllUsers = (req, res) => {
  const users = readUsers();
  const safe = users.map(({ password, ...rest }) => rest);
  res.json(safe);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (email && email !== users[index].email) {
    if (users.find((u) => u.email === email && u.id !== id)) {
      return res.status(409).json({ error: "Email already in use" });
    }
  }

  if (name) users[index].name = name;
  if (email) users[index].email = email;
  if (password) users[index].password = password;

  writeUsers(users);
  const { password: _, ...safe } = users[index];
  res.json({ message: "User updated successfully", user: safe });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  writeUsers(users);
  res.json({ message: "User deleted successfully" });
};

const uploadProfilePicture = (req, res) => {
  const id = Number(req.params.id);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Delete old profile picture if exists
  if (users[index].profilePicture) {
    const oldFilePath = path.join(__dirname, "../../uploads/profilePictures", path.basename(users[index].profilePicture));
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  // Save new profile picture path
  const profilePictureUrl = `/uploads/profilePictures/${req.file.filename}`;
  users[index].profilePicture = profilePictureUrl;
  users[index].updatedAt = new Date().toISOString();

  writeUsers(users);
  const { password: _, ...safe } = users[index];
  res.json({
    message: "Profile picture uploaded successfully",
    user: safe,
  });
};

const getProfilePicture = (req, res) => {
  const id = Number(req.params.id);

  const users = readUsers();
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.profilePicture) {
    return res.status(404).json({ error: "Profile picture not found" });
  }

  res.json({ profilePicture: user.profilePicture });
};

const deleteProfilePicture = (req, res) => {
  const id = Number(req.params.id);

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!users[index].profilePicture) {
    return res.status(404).json({ error: "No profile picture to delete" });
  }

  // Delete profile picture file
  const filePath = path.join(__dirname, "../../uploads/profilePictures", path.basename(users[index].profilePicture));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  users[index].profilePicture = null;
  users[index].updatedAt = new Date().toISOString();

  writeUsers(users);
  const { password: _, ...safe } = users[index];
  res.json({
    message: "Profile picture deleted successfully",
    user: safe,
  });
};

module.exports = { signup, signin, getAllUsers, updateUser, deleteUser, uploadProfilePicture, getProfilePicture, deleteProfilePicture };