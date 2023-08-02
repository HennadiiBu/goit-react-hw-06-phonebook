import React, { useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const load = () => {
  try {
    const serializedState = localStorage.getItem('contacts');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function App() {
  const [contacts, setContacts] = useState(load() === undefined ? [] : load());

  const addNewContact = contact => {
    const newContact = { ...contact, id: nanoid() };

    const isDublicated = contacts.some(
      elem => elem.name === newContact.name
    );
    if (isDublicated) {
      return toast.error('Contact is alredy exsist');
    }

    localStorage.setItem(`contacts`, JSON.stringify(newContact));

    const parseData = JSON.parse(localStorage.getItem(`contacts`));

    setContacts(()=>[...contacts, parseData])
  };

  const deleteContact = contactId => {
    setContacts(() => contacts.filter(elem => elem.id !== contactId));
  };

  const findContact = name => {
    setContacts(() =>
      contacts.filter(elem =>
        elem.name.toLowerCase().includes(name.trim().toLowerCase())
      )
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2>Contacts</h2>
      <Filter findContact={findContact} />

      <ContactList contactsList={contacts} deleteContact={deleteContact} />
      <ToastContainer />
      {localStorage.setItem(`contacts`, JSON.stringify(contacts))}
    </div>
  );
}

export default App;
