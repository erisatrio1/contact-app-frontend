import { Link } from "react-router-dom";

const ContactList = ({ contacts }) => {
  
  return (
    <div className="blog-list">
      {contacts.map((contact) => (
        <div className="blog-preview" key={contact._id}>
          <Link to={`/detail/${contact._id}`}>
            <h2>{contact.name}</h2>
            <p>Phone Number: {contact.noPhone}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
