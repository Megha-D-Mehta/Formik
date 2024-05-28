//OriginalAddEditCourier


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AddEditCourier(props)
{
	window.localStorage.getItem("login");
	const tokenId = window.localStorage.getItem("token");

	const navigate = useNavigate();
	useEffect(() => 
	{
		if(window.localStorage.getItem("login") === 'false')
		{
			navigate("/");
		}
	},[navigate])

	// const tokenId = '';

	const { courierID } = useParams();
	const paramsCourierID = courierID === ':courierID' || courierID === undefined ? courierID === ':courierID' ? ':courierID' : 'undefined' : window.atob(courierID);

	// console.log("======= paramsCourierID " + paramsCourierID);

	const [title,setTitle] = useState('');
	const [button,setButton] = useState('');

	useEffect(() =>
	{
	    if (courierID === ':courierID' || courierID === undefined) 
	    {
	        setTitle('Add');
	        setButton('INSERT');
	    } 
	    else 
	    {
	        setTitle('Edit');
	        setButton('UPDATE');
	        getCourierbyIdforEdit();
	    }
	    // eslint-disable-next-line
	}, [courierID]);
	
	const initialValues = { crrName: '', crrAddress: '', crrMobile: '', crrEmail: '', crrContactName: '', crrWeb: '' };

	const validationSchema = Yup.object({

		crrName: Yup.string()
			.test( '', 'Courier Name is Required Field!', value => value.trim() )
			.required('Courier Name is Required Field!'),

		crrContactName: Yup.string()
			.test( '', 'Courier Person Name is Required Field!', value => value.trim())
			.required('Contact Person Name is Required Field!'),

		crrEmail: Yup.string()
			.matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email')
			.required('Email is Required Field!'),		

		crrMobile: Yup.string()
			.min(10,'Enter 10 Digits!')
			.required('Mobile is Required Field!'),

		crrAddress: Yup.string()
			.test( '', 'Courier Address is Required Field!', value => value.trim())
			.required('Courier Address is Required Field!'),

		crrWeb: Yup.string()
			.test('' ,'Web Link is Required Field!', value => value.trim() )
			.required('Web Link is Required Field!'),

	});

	const onSubmit = (values) => {
		InsertOrUpdateCourier(values);
	}

	const InsertOrUpdateCourier = (values) => {
		let apiUrl = '';
	 	if (courierID === ':courierID' || courierID === undefined)
	 	{
	 		apiUrl = 'http://192.168.0.200:814/api/Courier/CourierInsert';
	 	}
	 	else
	 	{
	 		apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
	 	}

		const token = tokenId;

		const data = { 
			CourierIDEncrypted: paramsCourierID, 
			CompanyIDEncrypt: "lrQ+Ao+IEjI=", 
			BranchIDEncrypt: "lrQ+Ao+IEjI=", 
			CourierName: values.crrName,
			CourierAddress: values.crrAddress, 
			CountryCode: "+91", 
			MobileNo: values.crrMobile, 
			EmailID: values.crrEmail, 
			ContactPersonName: values.crrContactName, 
			WebLink: values.crrWeb, 
			CreatedByEncrypt: "",
			ModifiedByEncrypt: " Megha "
		};

		axios.post(apiUrl,data,{
			headers: {
	            'Content-Type': 'application/json',
	            'Authorization': `Bearer ${token}`
	        }
		})
		.then((response) => {
			console.log(response.status);
			if (courierID === ':courierID' || courierID === undefined)
			{
				console.log(" => Added Courier of => " + values.crrName);
			}
			else
			{
				console.log(" => Edited Courier of => " + values.crrName);
			}
			if(response.status !== 200)
			{
				console.log(" \t Status => TOKEN IS EXPIRED!");
				navigate("/");
			}
			else
			{
				console.log(" => Status from [InsertOrUpdateCourier] : " + response.data.Message);
				navigate('/Courier'); 
			}
		})
		.catch((error) => 
		{
			console.log(" => ERROR from [InsertOrUpdateCourier] : " + error.message);
            navigate("/");
		})
	}

	const getCourierbyIdforEdit = () => {
        const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
        const token = tokenId;

 		const data = { 
 			CourierIDEncrypted: paramsCourierID 
 		};

        axios.post(apiUrl,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
        	if(response.Unauthorized || response.status === 401 || response.status !== 200)
			{
				navigate("/");
			}
			else
			{
        		console.log(" \t Status from [getCourierbyIdforEdit] : " + response.data.Message);
        		formik.setValues({
				  	crrName: response.data.CourierName,
				  	crrAddress: response.data.CourierAddress,
				  	crrMobile: response.data.MobileNo,
				  	crrEmail: response.data.EmailID,
				  	crrContactName: response.data.ContactPersonName,
				  	crrWeb: response.data.WebLink
				});
			}

	    	// formik.setFieldValue('crrName', response.data.CourierName);
            // formik.setFieldValue('crrAddress', response.data.CourierAddress);
            // formik.setFieldValue('crrMobile', response.data.MobileNo);
            // formik.setFieldValue('crrEmail', response.data.EmailID);
            // formik.setFieldValue('crrContactName', response.data.ContactPersonName);
            // formik.setFieldValue('crrWeb', response.data.WebLink);

        })
        .catch((error) => 
        {
        	console.log(" => ERROR from [getCourierbyIdforEdit] : " + error.message);
            navigate("/");
        })
    };

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit
	});     

	return(

		<div style = {{ margin: '5rem 0' }} >
			<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', margin: '1rem 0', overflowX: 'hidden' }} >

				<div className="row" style={{ width: '100%', borderBottom: '1px solid #ccc', textAlign: 'left',}} >
					<div className="col" >
						<div style = {{  padding: '1.5vw', }} >
					
								<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
									<h4> {title} Courier </h4>
								</div>

								<div className="row" style={{ textAlign: 'left',}} >
									<form onSubmit={formik.handleSubmit} >
										<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
											
											<div className="col-md-3 mb-3" >
												<label htmlFor="crrName"> Courier Name <span className="text-danger">*</span> </label>
												<input type="text" id="crrName" name="crrName" {...formik.getFieldProps('crrName')} placeholder=" Enter Courier Name " className="form-control" />
												<p className="text-danger"> {formik.errors.crrName && formik.touched.crrName && formik.errors.crrName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
												<input type="text" id="crrContactName" name="crrContactName" {...formik.getFieldProps('crrContactName')} placeholder=" Enter Contact Person Name " className="form-control" />
												<p className="text-danger"> {formik.errors.crrContactName && formik.touched.crrContactName && formik.errors.crrContactName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
												<input type="tel" id="crrMobile" name="crrMobile" maxLength="15" {...formik.getFieldProps('crrMobile')} 
													onChange={(e) => { 
													   	const { value } = e.target;
														if (!/^\+?[0-9]*$/.test(value)) 
													   	{
													   		e.preventDefault();
													   		return;
													   	}
													   	formik.handleChange(e);
													}} placeholder="Enter Mobile No" className="form-control" />
												<p className="text-danger"> {formik.errors.crrMobile && formik.touched.crrMobile && formik.errors.crrMobile } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
												<input type="text" id="crrEmail" name="crrEmail"  {...formik.getFieldProps('crrEmail')} placeholder=" Enter Email " className="form-control" />
												<p className="text-danger"> {formik.errors.crrEmail && formik.touched.crrEmail && formik.errors.crrEmail } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrAddress"> Address <span className="text-danger">*</span> </label>
												<textarea rows='3' id="crrAddress" name="crrAddress" {...formik.getFieldProps('crrAddress')} placeholder=" Enter Address " className="form-control" />
												<p className="text-danger"> {formik.errors.crrAddress && formik.touched.crrAddress && formik.errors.crrAddress } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrWeb"> Web Link <span className="text-danger">*</span> </label>
												<input type="text" id="crrWeb" name="crrWeb" {...formik.getFieldProps('crrWeb')} placeholder=" Enter WebLink " className="form-control" />
												<p className="text-danger"> {formik.errors.crrWeb && formik.touched.crrWeb && formik.errors.crrWeb } </p>
											</div>

										</div>

										<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
											<div className="col-md-3 mb-3" >
												<button type="submit" className="btn btn-light btn-outline-success mx-2" > {button} </button>
												<button type="button" onClick={() => {
													navigate('/Courier'); 
												}} className="btn btn-light btn-outline-success mx-2" > Cancel </button>
											</div>
										</div>

									</form>
								</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
export default AddEditCourier;





































































//=========================================================================================================================================================================================================================================================================
//																	WITHOUT ATOB BTOA
//=========================================================================================================================================================================================================================================================================

// eslint-disable-next-line
{/*
	//OriginalAddEditCourier


	import React, { useEffect, useState } from 'react';
	import { useNavigate, useParams } from 'react-router-dom';

	import {useFormik } from 'formik';
	import * as Yup from 'yup';
	import axios from 'axios';

	function AddEditCourier(props)
	{
		window.localStorage.getItem("login");
		const navigate = useNavigate();
		useEffect(() => 
		{
			if(window.localStorage.getItem("login") === 'false')
			{
				navigate("/");
			}
		},[navigate])

		const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwOTk2MTQ4NywiZXhwIjoxNzA5OTYyMDg3LCJpYXQiOjE3MDk5NjE0ODd9.dpzCtG6YfglDdAIvJ0129DabfnlIFHsPL-61qKV-VHA';

		const { courierID } = useParams();
		console.log("======= courierID " + courierID);

		const [title,setTitle] = useState('');
		const [button,setButton] = useState('');

		useEffect(() =>
		{
		    if (courierID === ':courierID' || courierID === undefined) 
		    {
		        setTitle('Add');
		        setButton('INSERT');
		    } 
		    else 
		    {
		        setTitle('Edit');
		        setButton('UPDATE');
		        getCourierbyIdforEdit();
		    }
		    // eslint-disable-next-line
		}, [courierID]);
		
		const initialValues = { crrName: '', crrAddress: '', crrMobile: '', crrEmail: '', crrContactName: '', crrWeb: '' };

		const validationSchema = Yup.object({

			crrName: Yup.string()
				.test( '', 'Courier Name is Required Field!', value => value.trim() )
				.required('Courier Name is Required Field!'),

			crrContactName: Yup.string()
				.test( '', 'Courier Person Name is Required Field!', value => value.trim())
				.required('Contact Person Name is Required Field!'),

			crrEmail: Yup.string()
				.matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email')
				.required('Email is Required Field!'),		

			crrMobile: Yup.string()
				.min(10,'Enter 10 Digits!')
				.required('Mobile is Required Field!'),

			crrAddress: Yup.string()
				.test( '', 'Courier Address is Required Field!', value => value.trim())
				.required('Courier Address is Required Field!'),

			crrWeb: Yup.string()
				.test('' ,'Web Link is Required Field!', value => value.trim() )
				.required('Web Link is Required Field!'),

		});

		const onSubmit = (values) => {
			InsertOrUpdateCourier(values);
		}

		// eslint-disable-next-line
			// const InsertCourier = (values) =>
			// {
			// 	const data = { 
			// 		CompanyIDEncrypt: "lrQ+Ao+IEjI=", 
			// 		BranchIDEncrypt: "lrQ+Ao+IEjI=", 
			// 		CourierName: values.crrName, 
			// 		CourierAddress: values.crrAddress, 
			// 		CountryCode: "+91", 
			// 		MobileNo: values.crrMobile, 
			// 		EmailID: values.crrEmail, 
			// 		ContactPersonName: values.crrContactName, 
			// 		WebLink: values.crrWeb, 
			// 		CreatedByEncrypt: ""
			// 	};

			// 	const token = tokenId;

			// 	axios.post('http://192.168.0.200:814/api/Courier/CourierInsert', data, {
			//         headers: {
			//             'Content-Type': 'application/json',
			//             'Authorization': `Bearer ${token}`
			//         }
			// 	})
			// 	.then((response) => {
			// 		console.log(" => Added Courier of => " + values.crrName);
			// 		console.log(response);
			// 		navigate('/Courier');
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	})
			// }

			// const UpdateCourier = (values) =>
			// {
			// 	const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';

			// 	const token = tokenId;

			// 	const data = { 
			// 		CourierIDEncrypted: courierID, 
			// 		CompanyIDEncrypt: "lrQ+Ao+IEjI=", 
			// 		BranchIDEncrypt: "lrQ+Ao+IEjI=", 
			// 		CourierName: values.crrName, 
			// 		CourierAddress: values.crrAddress, 
			// 		CountryCode: "+91", 
			// 		MobileNo: values.crrMobile, 
			// 		EmailID: values.crrEmail, 
			// 		ContactPersonName: values.crrContactName, 
			// 		WebLink: values.crrWeb, 
			// 		ModifiedByEncrypt: " Megha " 
			// 	};

			// 	axios.post(apiUrl,data, {
			// 		headers: {
			//             'Content-Type': 'application/json',
			//             'Authorization': `Bearer ${token}`
			//         }
			// 	})
			// 	.then((res) => {
			// 		console.log(" => Edited Courier of => " + values.crrName);
			// 		navigate('/Courier'); 
			// 	})
			// 	.catch(error => console.log(error))
			// }

		const InsertOrUpdateCourier = (values) => {
			let apiUrl = '';
		 	if (courierID === ':courierID' || courierID === undefined)
		 	{
		 		apiUrl = 'http://192.168.0.200:814/api/Courier/CourierInsert';
		 	}
		 	else
		 	{
		 		apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
		 	}

			const token = tokenId;

			const data = { 
				CourierIDEncrypted: courierID, 
				CompanyIDEncrypt: "lrQ+Ao+IEjI=", 
				BranchIDEncrypt: "lrQ+Ao+IEjI=", 
				CourierName: values.crrName,
				CourierAddress: values.crrAddress, 
				CountryCode: "+91", 
				MobileNo: values.crrMobile, 
				EmailID: values.crrEmail, 
				ContactPersonName: values.crrContactName, 
				WebLink: values.crrWeb, 
				CreatedByEncrypt: "",
				ModifiedByEncrypt: " Megha " 
			};

			axios.post(apiUrl,data,{
				headers: {
		            'Content-Type': 'application/json',
		            'Authorization': `Bearer ${token}`
		        }
			})
			.then((response) => {
				if (courierID === ':courierID' || courierID === undefined)
				{
					console.log(" => Added Courier of => " + values.crrName);
				}
				else
				{
					console.log(" => Edited Courier of => " + values.crrName);
				}
				console.log(" => Status : " + response.data.Message);
				navigate('/Courier'); 
			})
			.catch(error => console.log(error))
		}

		const getCourierbyIdforEdit = () => {
	        const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
	        const token = tokenId;

	 		const data = { 
	 			CourierIDEncrypted: courierID 
	 		};

	        axios.post(apiUrl,data, {
	            headers: {
	                'Content-Type': 'application/json',
	                'Authorization': `Bearer ${token}`
	            }
	        })
	        .then(response => {
	            // formik.setFieldValue('crrName', response.data.CourierName);
	            // formik.setFieldValue('crrAddress', response.data.CourierAddress);
	            // formik.setFieldValue('crrMobile', response.data.MobileNo);
	            // formik.setFieldValue('crrEmail', response.data.EmailID);
	            // formik.setFieldValue('crrContactName', response.data.ContactPersonName);
	            // formik.setFieldValue('crrWeb', response.data.WebLink);

	            formik.setValues({
				  	crrName: response.data.CourierName,
				  	crrAddress: response.data.CourierAddress,
				  	crrMobile: response.data.MobileNo,
				  	crrEmail: response.data.EmailID,
				  	crrContactName: response.data.ContactPersonName,
				  	crrWeb: response.data.WebLink
				});

	        })
	        .catch(error => console.log(error))
	    };

		const formik = useFormik({
			initialValues,
			validationSchema,
			onSubmit
		});     

		return(

			<div style = {{ margin: '5rem 0' }} >
				<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', margin: '1rem 0', overflowX: 'hidden' }} >

					<div className="row" style={{ width: '100%', borderBottom: '1px solid #ccc', textAlign: 'left',}} >
						<div className="col" >
							<div style = {{  padding: '1.5vw', }} >
						
									<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
										<h4> {title} Courier </h4>
									</div>

									<div className="row" style={{ textAlign: 'left',}} >
										<form onSubmit={formik.handleSubmit} >
											<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
												
												<div className="col-md-3 mb-3" >
													<label htmlFor="crrName"> Courier Name <span className="text-danger">*</span> </label>
													<input type="text" id="crrName" name="crrName" {...formik.getFieldProps('crrName')} placeholder=" Enter Courier Name " className="form-control" />
													<p className="text-danger"> {formik.errors.crrName && formik.touched.crrName && formik.errors.crrName } </p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
													<input type="text" id="crrContactName" name="crrContactName" {...formik.getFieldProps('crrContactName')} placeholder=" Enter Contact Person Name " className="form-control" />
													<p className="text-danger"> {formik.errors.crrContactName && formik.touched.crrContactName && formik.errors.crrContactName } </p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
													<input type="tel" id="crrMobile" name="crrMobile" maxLength="15" {...formik.getFieldProps('crrMobile')} 
														onChange={(e) => { 
														   	const { value } = e.target;
															if (!/^\+?[0-9]*$/.test(value)) 
														   	{
														   		e.preventDefault();
														   		return;
														   	}
														   	formik.handleChange(e);
														}} placeholder="Enter Mobile No" className="form-control" />
													<p className="text-danger"> {formik.errors.crrMobile && formik.touched.crrMobile && formik.errors.crrMobile } </p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
													<input type="text" id="crrEmail" name="crrEmail"  {...formik.getFieldProps('crrEmail')} placeholder=" Enter Email " className="form-control" />
													<p className="text-danger"> {formik.errors.crrEmail && formik.touched.crrEmail && formik.errors.crrEmail } </p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrAddress"> Address <span className="text-danger">*</span> </label>
													<textarea rows='3' id="crrAddress" name="crrAddress" {...formik.getFieldProps('crrAddress')} placeholder=" Enter Address " className="form-control" />
													<p className="text-danger"> {formik.errors.crrAddress && formik.touched.crrAddress && formik.errors.crrAddress } </p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrWeb"> Web Link <span className="text-danger">*</span> </label>
													<input type="text" id="crrWeb" name="crrWeb" {...formik.getFieldProps('crrWeb')} placeholder=" Enter WebLink " className="form-control" />
													<p className="text-danger"> {formik.errors.crrWeb && formik.touched.crrWeb && formik.errors.crrWeb } </p>
												</div>

											</div>

											<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
												<div className="col-md-3 mb-3" >
													<button type="submit" className="btn btn-light btn-outline-success mx-2" > {button} </button>
													<button type="button" onClick={() => {
														navigate('/Courier'); 
													}} className="btn btn-light btn-outline-success mx-2" > Cancel </button>
												</div>
											</div>

										</form>
									</div>

							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
	export default AddEditCourier;
*/}
















































 // eslint-disable-next-line
	{/*
		<div style = {{ margin: '5rem 0' }} >
			<div className="d-flex flex-wrap-wrap">
				
				<div className="row" style={{ width: '100%', borderBottom: '1px solid #ccc', textAlign: 'left',}} >
					<div className="col">
						<div className="d-flex flex-wrap" >
							<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
								
								<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
									<h4> {title} Courier </h4>
								</div>

								<div className="row" style={{ textAlign: 'left',}} >
									<form onSubmit={formik.handleSubmit} >
										<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
											
											<div className="col-md-3 mb-3" >
												<label htmlFor="crrName"> Courier Name <span className="text-danger">*</span> </label>
												<input type="text" id="crrName" name="crrName" {...formik.getFieldProps('crrName')} placeholder=" Enter Courier Name " className="form-control" />
												<p className="text-danger"> {formik.errors.crrName && formik.touched.crrName && formik.errors.crrName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
												<input type="text" id="crrContactName" name="crrContactName" {...formik.getFieldProps('crrContactName')} placeholder=" Enter Contact Person Name " className="form-control" />
												<p className="text-danger"> {formik.errors.crrContactName && formik.touched.crrContactName && formik.errors.crrContactName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
												<input type="tel" id="crrMobile" name="crrMobile" maxLength="15" {...formik.getFieldProps('crrMobile')} 
													onChange={(e) => { 
													   	const { value } = e.target;
														if (!/^\+?[0-9]*$/.test(value)) 
													   	{
													   		e.preventDefault();
													   		return;
													   	}
													   	formik.handleChange(e);
													}} placeholder="Enter Mobile No" className="form-control" />
												<p className="text-danger"> {formik.errors.crrMobile && formik.touched.crrMobile && formik.errors.crrMobile } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
												<input type="text" id="crrEmail" name="crrEmail"  {...formik.getFieldProps('crrEmail')} placeholder=" Enter Email " className="form-control" />
												<p className="text-danger"> {formik.errors.crrEmail && formik.touched.crrEmail && formik.errors.crrEmail } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrAddress"> Address <span className="text-danger">*</span> </label>
												<textarea rows='3' id="crrAddress" name="crrAddress" {...formik.getFieldProps('crrAddress')} placeholder=" Enter Address " className="form-control" />
												<p className="text-danger"> {formik.errors.crrAddress && formik.touched.crrAddress && formik.errors.crrAddress } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrWeb"> Web Link <span className="text-danger">*</span> </label>
												<input type="text" id="crrWeb" name="crrWeb" {...formik.getFieldProps('crrWeb')} placeholder=" Enter WebLink " className="form-control" />
												<p className="text-danger"> {formik.errors.crrWeb && formik.touched.crrWeb && formik.errors.crrWeb } </p>
											</div>

										</div>

										<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
											<div className="col-md-3 mb-3" >
												<button type="submit" className="btn btn-light btn-outline-success mx-2" > {button} </button>
												<button type="button" onClick={() => {
													navigate('/Courier'); 
												}} className="btn btn-light btn-outline-success mx-2" > Cancel </button>
											</div>
										</div>

									</form>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

	*/}