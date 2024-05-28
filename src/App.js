import './App.css';

// eslint-disable-next-line

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './Components/Login';
import NavBar from './Components/NavBar';
import About from './Components/About';

import UserState from './USERS/UserState';
import Home from './USERS/Home';
import HomeDetails from './USERS/HomeDetails';
import Extra from './USERS/Extra';

import UserFormik from './USERS/UserFormik';
import UserYup from './USERS/UserYup';

import RenderHome from './Render/RenderHome';
import RenderDetails from './Render/RenderDetails';
import State from './Render/State';

import GetCourier from './API/GetCourier';
import AddEditCourier from './API/AddEditCourier';



function App() 
{
	const [mode,setMode] = useState('light');
	const [bgColor,setBgColor] = useState('light');
	document.body.style.backgroundColor = '#FFC5C5';

	document.body.style.backgroundColor = bgColor;
	const [color,setColor] = useState('#000000');
	document.body.style.color = color;

	const toggleMode = () =>
	{
		if(mode === 'light')
		{
			setMode('dark');
			document.body.style.backgroundColor = setBgColor('#AF2655');
			document.body.style.color = setColor('black');
		}
		else
		{
			setMode('light');
			document.body.style.backgroundColor = setBgColor('#FFC5C5');
			document.body.style.color = setColor('#2A6171');

		}
	}
	const bgred = () =>
	{
		document.body.style.backgroundColor = setBgColor('#CD0404');
		document.body.style.color = setColor('#F8A488');
	}
	const bgblue = () =>
	{
		document.body.style.backgroundColor = setBgColor('#2931B3');
		document.body.style.color = setColor('#B7569A');
	}

	return (

		<State>
			<UserState>
				<Router>
					<div className="content-container" >
						<Routes>
		    				<Route exact path="/" element={<Login />} />
		    				<Route path="/About" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<About />
		    					</> 
		    				}/>
		    				<Route exact path="/Home" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<Home />
		    					</> 
		    				}/>
		    				<Route exact path="/HomeDetails" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<HomeDetails />
		    					</> 
		    				}/>
		    				<Route exact path="/UserFormik" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<UserFormik />
		    					</> 
		    				}/>
		    				<Route exact path="/UserYup" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<UserYup />
		    					</> 
		    				}/>
		    				<Route exact path="/RenderHome" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<RenderHome />
		    					</> 
		    				}/>
		    				<Route exact path="/RenderDetails" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<RenderDetails />
		    					</> 
		    				}/>
		    				<Route exact path="/Courier" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<GetCourier />
		    					</> 
		    				}/>
		    				<Route exact path="/Extra" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<Extra />
		    					</> 
		    				}/>
		    				<Route exact path="/EditCourier/:courierID" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<AddEditCourier />
		    					</> 
		    				}/>
		    				<Route exact path="/AddCourier" element={
		    					<>
		    						<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
		    						<AddEditCourier />
		    					</> 
		    				}/>

		    			</Routes>
						
					</div>
				</Router>
			</UserState>
		</State>

	);
}

export default App;

// <Route path="/AddUser" element={
// 	<>
// 		<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
// 		<AddUser />
// 	</> 
// }/>

// <Route path="/User" element={
// 	<>
// 		<NavBar mode={mode} toggleMode={toggleMode} bgred={bgred} bgblue={bgblue} bgColor={bgColor}/>
// 		<User />
// 	</> 
// }/>
