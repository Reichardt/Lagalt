import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Create from './pages/Create';
import Categories from './pages/Categories';
import Recommended from './pages/Recommended';
import Notifications from './pages/Notifications';
import ProtectedRoute from './util/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/categories" component={Categories} />
					<Route path="/profile/:name" component={Profile} />
					<Route path="/project/:id" component={Project} />
					<Route path="/404" component={NotFound} />
					<ProtectedRoute path="/create-project" component={Create} />
					<ProtectedRoute path="/recommended" component={Recommended} />
					<ProtectedRoute path="/notifications" component={Notifications} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
