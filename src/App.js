import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Project from './pages/Project';
import CreateProject from './pages/CreateProject';
import Categories from './pages/Categories';
import Recommended from './pages/Recommended';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import ProtectedRoute from './util/ProtectedRoute';
import Category from './pages/Category';
import { useDispatch } from 'react-redux';
import { fetchAllActions } from './features/HistoryAction/historyActionSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllActions());
	}, [dispatch]);

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
					<ProtectedRoute path="/projects" component={Projects} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
