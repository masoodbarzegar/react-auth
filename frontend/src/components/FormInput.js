import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
	label,
	type,
	name,
	value = "",
	onChange = () => {},
	onBlur = () => {},
	placeholder = "",
	wrapperId = "",
	disabled = false,
	error = null,
	className = ""
}) => {
	return (
		<div className={`row ${className}`.trim()} id={wrapperId || undefined}>
			{label && (
				<div className={label ? "col-md-6" : "col-md-12"}>
					<label htmlFor={name} className="form-label">
						{label}
					</label>
				</div>
			)}
			<div className={label ? "col-md-6" : "col-md-12"}>
				<input
					type={type}
					name={name}
					className={`form-control ${error ? 'is-invalid' : ''}`}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
					id={name}
				/>
				{error && (
					<div className="invalid-feedback">
						{error}
					</div>
				)}
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
	onBlur: PropTypes.func,
	placeholder: PropTypes.string,
	wrapperId: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	className: PropTypes.string
};

export default FormInput;