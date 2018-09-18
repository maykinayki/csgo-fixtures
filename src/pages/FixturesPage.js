import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getFixturesAction,
	selectFixtureAction,
	editFixtureAction,
	updateEditFixtureFormAction,
	saveFixtureAction,
	cancelEditFixtureAction
} from "../store/featureStore";
import FixturesListView from "../components/FixturesListView";
import FixturesDetailView from "../components/FixturesDetailView";

class FixturesPage extends Component {
	componentDidMount() {
		this.props.dispatch(getFixturesAction());
	}

	onSelectFixture = (e, feature) => {
		e.preventDefault();
		this.props.dispatch(selectFixtureAction(feature));
	};

	onEditFixture = e => {
		e.preventDefault();
		this.props.dispatch(editFixtureAction());
	};

	onUpdateEditFixtureForm = e => {
		e.preventDefault();
		const target = e.currentTarget;
		const fieldName = target.name;
		const fieldValue = target.value;
		this.props.dispatch(
			updateEditFixtureFormAction({
				fieldName,
				fieldValue
			})
		);
	};

	onSaveFixture = e => {
		e.preventDefault();
		this.props.dispatch(saveFixtureAction());
	};

	onCancelEditFixture = e => {
		e.preventDefault();
		this.props.dispatch(cancelEditFixtureAction());
	};

	render() {
		return (
			<div className="main-container">
				<div className="d-flex align-items-center">
					<div className="flex-1">
						{this.props.selectedFixture && (
							<a
								href="#fixtures-list"
								onClick={e => this.onSelectFixture(e, null)}
							>
								Go back to fixtures list
							</a>
						)}
					</div>
					<h1 className="main-title text-center flex-1">
						CSGO: Fixtures
					</h1>
					<div className="flex-1 d-flex justify-content-flex-end">
						{this.props.selectedFixture &&
							this.props.editFixtureForm === null && (
								<div className="d-flex">
									<button
										className="btn btn-default"
										onClick={this.onEditFixture}
									>
										Edit fixture
									</button>
								</div>
							)}
						{this.props.editFixtureForm && (
							<div className="d-flex btn-group">
								<button
									className="btn btn-default"
									onClick={this.onCancelEditFixture}
								>
									Cancel
								</button>
								<button
									className="btn btn-success"
									onClick={this.onSaveFixture}
								>
									Save
								</button>
							</div>
						)}
					</div>
				</div>
				{!this.props.selectedFixture && (
					<FixturesListView
						onSelectFixture={this.onSelectFixture}
						fixtures={this.props.primaryFixtures}
						loadingFixtures={this.props.loadingFixtures}
					/>
				)}
				{this.props.selectedFixture && (
					<FixturesDetailView
						onUpdateEditFixtureForm={this.onUpdateEditFixtureForm}
						editFixtureForm={this.props.editFixtureForm}
						selectedFixture={this.props.selectedFixture}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loadingFixtures: state.featureStore.loadingFixtures,
		primaryFixtures: state.featureStore.primaryFixtures,
		selectedFixture: state.featureStore.selectedFixture,
		editFixtureForm: state.featureStore.editFixtureForm
	};
};

export default connect(mapStateToProps)(FixturesPage);
