import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
	label,
	type,
	name,
	value = "",
	onChange = () => {},
	placeholder = "",
	wrapperId = "",
}) => {
	return (
		<div className="row" id={wrapperId || undefined}>
			{label && (
				<div className="col-md-6">
					{label}
				</div>
			)}
			<div className={label ? "col-md-6" : "col-md-12"}>
				<input
					type={type}
					name={name}
					className="form-control"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

FormInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	wrapperId: PropTypes.string,
};

export default FormInput;