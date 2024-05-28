//ORIGINAL LOGIN WITHOUT API


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

// eslint-disable-next-line
import About from './About';

function Login()
{

	const navigate = useNavigate();
	window.localStorage.setItem("login",'true');

	// window.localStorage.setItem("login",'false');

	const initialValues = { logUserName: "", logPassword: "" };
	const [responseMessage, setResponseMessage] = useState('');

	const validationSchema = Yup.object({
		logUserName: Yup.string()
			.required('Username is Required Field!'),

		logPassword: Yup.string()
			.required('Password is Required Field!')
	});

	const LoginAuth = (values) => 
	{
		const apiUrl = 'http://192.168.0.200:814/api/Authentication/Login';

		const data = {
			UserName: values.logUserName,
			Password: values.logPassword,
  			DeviceType: 0,
  			FCMToken: ""
		};

		axios.post(apiUrl,data,{
			headers: {
	            'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			console.log(response.status);
			console.log(response.data.IsSuccess);

			if(response.data.IsSuccess === true)
			{
				console.log(" Message => " + response.data.Message);
				window.localStorage.setItem("login",'true');
				navigate('/About');
				window.localStorage.setItem("token",response.data.Token);
			}
			else
			{
				console.log(" Message => " + response.data.Message);
				window.localStorage.setItem("login",'true');
				// window.localStorage.setItem("login",'false');
				setResponseMessage(response.data.Message);
			}
			
		})
		.catch((error) => {
			console.log(" => ERROR at Login : " + error.message);
		})
	}
	
	const onSubmit = (values) =>
	{	
		LoginAuth(values);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit
	}); 

	return(

		<div style= {{ boxSizing: 'border-box' }}>
			<div className="container d-flex justify-content-center align-items-center " style={{ height : '100vh', width: '100%', padding: '0 30px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `URL("https://mdbootstrap.com/img/Photos/Others/images/100.jpg")`, backgroundColor: '#756AB6' }} >
	     		<div className="container" style={{  margin: '1rem 0', width: '400px', borderRadius: '10px', textAlign: 'center', border: "2px solid #BBE2EC", boxShadow: '5px 5px 5px #BBE2EC', backdropFilter: 'blur(100px)', overflowX: 'hidden' }}>
					
	     			<form onSubmit={formik.handleSubmit} className="text-center" method="POST" style= {{ marginTop: '2rem', marginBottom: '3rem' }}>

						<h3 style= {{ marginTop: '2rem', fontSize: '2rem', marginBottom: '2rem', color: '#FFE5E5' }} > Login </h3>

						<div className="row" style = {{ margin: '1rem' }} >
							<input type="text" id="logUserName" name="logUserName"  {...formik.getFieldProps('logUserName')}  placeholder=" Enter Username " className="form-control" />
							<p className="text-danger" style={{ textAlign: 'left', fontWeight: '600' }} > {formik.errors.logUserName && formik.touched.logUserName && formik.errors.logUserName } </p>
						</div>

						<div className="row" style = {{ margin: '1rem' }}>
							<input type="password" id="logPassword" name="logPassword"  {...formik.getFieldProps('logPassword')}  placeholder=" Enter Password " className="form-control" />
							<p className="text-danger" style={{ textAlign: 'left', fontWeight: '600' }} > {formik.errors.logPassword && formik.touched.logPassword && formik.errors.logPassword } </p>						</div>

						<div className="row" style = {{ margin: '1rem' }}>
							<p className="text-danger align-content-left" style={{ textAlign: 'left', fontWeight: '600' }} > {responseMessage} </p>
						</div>

						<div className="row d-grid justify-content-center" style = {{ margin: '1rem' }}>
							<button type="submit" className="btn btn-light btn-outline-success" style={{ fontWeight: '600', padding: '12px 20px', cursor: 'pointer', borderRadius: '10px', fontSize: '22px' }} >Submit</button>
						</div>

	     			</form>

	     		</div>
	     	</div>
		</div>
	);
}


export default Login;

