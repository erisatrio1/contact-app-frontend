import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [oldName, setOldName] = useState("");
  const [noPhone, setNoPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const url = "http://localhost:5000/detail/" + _id;
  
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((res) => {
        setId(res._id);
        setOldName(res.name || res.oldName);
        setName(res.name);
        setNoPhone(res.noPhone);
        setEmail(res.email);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          console.log(err);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = { _id: id, oldName, name, email, noPhone };

    fetch("http://localhost:5000/edit/" + _id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    }).then((res) => {
      if (!res.ok) {
        // error coming back from server
        throw Error("could not fetch the data for that resource");
      }
      return res.json();
    }).then((res) => {
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
        <h2>Edit Contact</h2>
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
          <input type="hidden" required id="inputId" name="_id" value={id} />
          <input
            type="hidden"
            required
            id="inputOldName"
            name="oldName"
            value={oldName}
          />
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
          <button type="submit">Edit Contact</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
