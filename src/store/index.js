import stores from "./store";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

/* eslint-disable no-underscore-dangle */
export default createStore(
	stores,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunkMiddleware)
);
/* eslint-enable */
