import React from "react";
import PropTypes from "prop-types";

const FixturesDetailView = ({
	selectedFixture = {},
	editFixtureForm = null,
	onUpdateEditFixtureForm
}) => {
	return (
		<div className="mn-list-view">
			<div>
				{!editFixtureForm && (
					<h1 className="text-center championship-title">
						{selectedFixture.championship}
					</h1>
				)}

				{editFixtureForm && (
					<div className="text-center championship-title">
						<input
							className="fancy-input"
							type="text"
							name="championship"
							value={editFixtureForm.championship}
							onChange={onUpdateEditFixtureForm}
						/>
					</div>
				)}
			</div>
			<div className="mn-list-item-detail">
				<div className="match-cell">
					<div className="team-cell">
						{!editFixtureForm && (
							<span>{selectedFixture.team1}</span>
						)}
						{editFixtureForm && (
							<input
								className="fancy-input"
								type="text"
								name="team1"
								value={editFixtureForm.team1}
								onChange={onUpdateEditFixtureForm}
							/>
						)}
					</div>
					<div className="detail-cell">
						{!selectedFixture.isEqualToSecondary && (
							<div className="icon-not-equal">
								<img
									src={`${
										process.env.PUBLIC_URL
									}/images/is-not-equal-to.svg`}
									alt=""
								/>
							</div>
						)}
						{!editFixtureForm && (
							<small>
								{selectedFixture.start_time_formatted}
							</small>
						)}
						{editFixtureForm && (
							<div>
								<input
									className="fancy-input"
									type="text"
									name="start_time_formatted"
									value={editFixtureForm.start_time_formatted}
									onChange={onUpdateEditFixtureForm}
								/>
							</div>
						)}
						<div className="vs">vs</div>
					</div>
					<div className="team-cell">
						{!editFixtureForm && (
							<span>{selectedFixture.team2}</span>
						)}
						{editFixtureForm && (
							<input
								className="fancy-input"
								type="text"
								name="team2"
								value={editFixtureForm.team2}
								onChange={onUpdateEditFixtureForm}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

FixturesDetailView.propTypes = {
	selectedFixture: PropTypes.shape({
		team1: PropTypes.string,
		team2: PropTypes.string,
		sport: PropTypes.string,
		championship: PropTypes.string,
		start_time: PropTypes.number,
		isEqualToSecondary: PropTypes.bool,
		start_time_formatted: PropTypes.string
	}),
	onUpdateEditFixtureForm: PropTypes.func.isRequired
};

export default FixturesDetailView;
