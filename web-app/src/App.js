import React from 'react'
import LoginForm from './Components/Screens/Login';
import RegisterForm from './Components/Screens/Register';
import Header from './Components/Sections/Header/Header';
import Home from './Components/Screens/Home';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import NotFound from './Components/Screens/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { setAppData } from './redux/appState/appSlice';
import getAll from './Functions/Functions';

function App() {
  const currPage = useSelector((state)=> state.app.appState.currentPage)
  let history = useHistory();
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    const fetchData = async () => {
      const data = await getAll();
      dispatch(setAppData(data));
    };
    fetchData();
  }, []);

  return (
      <div className="container">
        <Header/>
        {currPage !== null ?
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/register" component={RegisterForm} />
                <Route path="*" component={NotFound}/>
            </Switch>:
            history.push(currPage)
          }
      </div>
  );
}

export default App;
