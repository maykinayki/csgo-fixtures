import {
	fetchPrimaryFixtures,
	fetchSecondaryFixtures
} from "../services/fixtureService";
import { wait } from "../utils/utils";
import isEqual from "lodash.isequal";

export const types = {
	SET_FIXTURES: "SET_FIXTURES",
	SELECT_FIXTURE: "SELECT_FIXTURE",
	EDIT_FIXTURE: "EDIT_FIXTURE",
	UPDATE_EDIT_FIXTURE_FORM: "UPDATE_EDIT_FIXTURE_FORM",
	CANCEL_EDIT_FIXTURE: "CANCEL_EDIT_FIXTURE",
	SAVE_FIXTURE: "SAVE_FIXTURE",
	LOADING_FIXTURES: "LOADING_FIXTURES"
};

const DEFAULT_STATE = {
	primaryFixtures: [],
	loadingFixtures: false,
	selectedFixture: null,
	editFixtureForm: null
};

const setFixtures = (state, action) => {
	const data = action.payload;
	const secondaryFixtures = data.secondaryFixtures;
	const primaryFixtures = data.primaryFixtures
		.map((item, index) => {
			return {
				...item,
				isEqualToSecondary: isEqual(item, secondaryFixtures[index]),
				start_time_formatted: new Date(item.start_time).toLocaleString()
			};
		})
		.sort((a, b) => {
			if (a.start_time > b.start_time) return 1;
			if (a.start_time < b.start_time) return -1;
			return 0;
		});
	return {
		...state,
		primaryFixtures
	};
};

const selectFixture = (state, action) => {
	return {
		...state,
		selectedFixture: action.payload ? { ...action.payload } : null
	};
};

const editFixture = (state, action) => {
	return {
		...state,
		editFixtureForm: { ...state.selectedFixture }
	};
};

const updateEditFixtureForm = (state, action) => {
	const fieldName = action.payload.fieldName;
	const fieldValue = action.payload.fieldValue;

	return {
		...state,
		editFixtureForm: {
			...state.editFixtureForm,
			[fieldName]: fieldValue
		}
	};
};

const cancelEditFixture = (state, action) => {
	return {
		...state,
		editFixtureForm: null
	};
};

const saveFixture = (state, action) => {
	return {
		...state,
		selectedFixture: { ...state.editFixtureForm },
		editFixtureForm: null
	};
};

const loadingFixtures = (state, action) => {
	return {
		...state,
		loadingFixtures: action.payload
	};
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case types.SET_FIXTURES:
			return setFixtures(state, action);
		case types.SELECT_FIXTURE:
			return selectFixture(state, action);
		case types.EDIT_FIXTURE:
			return editFixture(state, action);
		case types.UPDATE_EDIT_FIXTURE_FORM:
			return updateEditFixtureForm(state, action);
		case types.CANCEL_EDIT_FIXTURE:
			return cancelEditFixture(state, action);
		case types.SAVE_FIXTURE:
			return saveFixture(state, action);
		case types.LOADING_FIXTURES:
			return loadingFixtures(state, action);
		default:
			return state;
	}
};

export const getFixturesAction = () => {
	return async dispatch => {
		dispatch(loadingFixturesAction(true));
		try {
			const primaryFixtures = await fetchPrimaryFixtures();
			const secondaryFixtures = await fetchSecondaryFixtures();
			await wait(0); //prevents loader from hiding 2 seconds
			dispatch(
				setFixturesAction({
					primaryFixtures: primaryFixtures.data,
					secondaryFixtures: secondaryFixtures.data
				})
			);
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(loadingFixturesAction(false));
		}
	};
};

export const loadingFixturesAction = payload => ({
	type: types.LOADING_FIXTURES,
	payload
});

export const setFixturesAction = payload => ({
	type: types.SET_FIXTURES,
	payload
});

export const selectFixtureAction = payload => ({
	type: types.SELECT_FIXTURE,
	payload
});

export const editFixtureAction = payload => ({
	type: types.EDIT_FIXTURE,
	payload
});

export const updateEditFixtureFormAction = payload => ({
	type: types.UPDATE_EDIT_FIXTURE_FORM,
	payload
});

export const cancelEditFixtureAction = payload => ({
	type: types.CANCEL_EDIT_FIXTURE,
	payload
});

export const saveFixtureAction = payload => ({
	type: types.SAVE_FIXTURE,
	payload
});
