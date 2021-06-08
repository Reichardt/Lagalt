import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './css/global.css';
import App from './App';
import { KeycloakProvider } from './context/KeycloakContext';

ReactDOM.render(
	<KeycloakProvider>
		<App />
	</KeycloakProvider>,
	document.getElementById('root')
);
