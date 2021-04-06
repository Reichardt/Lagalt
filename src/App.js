import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Timeline from './components/Timeline/Timeline';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/timeline">Timeline</Link>
          </li>
        </ul>

    
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
