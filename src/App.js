import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Create from './pages/Create';
import Categories from './pages/Categories';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/create" component={Create} />
					<Route path="/categories" component={Categories} />
					<Route path="/profile/:name" component={Profile} />
					<Route path="/project/:id" component={Project} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
