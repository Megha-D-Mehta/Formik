
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AddCourier(props)
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

	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODkyNzE5OSwiZXhwIjoxNzA4OTI3Nzk5LCJpYXQiOjE3MDg5MjcxOTl9.kfGEiG0of1wkRSFjoR47ebO6UTLP2QO7vnkfD1FvU4c';


	const initialValues = { crrName: '', crrAddress: '', crrMobile: '', crrEmail: '', crrContactName: '', crrWeb: '' };

	const validationSchema = Yup.object({
		crrName: Yup.string().required('Courier Name is Required Field!'),
		crrContactName: Yup.string().required('Contact Person Name is Required Field!'),
		crrEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Email is Required Field!'),		
		crrMobile: Yup.string().max(10,'Enter 10 Digits Only!').min(10,'Enter 10 Digits!').matches(/^[0-9]+/i,'Enter Only Numbers').required('Mobile is Required Field!'),
		crrAddress: Yup.string().required('Courier Address is Required Field!'),
		crrWeb: Yup.string().required('Web Link is Required Field!'),
	});

	const onSubmit = (values) => {
	
		navigate('/GetCourier');

		const CompanyIDEncrypt= "lrQ+Ao+IEjI=";
		const BranchIDEncrypt= "lrQ+Ao+IEjI=";
		const CourierName = values.crrName;
		const CourierAddress = values.crrAddress;
		const CountryCode= "+91";
		const MobileNo = values.crrMobile;
		const EmailID = values.crrEmail;
		const ContactPersonName = values.crrContactName;
		const WebLink = values.crrWeb;
		const CreatedByEncrypt= "";

		const data = { CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, CreatedByEncrypt };

		const token = tokenId;

		axios.post('http://192.168.0.200:814/api/Courier/CourierInsert', data, {
	        headers: {
	            'Content-Type': 'application/json',
	            'Authorization': `Bearer ${token}`
	        }
		})
		.then((response) => {
			console.log(" => Added Courier of =>  " + CourierName);
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit
	});

	return(

		<div style = {{ margin: '5rem 0' }} >
			<div className="d-flex flex-wrap-wrap">
				
				<div className="row" style={{ borderBottom: '1px solid #ccc', textAlign: 'left',}} >
					<div className="col">
						<div className="d-flex flex-wrap" >
							<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
								
								<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
									<h4> Add Courier </h4>
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
												<input type="tel" id="crrMobile" name="crrMobile" maxLength="15" {...formik.getFieldProps('crrMobile')} placeholder="Enter Mobile No" className="form-control" />
												<p className="text-danger"> {formik.errors.crrMobile && formik.touched.crrMobile && formik.errors.crrMobile } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
												<input type="text" id="crrEmail" name="crrEmail" {...formik.getFieldProps('crrEmail')} placeholder=" Enter Email " className="form-control" />
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
												<button type="submit" className="btn btn-light btn-outline-success mx-2" > Add USER </button>
												<button type="button" onClick={() => {
													navigate('/GetCourier'); 
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
	);
}
export default AddCourier;
