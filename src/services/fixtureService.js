import axiosClient from "../utils/axiosClient";

/**
 Makes request to fetch primary fixtures.
 @return {promise} promise resolving to fixtures data
 @throws {error} Error - any error
 */
export const fetchPrimaryFixtures = async () => {
	return await axiosClient({
		method: "get",
		url: "/primary.json"
	});
};

/**
 Makes request to fetch secondary fixtures.
 @return {promise} promise resolving to fixtures data
 @throws {error} Error - any error
 */
export const fetchSecondaryFixtures = async () => {
	return await axiosClient({
		method: "get",
		url: "/secondary.json"
	});
};
