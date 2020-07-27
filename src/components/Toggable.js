import React, { useState, useImperativeHandle } from "react";
const Toggable = React.forwardRef((props, ref) => {
	const [visibility, setVisibility] = useState(false);
	const hideWhenVisible = { display: visibility ? "none" : "" };
	const showWhenVisible = { display: visibility ? "" : "none" };
	const toggleVisibility = () => setVisibility(!visibility);

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});
	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonText}</button>
			</div>

			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
});

Toggable.displayName = "Toggable";

export default Toggable;
