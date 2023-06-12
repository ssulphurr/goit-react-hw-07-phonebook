import Section from './Section/Section';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getContacts, getError, getIsLoading } from 'redux/selectors';

export function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>

      <Section title="Contacts">
        <Filter />
        {isLoading && <h2>Loading...</h2>}
        {error && <h2>Opps, something went wrong: {error}</h2>}
        {contacts.length > 0 && !error && <ContactList />}
        {!isLoading && contacts.length === 0 && (
          <h4>You have no contacts. Add some in the form above</h4>
        )}
      </Section>
    </>
  );
}
