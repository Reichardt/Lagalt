import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import { ProfileProvider } from './context/ProfileContext';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Create from './pages/Create';
import Categories from './pages/Categories';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<ProfileProvider>
						<PostsProvider>
							<Route exact path="/" component={Home} />
							<Route path="/home" component={Home} />
							<Route path="/create" component={Create} />
							<Route path="/categories" component={Categories} />
							<Route path="/profile/:name" component={Profile} />
							<Route path="/post/:id" component={Post} />
						</PostsProvider>
					</ProfileProvider>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
