import axios from "axios";
import constants from "../utils/constants";

const instance = axios.create({
	baseURL: constants.apiBaseURL,
	timeout: 10 * 1000
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default instance;
