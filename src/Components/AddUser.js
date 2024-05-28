// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';


import UserDetails from './UserDetails';


const initialValues = { name:'', email:'', note:'' };

const onSubmit = (values, { setSubmitting }) => {
	setTimeout(() => {
		setSubmitting(false);
	},400);

	console.log('');
	console.log(' Name => ' + values.name );
	console.log(' Email => ' + values.email );
	console.log(' Note => ' + values.note );
	console.log('');
}

const validate = values => {
	let errors = {};

	if(!values.name || !values.email || !values.note )
	{
		if(!values.name)
		{
			errors.name = 'Required!';
		}
		// else if(values.name.length<5)
		// {
		// 	errors.name = 'Enter Proper Name of minimum length 5';
		// }
		if(!values.email)
		{
			errors.email = 'Required';
		}
		// else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
		// {
		// 	errors.email = 'Invalid Email';
		// }
		if(!values.note)
		{
			errors.note = 'Required!';
		}
		// else if(values.note.length<10)
		// {
		// 	errors.note = 'Enter Note of minimum length 10';
		// }
		errors.alert = 'Please Fill in All Required Fields';
	}
	else if(values.name || values.email || values.note)
	{
		if(values.name && values.name.length<5)
		{
			errors.name = 'Enter Proper Name of minimum length 5';
		}
		if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
		{
			errors.email = 'Invalid Email';
		}
		if(values.note && values.note.length<10)
		{
			errors.note = 'Enter Note of minimum length 10';
		}
	}

	return errors;
}

function AddUser()
{
	window.localStorage.getItem("login");
	const navigate = useNavigate();

	useEffect(() => 
	{
		if(window.localStorage.getItem("login") === 'false')
		{
			navigate("/");
		}
	},[navigate]);

	

	return(

		<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
		{({ values, 
			errors,
			touched,
			handleChange,
			handleBlur,
			handleReset,
			handleSubmit,
			isSubmitting }) => (
				<div style = {{ boxSizing: 'border-box', margin: '4rem 0', backgroundColor:'violet' }} >
					<div className="container d-flex justify-content-center align-items-center"  style={{  width: '100%', padding: '0 30px', borderRadius: '10px', backgroundColor: 'red'  }} >
						<div className="card p-4 my-5" style={{  width: '900px', padding: '30px 0', borderRadius: '10px', textAlign: 'center', backgroundColor:'green' }} >
							<form onSubmit={handleSubmit} method="POST" style={{ backgroundColor: 'violet', borderRadius: '10px',  }} >
								
								<h1 style={{ margin: '2rem 0' }} > Add User Details </h1>

								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left' }} >
									<label htmlFor = "name" style={{ fontWeight: '600', fontSize: '22px' }} > Name </label>
									<input type="text" id="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} className="form-control" placeholder=" Enter Name " style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
									<p style={{ color: 'red' }} > {errors.name && touched.name && errors.name} </p>
								</div>

								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left' }} >
									<label htmlFor = "email" style={{ fontWeight: '600', fontSize: '22px' }} > Email </label>
									<input type="email" id="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control" placeholder=" Enter Email " style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
									<p style={{ color: 'red' }} > {errors.email && touched.email && errors.email} </p>
								</div>

								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left' }} >
									<label htmlFor = "note" style={{ fontWeight: '600', fontSize: '22px' }} > Note </label>
									<textarea id="note" name="note" rows='3' onChange={handleChange} onBlur={handleBlur} value={values.address} className="form-control" placeholder=" Enter Note " style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
									<p style={{ color: 'red' }} > {errors.note && touched.note && errors.note} </p>
								</div>


								<div className="row d-grid justify-content-center" style = {{ margin: '2rem 40px' }}>
									<p style={{ textAlign: 'left', color: 'red', fontWeight: '600' }} >{errors.alert}</p>
									<button type="submit" disabled={isSubmitting} className="btn btn-light btn-outline-success" style={{ fontWeight: '600', padding: '15px 30px', cursor: 'pointer', borderRadius: '10px', fontSize: '30px' }}>
										Add User
									</button>
								</div>

							</form>

							<div className="row my-3">
								<div className="col-md-4 mb-3">
									<h1 style={{ margin: '2rem 0' }} > Add User Details </h1>

									<UserDetails />
										  		
								</div>
							</div>


						</div>
					</div>
				</div>
		)}
		</Formik>		
	);
}

export default AddUser;

// <div style = {{ boxSizing: 'border-box', margin: '4rem 0', }} >
// 	<div className="container d-flex justify-content-center align-items-center"  style={{  width: '100%', padding: '0 30px',  }} >
// 		<div className="card p-4 my-5" style={{  width: '900px', padding: '30px 0', borderRadius: '10px', textAlign: 'center', backgroundColor:'#FFF7F1' }} >
// 			<form method="POST" style={{ backgroundColor: '#FFF6E9', height: '100vh', margin: ' 3rem 40px'  }} >

// <button disabled={note.id.length<1 || note.title.length<5 || note.description.length<5} type="submit" className="btn btn-light btn-outline-primary" onClick={handleAddNote} > Add Note </button>

// https://www.youtube.com/watch?v=94BdnDVHrP0&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=60

// <div key={note._id} className="col">
// 	<div className="card" style={{width: '25rem' }} >
// 	  	<div className="card-body">
// 	  	</div>
// 	</div>
// </div>