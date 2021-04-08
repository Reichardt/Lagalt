import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Timeline from './components/Timeline/Timeline';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Keycloak App</h1>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App
