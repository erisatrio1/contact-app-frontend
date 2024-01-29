import ContactList from "./ContactList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    error,
    isPending,
    data: contacts,
    totalContacts,
  } = useFetch("http://localhost:5000/");

  const sorter = (a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

  return (
    <div className="home">
      <h2>All Contacts</h2>
      <p>{totalContacts} contacts with phone numbers</p>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {contacts && (<ContactList contacts={contacts.sort(sorter)} totalContacts={totalContacts}/>
      )}
    </div>
  );
};

export default Home;
