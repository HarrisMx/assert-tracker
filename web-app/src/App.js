import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/Screens/Login';
import RegisterForm from './Components/Screens/Register';
import Header from './Components/Sections/Header/Header';
import { Link } from "react-router-dom";
import Home from './Components/Screens/Home';
import MenuScreen from './Components/Screens/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Components/Screens/NotFound';

function App() {
  return (
      <div className="container">
        <Header/>
        <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route path="*" component={NotFound}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
