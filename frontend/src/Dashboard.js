import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const [auth, setAuth] = useState('');
	let navigate = useNavigate();

	useEffect(()=>{
		var auth = localStorage.getItem('email');
		setAuth(auth);

		if( !auth ){
			navigate('/login');
		}
	},
	[navigate])

	if (!auth) {
			return null;
	}

	return(
		<div className="main-box">
			Wellcome to Private Page
		</div>

	)
}
export default Dashboard;