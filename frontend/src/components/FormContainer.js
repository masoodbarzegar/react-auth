import React from 'react';
import PropTypes from 'prop-types';

const FormContainer = ({ children, onSubmit = () => {}, className = "", noValidate = false, ...rest }) => (
	<div className={`main-box ${className}`} {...rest}>
		<form onSubmit={onSubmit} noValidate={noValidate}>
			{children}
		</form>
	</div>
);

FormContainer.propTypes = {
	children: PropTypes.node.isRequired, // Ensure children are provided
	onSubmit: PropTypes.func, // Ensure onSubmit is a function
	className: PropTypes.string, // Allow custom class
	noValidate: PropTypes.bool // Validation status
};

export default FormContainer;