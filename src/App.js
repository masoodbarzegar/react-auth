import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';

const App = () => (
	<>
		<Header/>
	  	<Routes>
		    <Route path="/" element={<Home />} />
		    <Route path="/login" element={<Login />} />
		    <Route path="/register" element={<Register/>} />
	 	</Routes>
	 </>
);

export default App;