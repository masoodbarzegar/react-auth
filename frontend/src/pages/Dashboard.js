import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Dashboard = () => {
	let navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login'); 
		}
	}, [isAuthenticated, navigate]);

	return(
		<div className="main-box">
			Wellcome to Private Page
		</div>

	)
}
export default Dashboard;