import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/Screens/Login';
import Header from './Components/Sections/Header/Header';
import { Link } from "react-router-dom";
import Home from './Components/Screens/Home';

function App() {
  return (
    <div className="container">
      <Header/>
     <Home/>
    </div>
  );
}

export default App;
