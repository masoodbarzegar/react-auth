import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	let navigate = useNavigate();
	
	useEffect(() => {
		const user = localStorage.getItem('userName');
		if (user) {
			navigate('/dashboard'); // Redirect if already authenticated
		}
	}, [navigate]);

	const [data, setData] = useState({
		first_name:"",
		last_name: "",
		email:"",
		password:""
	})

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const submitForm = (e)=>{
		e.preventDefault();
		
		const formData  = {
			first_name: data.first_name,
			last_name: data.last_name, 
			email: data.email,
			password: data.password
		}

		axios.post(process.env.REACT_APP_API_URL + '/register', formData)
			.then((result)=>{
				if(result.data.status === 'valid'){
					const userData = result.data.data;
					const displayName = `${userData.first_name} ${userData.last_name}`;

					localStorage.setItem('email', userData.email);
					localStorage.setItem('userName', displayName);

					navigate('/dashboard');
				} else {
					alert(result.data.message);
				}
			})
			.catch((error) => {
				console.error("Registration Error:", error);
				alert("An error occurred during Registration. Please try again.");

			});
	};

	return(
		<div className="main-box">
		<form onSubmit={submitForm}>
		<div className="row">
			<div className="col-md-12 text-center"><h1>Register</h1></div>
		</div>
		
		<div className="row">
			<div className="col-md-6">First Name</div>
			<div className="col-md-6">
				<input type="text" name="first_name" className="form-control" onChange={handleChange} value={data.first_name} />
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">Last Name</div>
			<div className="col-md-6">
				<input type="text" name="last_name" className="form-control" onChange={handleChange} value={data.last_name} />
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">Email</div>
			<div className="col-md-6">
				<input type="text" name="email" className="form-control" onChange={handleChange} value={data.email} />
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">Password</div>
			<div className="col-md-6">
				<input type="password" name="password" className="form-control" onChange={handleChange} value={data.password} />
			</div>
		</div>

		<div className="row">
			<div className="col-md-12 text-center">
				<input type="submit" name="submit" className="btn btn-success" />
			</div>
		</div>
		</form>
		</div>
		
	)
}
export default Register;