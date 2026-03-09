const path = require("path");
const { readFile, writeFile } = require("../utils/file.util");

const DATA_FILE = path.join(
  __dirname,
  "..",
  "..",
  "Data",
  "ContactUs.json"
);

// CREATE
const createContact = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const contacts = readFile(DATA_FILE);

  const newContact = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  writeFile(DATA_FILE, contacts);

  res.status(201).json(newContact);
};

// READ ALL
const getAllContacts = (req, res) => {
  res.json(readFile(DATA_FILE));
};

// READ ONE
const getContactById = (req, res) => {
  const id = Number(req.params.id);
  const contacts = readFile(DATA_FILE);

  const contact = contacts.find((c) => c.id === id);

  if (!contact)
    return res.status(404).json({ error: "Message not found" });

  res.json(contact);
};

// UPDATE
const updateContact = (req, res) => {
  const id = Number(req.params.id);
  const contacts = readFile(DATA_FILE);

  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1)
    return res.status(404).json({ error: "Message not found" });

  contacts[index] = { ...contacts[index], ...req.body };

  writeFile(DATA_FILE, contacts);

  res.json(contacts[index]);
};

// DELETE
const deleteContact = (req, res) => {
  const id = Number(req.params.id);
  const contacts = readFile(DATA_FILE);

  const filtered = contacts.filter((c) => c.id !== id);

  writeFile(DATA_FILE, filtered);

  res.json({ message: "Deleted successfully" });
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};