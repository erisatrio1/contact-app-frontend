import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Create';
import ContactDetails from './ContactDetails';
import Edit from './Edit';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element= {<Home/>}/>

            <Route path="/create"  element= {<Create/>}/>

            <Route path="/detail/:_id"  element= {<ContactDetails/>}/>

            <Route path="/edit/:_id"  element= {<Edit/>}/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;