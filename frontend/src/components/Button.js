import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = "button", onClick = () => {}, children }) => (
	<button type={type} onClick={onClick} className="btn btn-success">
		{children}
	</button>
);

Button.propTypes = {
	type: PropTypes.oneOf(["button", "submit", "reset"]), // Restrict type to valid HTML button types
	onClick: PropTypes.func, // Ensure onClick is a function
	children: PropTypes.node.isRequired, // Ensure children are provided
};

export default Button;