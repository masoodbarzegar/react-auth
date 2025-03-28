import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../store/authSlice';
import { logout } from '../services/auth';


const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	const handleLogout = () => {
		logout(dispatch).then(() => {
			navigate('/login');
		});
	};

	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<button 
					className="navbar-toggler" 
					type="button" 
					data-bs-toggle="collapse" 
					data-bs-target="#navbarNav"
					aria-controls="navbarNav" 
					aria-expanded="false" 
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				{isAuthenticated && (
					<div className="d-lg-none text-left mt-2">
						<span className="navbar-text me-3">
							Welcome: <Link to="/dashboard" className="fw-bold">{user.name}</Link>
						</span>
						<button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
							Logout
						</button>
					</div>
				)}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
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
						<div className="d-none d-lg-block text-left mt-2">
							<span className="navbar-text me-3">
								Welcome: <Link to="/dashboard" className="fw-bold">{user.name}</Link>
							</span>
							<button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
								Logout
							</button>
						</div>
					)}
				</div>
 			</div>
	</nav>
	);
};

export default Navbar;