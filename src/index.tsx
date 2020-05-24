import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from "./components/Home";
import {AddSleep} from "./components/AddSleep";
import {Stats} from "./components/Stats";
import {ViewSleep} from "./components/ViewSleep";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route path="/sleep/:id" component={ViewSleep}/>
				<Route path="/addsleep" component={AddSleep}/>
				<Route path="/">
					<Home/>
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
