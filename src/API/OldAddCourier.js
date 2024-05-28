import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

	// "CourierName": "string",
	// "MobileNo": "string",
	// "EmailID": "string",
	// "ContactPersonName": "string",
	// "WebLink": "string"

function OldAddCourier(props)
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

	const initialValues = { crrName: '', crrAddress: '' , crrMobile: '' , crrEmail: '' , crrContactName: '' , crrWeb: ''  };
	const [inrecords, setInRecords] = useState([]);

	const validationSchema = Yup.object({
		crrName: Yup.string().required('Courier Name is Required Field!'),
		crrContactName: Yup.string().required('Contact Person Name is Required Field!'),
		crrEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Email is Required Field!'),		
		crrMobile: Yup.string().max(12,'Enter 10 Digits Only!').matches(/^[0-9]+/i,'Enter Only Numbers').required('Mobile is Required Field!'),
		crrAddress: Yup.string().required('Courier Address is Required Field!'),
		crrWeb: Yup.string().required('Web Link is Required Field!'),
	});

	const onSubmit = (values, { resetForm }) => {
		
		insertCourier(values);
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

		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODU5NzUwNiwiZXhwIjoxNzA4NTk4MTA2LCJpYXQiOjE3MDg1OTc1MDZ9.xRTdotLnC4_nPP0_U6NLlwFv5hSMYeHptcnBP2GS7pM';

		axios
			.post('http://192.168.0.200:814/api/Courier/CourierInsert', data, {
			        headers: {
			            'Content-Type': 'application/json',
			            'Authorization': `Bearer ${token}`
			        }
			})
			.then((response) => {
				console.log(response);
				resetForm();
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const insertCourier = (initialValues) => {
		console.log(" Added User : " + initialValues.crrName);
		setInRecords(inrecords.concat(initialValues));
	}

	inrecords.forEach(item => {
	    console.log("");
	    console.log("CourierName: " + item.crrName);
	    console.log("CourierAddress: " + item.crrAddress);
	    console.log("CourierMobile: " + item.crrMobile);
	    console.log("CourierEmail: " + item.crrEmail);
	    console.log("CourierContactName: " + item.crrContactName);
	    console.log("CourierWeb: " + item.crrWeb);
	});



	return(

		<Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit} >
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
										<Form>
											<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
												
												<div className="col-md-3 mb-3" >
													<label htmlFor="crrName"> Courier Name <span className="text-danger">*</span> </label>
													<Field type="text" id="crrName" name="crrName" placeholder=" Enter Courier Name " className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrName"/></span></p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
													<Field type="text" id="crrContactName" name="crrContactName" placeholder=" Enter Contact Person Name " className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrContactName"/></span></p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
													<Field type="tel" id="crrMobile" name="crrMobile" maxLength="15" placeholder="Enter Mobile No" className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrMobile"/></span></p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
													<Field type="text" id="crrEmail" name="crrEmail" placeholder=" Enter Email " className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrEmail"/></span></p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrAddress"> Address <span className="text-danger">*</span> </label>
													<Field as="textarea" rows='3' id="crrAddress" name="crrAddress" placeholder=" Enter Address " className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrAddress"/></span></p>
												</div>

												<div className="col-md-3 mb-3" >
													<label htmlFor="crrWeb"> Web Link <span className="text-danger">*</span> </label>
													<Field type="text" id="crrWeb" name="crrWeb" placeholder=" Enter WebLink " className="form-control" />
													<p><span className="text-danger"><ErrorMessage name="crrWeb"/></span></p>
												</div>

											</div>

											<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
												<div className="col-md-3 mb-3" >
													<button type="submit" className="btn btn-light btn-outline-success mx-2" > Add USER </button>
													<button type="button" onClick={() => { window.location.reload(); }} className="btn btn-light btn-outline-success mx-2" > Cancel </button>

												</div>
											</div>

										</Form>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</Formik>
	);
}
export default OldAddCourier;
