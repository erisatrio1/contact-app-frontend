import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ContactDetails = () => {
    const { _id } = useParams();
    const { data: contact, error, isPending } = useFetch('http://localhost:5000/detail/' + _id);
    const navigate = useNavigate();
  
    const handleClick = () => {
      fetch('http://localhost:5000/detail/' + contact._id, {
        method: 'DELETE'
      }).then(() => {
        navigate('/');
      }) 
    }

    const handleEdit = () => {
      navigate('/edit/' + _id);
    }

    return (  
        <div className="blog-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { contact && (
          <article>
            <button onClick={() => {navigate(-1)}} className="back">Back..</button>
            <h2>{ contact.name }</h2>
            <p>Phone Number: { contact.noPhone }</p>
            <p>email: { contact.email }</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleClick}>Delete</button>
          </article>
        )}
      </div>
    );
}
 
export default ContactDetails;