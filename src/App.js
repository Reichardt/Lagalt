import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Project from './pages/Project';
import CreateProject from './pages/CreateProject';
import Categories from './pages/Categories';
import Recommended from './pages/Recommended';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';
import ProtectedRoute from './util/ProtectedRoute';
import Category from './pages/Category';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/categories" component={Categories} />
					<Route path="/category/:category" component={Category} />
					<Route path="/profile/:name" component={Profile} />
					<Route path="/project/:id" component={Project} />
					<Route path="/404" component={NotFound} />
					<ProtectedRoute path="/create-project" component={CreateProject} />
					<ProtectedRoute path="/recommended" component={Recommended} />
					<ProtectedRoute path="/notifications" component={Notifications} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
