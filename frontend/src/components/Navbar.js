import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';


const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout ());
		navigate('/login');
	};

	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbar-text">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
					<Link to="/" className="nav-link active">Home</Link>
					</li>
					{!isAuthenticated  && (
						<>
							<li className="nav-item">
								<Link to="/register" className="nav-link active">Register</Link>
							</li>
							<li className="nav-item">
								<Link to="/login" className="nav-link active">Login</Link>
							</li>
						</>
					)}
				</ul>
				{isAuthenticated && (
					<span className="navbar-user-data">
						Welcome: <Link to="/dashboard" className="nav-link active">{user.name}</Link>
						<span className="separator">|</span>
						<button onClick={handleLogout}>Logout</button>
					</span>
				)}
			</div>
		</nav>
	);
};

export default Navbar;