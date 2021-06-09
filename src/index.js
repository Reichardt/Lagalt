import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './css/global.css';
import App from './App';
import { KeycloakProvider } from './context/KeycloakContext';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<KeycloakProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</KeycloakProvider>,
	document.getElementById('root')
);
