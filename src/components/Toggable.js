import React, { useState } from "react";
const Toggable = (props) => {
	const [visibility, setVisibility] = useState(false);
	const hideWhenVisible = { display: visibility ? "none" : "" };
	const showWhenVisible = { display: visibility ? "" : "none" };
	const toggleVisiblilty = () => setVisibility(!visibility);
	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisiblilty}>{props.buttonText}</button>
			</div>

			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisiblilty}>cancel</button>
			</div>
		</div>
	);
};

export default Toggable;
