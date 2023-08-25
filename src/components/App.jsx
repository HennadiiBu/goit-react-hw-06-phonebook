import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const contacts = useSelector(state => state.contacts.contacts);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />

      <ContactList contacts={contacts} />
      <ToastContainer />
      {localStorage.setItem(`contacts`, JSON.stringify(contacts))}
    </div>
  );
}

export default App;
