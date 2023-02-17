import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/Screens/Login';
import Header from './Components/Sections/Header/Header';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header/>
     <LoginForm/>
    </div>
  );
}

export default App;
