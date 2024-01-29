import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [noPhone, setNoPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = { name, email, noPhone };

    fetch("http://localhost:5000/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((res) => {
        if (res.Response === "False") {
          setMsg(res.errors);
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div className="container">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="back"
      >
        Back..
      </button>
      <div className="create">
        <h2>Add a New Contact</h2>
        {msg && (
          <div className="alert">
            <ul>
              {msg.map((m) => (
                <li key={m.msg}>{m.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="inputName">Name:</label>
          <input
            type="text"
            required
            id="inputName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="text"
            required
            id="inputEmail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="inputNoPhone">Phone Number:</label>
          <input
            type="text"
            required
            id="inputNoPhone"
            name="noPhone"
            value={noPhone}
            onChange={(e) => setNoPhone(e.target.value)}
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
