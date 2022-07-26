const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "../data/contacts.json");

const updateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);

  if (!result) return null;

  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== id);

  if (!newContacts) return null;
  updateContacts(newContacts);

  return newContacts;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: v4(),
  };
  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
}

async function updateById(id, { name, email, phone }) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) return null;

  contacts[idx] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateById,
};
