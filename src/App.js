import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FixturesPage from "./pages/FixturesPage";
import store from "./store";

import "./assets/styles/index.scss";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={FixturesPage} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
