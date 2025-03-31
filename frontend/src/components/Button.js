import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
		type = "button", 
		onClick = () => {}, 
		disabled = false,
		loading = false,
		children 
}) => {
	return (
		<button 
			type={type} 
			onClick={onClick}
			disabled={disabled}
			className={`btn btn-success ${loading ? 'btn--loading' : ''}`}
			aria-busy={loading}
		>
			{loading ? (
				<>
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					{' '}Loading...
				</>
			) : children}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Button;