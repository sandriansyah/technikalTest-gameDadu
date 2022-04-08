import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
    </Router>
  );
}

export default App;
