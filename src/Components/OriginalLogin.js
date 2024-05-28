//ORIGINAL LOGIN WITHOUT API


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Formik } from 'formik';

import {useFormik } from 'formik';
import * as Yup from 'yup';

// eslint-disable-next-line
import About from './About';

function Login()
{
	const [credentials, setCredentials] = useState({email: "", password: ""});

	const [alert, setAlert] = useState(' '); 
	const [emailErr, setEmailErr] = useState(' '); 
	const [passwordErr, setPasswordErr] = useState(' ');

	let defaultEmail = "ab@cd.ef";
	let defaultPassword = "123456";

	const navigate = useNavigate();
	window.localStorage.setItem("login",'false');

	const handleLogin = (e) =>
	{
		e.preventDefault();

		console.log("Submitted!");
		setCredentials({email: "", password: ""});

		if(!credentials.email || !credentials.password)
		{
			if(!credentials.email)
			{
				setEmailErr('Required!');
			}
			else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email))
			{
				setEmailErr('Invalid Email!');
			}
			if(!credentials.password)
			{
				setPasswordErr('Required!');
			}
			window.localStorage.setItem("login",'false');
		}
		else if (!(credentials.email === defaultEmail && credentials.password === defaultPassword))
		{
			if (credentials.email !== defaultEmail && credentials.password !== defaultPassword) 
			{
				setAlert("Email & Password didn't Match, Retry!");
			}
			else
			{
				if (credentials.email !== defaultEmail)
				{
					setEmailErr("Email didn't Match");
				}
				if (credentials.password !== defaultPassword)
				{
					setPasswordErr("Password didn't Match");
				}
			}
			window.localStorage.setItem("login",'false');
		}
		else
		{
			navigate('/About');
			window.localStorage.setItem("login",'true');
		}
	};

	const onChange = (e) =>
	{
		setCredentials({...credentials, [e.target.name]: e.target.value });
		setAlert(null);
		setEmailErr(null);
		setPasswordErr(null);
	}


	return(

		<div style= {{ boxSizing: 'border-box' }}>
			<div className="container d-flex justify-content-center align-items-center " style={{ height : '100vh', width: '100%', padding: '0 30px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `URL("https://mdbootstrap.com/img/Photos/Others/images/100.jpg")`, backgroundColor: '#756AB6' }} >
	     		<div className="container" style={{ width: '400px', borderRadius: '10px', textAlign: 'center', border: "2px solid rgb(255, 229, 229)", backdropFilter: 'blur(100px)' }}>

	     			<form onSubmit={handleLogin} className="text-center" method="POST" style= {{ marginTop: '2rem', marginBottom: '3rem' }} >

						<h3 style= {{ marginTop: '2rem', fontSize: '2rem', marginBottom: '2rem', color: '#FFE5E5' }} > Login </h3>

						<div className="row" style = {{ margin: '1rem' }} >
							<input type="email" id="email" name="email" placeholder=" Enter Email " value={credentials.email} onChange={onChange} className="form-control" />
							<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} > {emailErr} </p>
						</div>

						<div className="row" style = {{ margin: '1rem' }}>
							<input type="text" id="password" name="password" placeholder=" Enter Password " value={credentials.password} onChange={onChange} className="form-control" />
							<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} > {passwordErr} </p>
						</div>

						<div className="row d-grid justify-content-center" style = {{ margin: '1rem' }}>
							<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} >{alert}</p>
							<button type="submit" className="btn btn-light btn-outline-success" style={{ fontWeight: '600', padding: '12px 20px', cursor: 'pointer', borderRadius: '10px', fontSize: '22px' }} >Submit</button>
						</div>

	     			</form>

	     		</div>
	     	</div>
		</div>
	);
}


export default Login;


// ===========================================================================================================================================================================
// ===========================================================================================================================================================================
// ===========================================================================================================================================================================
// ===========================================================================================================================================================================

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik } from 'formik';

// // eslint-disable-next-line
// import About from './About';

// window.localStorage.setItem("login",'false');

// const credentials = { email: '', password: '' };

// const defaultEmail = "ab@cd.ef";
// const defaultPassword = "123456";

// const onSubmit = (credentials) => {
// 	if(window.localStorage.getItem("login") === 'true')
// 	{
// 		console.log(window.location.toString());
// 	}
// 	console.log("Logged In!");
// }

// const validate = credentials => {
// 	let errors = {};

