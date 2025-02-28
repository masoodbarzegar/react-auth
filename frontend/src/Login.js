import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = ({ auth, setAuth }) => {
	let navigate = useNavigate();

	useEffect(() => {
		if (auth) {
			navigate('/dashboard'); 
		}
	}, [auth, navigate]);

	const [user, setData] = useState({
		email:"",
		password:""
	})

	const handleChange = (e) => {
		setData({ ...user, [e.target.name]: e.target.value });
	};

	const submitForm = (e)=>{
		e.preventDefault();
		
		const formData  = {
			email: user.email,
			password: user.password
		}

		axios.post(process.env.REACT_APP_API_URL + '/login', formData)
			.then((result)=>{
				if(result.data.status === 'valid'){
					const userData = result.data.data;
					const displayName = `${userData.first_name} ${userData.last_name}`;
					localStorage.setItem('email', userData.email);
					localStorage.setItem('userName', displayName);
					setAuth(displayName);
					navigate('/dashboard');

				} else {
					alert(result.data.message);
				}
			})
			.catch((error)=>{
				console.error("Login Error:", error);
				alert("An error occurred during login. Please try again.");
			});

	}

	return(
		<div className="main-box">
		<form onSubmit={submitForm}>
		<div className="row">
			<div className="col-md-12 text-center"><h1>Login</h1></div>
		</div>
		
		<div className="row">
			<div className="col-md-6">Email</div>
			<div className="col-md-6">
				<input type="text" name="email" className="form-control" onChange={handleChange} value={user.email} />
			</div>
		</div>

		<div className="row">
			<div className="col-md-6">Password</div>
			<div className="col-md-6">
				<input type="password" name="password" className="form-control" onChange={handleChange} value={user.password} />
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
export default Login;