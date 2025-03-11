import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	let navigate = useNavigate();

	useEffect(() => {
		const auth = localStorage.getItem('email'); // Check if user is authenticated
		if (!auth) {
			navigate('/login'); // Redirect to login if not authenticated
		}
	}, [navigate]);

	return(
		<div className="main-box">
			Wellcome to Private Page
		</div>

	)
}
export default Dashboard;