// 	if(!credentials.email || !credentials.email)
// 	{
// 		if(!credentials.email)
// 		{
// 			errors.email = 'Required!';
// 		}
// 		else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email))
// 		{
// 			errors.email = 'Invalid Email!';
// 		}
// 		if(!credentials.password)
// 		{
// 			errors.password = 'Required!';
// 		}
// 		window.localStorage.setItem("login",'false');
// 	}
// 	else if(!(credentials.email === defaultEmail && credentials.password === defaultPassword))
// 	{
// 		if(credentials.email !== defaultEmail && credentials.password !== defaultPassword)
// 		{
// 			errors.alert = "Email & Password didn't Match, Retry!";
// 		}
// 		else
// 		{
// 			if(credentials.email !== defaultEmail)
// 			{
// 				errors.email = "Email Didn't Match!";
// 			}
// 			if(credentials.password !== defaultPassword)
// 			{
// 				errors.password = "Password Didn't Match!";
// 			}
// 		}
// 		window.localStorage.setItem("login",'false');
// 	}		
// 	else if(credentials.email === defaultEmail && credentials.password === defaultPassword)
// 	{
// 		// window.location.replace('http://localhost:3000/About');
// 		window.localStorage.setItem("login",'true');
// 	}

// 	return errors;
// }


// function Login()
// {
// 	// window.localStorage.getItem("login");
	
// 	const navigate = useNavigate();
// 	useEffect(() =>
// 	{
// 		if(window.localStorage.getItem("login") === 'false')
// 		{
// 			navigate("/");
// 		}
// 		else
// 		{
// 			navigate("/About");
// 		}
// 	},[navigate]);


// 	return(

// 		<Formik initialcredentials={credentials} validate={validate} onSubmit={onSubmit} >
// 		{({ credentials, 
// 			errors, 
// 			touched, 
// 			handleChange, 
// 			handleBlur, 
// 			handleReset, 
// 			handleSubmit, 
// 			isSubmitting }) => (

// 				<div style= {{ boxSizing: 'border-box' }}>
// 					<div className="container d-flex justify-content-center align-items-center " style={{ height : '100vh', width: '100%', padding: '0 30px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `URL("https://mdbootstrap.com/img/Photos/Others/images/100.jpg")`, backgroundColor: '#756AB6' }} >
// 			     		<div className="container" style={{ width: '400px', borderRadius: '10px', textAlign: 'center', border: "2px solid rgb(255, 229, 229)", backdropFilter: 'blur(100px)' }}>

// 			     			<form onSubmit={handleSubmit} className="text-center" method="POST" style= {{ marginTop: '2rem', marginBottom: '3rem' }} >

// 								<h3 style= {{ marginTop: '2rem', fontSize: '2rem', marginBottom: '2rem', color: '#FFE5E5' }} > Login </h3>

// 								<div className="row" style = {{ margin: '1rem' }} >
// 									<input type="email" id="email" name="email" placeholder=" Enter Email " onChange={handleChange} onBlur={handleBlur} value={credentials.email} className="form-control" />
// 									<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} > {errors.email && touched.email && errors.email} </p>
// 								</div>

// 								<div className="row" style = {{ margin: '1rem' }}>
// 									<input type="text" id="password" name="password" placeholder=" Enter Password " onChange={handleChange} onBlur={handleBlur} value={credentials.password} className="form-control" />
// 									<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} > {errors.password && touched.password && errors.password} </p>
// 								</div>

// 								<div className="row d-grid justify-content-center" style = {{ margin: '1rem' }}>
// 									<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} >{errors.alert}</p>
// 									<button type="submit" className="btn btn-light btn-outline-success" style={{ fontWeight: '600', padding: '12px 20px', cursor: 'pointer', borderRadius: '10px', fontSize: '22px' }} >Submit</button>
// 								</div>

// 			     			</form>

// 			     		</div>
// 			     	</div>
// 				</div>

// 			)}
// 		</Formik>
// 	);
// }


// export default Login;


// <div className="container d-flex justify-content-center align-items-center " style={{ height : '100vh', width: '100%', padding: '0 30px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `URL("https://mdbootstrap.com/img/Photos/Others/images/24.jpg")` }} >
// 	<div className="container" style={{ width: '400px', borderRadius: '8px', padding: '30px', textAlign: 'center', border: "2px solid rgba(255, 255, 255, 0.5)", backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(50px)' }}>
// 	</div>
// </div>

// backgroundColor: '#AC87C5',
// WebkitBackdropFilter: 'blur(100px)'


// https://stackoverflow.com/questions/56784155/how-to-link-to-next-page-url-in-handlesubmit-formik
// https://stackoverflow.com/questions/58130797/redirect-in-formik-with-yup-react