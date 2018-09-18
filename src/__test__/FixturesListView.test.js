import React from "react";
import ReactDOM from "react-dom";
import FixturesListView from "../components/FixturesListView";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<FixturesListView onSelectFixture={() => {}} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
