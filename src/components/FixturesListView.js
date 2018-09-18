import React from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

const FixturesListView = ({
	fixtures = [],
	loadingFixtures = false,
	onSelectFixture
}) => {
	return (
		<div className="mn-list-view">
			<div className="mn-list-view-head">
				<div>Date</div>
				<div>Match</div>
				<div>Tournament</div>
			</div>
			<div className="mn-list-view-body">
				{loadingFixtures && (
					<div className="loader-wrapper">
						<Loader
							type="Ball-Triangle"
							color="#01d5b4"
							height={80}
							width={80}
						/>
					</div>
				)}
				{fixtures.map((fixture, index) => {
					return (
						<div className="mn-list-view-item" key={index}>
							<div>{fixture.start_time_formatted}</div>
							<div>
								<a
									href="#select-fixture"
									onClick={e => onSelectFixture(e, fixture)}
								>
									{fixture.team1} vs. {fixture.team2}
								</a>
							</div>
							<div className="muted">
								{fixture.championship}
								{!fixture.isEqualToSecondary && (
									<div className="icon-not-equal">
										<img
											src={`${
												process.env.PUBLIC_URL
											}/images/is-not-equal-to.svg`}
											alt=""
										/>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="mn-list-view-footer">
				<div>
					<strong>{fixtures.length}</strong> &nbsp; games
				</div>
				<div>
					<div className="icon-not-equal">
						<img
							src={`${
								process.env.PUBLIC_URL
							}/images/is-not-equal-to.svg`}
							alt=""
						/>
					</div>
					&nbsp; - Fixture doesn't match with secondary
				</div>
			</div>
		</div>
	);
};

FixturesListView.propTypes = {
	onSelectFixture: PropTypes.func.isRequired,
	fixtures: PropTypes.arrayOf(
		PropTypes.shape({
			team1: PropTypes.string,
			team2: PropTypes.string,
			sport: PropTypes.string,
			championship: PropTypes.string,
			start_time: PropTypes.number,
			isEqualToSecondary: PropTypes.bool,
			start_time_formatted: PropTypes.string
		})
	),
	loadingFixtures: PropTypes.bool
};

export default FixturesListView;
