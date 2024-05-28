
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function EditCourier()
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


	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODc2NTE5MSwiZXhwIjoxNzA4NzY1NzkxLCJpYXQiOjE3MDg3NjUxOTF9.xDqXQqTKMLIdl1JQ9sJyS-ZFzIT7CfwwpOrE8IHx2tY';
	const { courierID } = useParams();
	const initialValues = { crrName: '', crrAddress: '', crrMobile: '', crrEmail: '', crrContactName: '', crrWeb: '' };

    // const [courierData, setCourierData] = useState({
    // 	...courierData,
    // 	CourierName: initialValues.crrName,
    // 	CourierAddress: initialValues.crrAddress,
	// 	MobileNo: initialValues.crrMobile,
	// 	EmailID: initialValues.crrEmail,
	// 	ContactPersonName: initialValues.crrContactName,
	// 	WebLink: initialValues.crrWeb

    // });

    const [courierData, setCourierData] = useState([]);

	useEffect(() => {
		console.log("useEffect triggered");
		const getCourierbyIdforEdit = () => {
			const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
			const token = tokenId;
			const CourierIDEncrypted = courierID;
			console.log("===== getCourierbyIdforEdit = ():  " + CourierIDEncrypted);
			const data = { CourierIDEncrypted };

			axios.post(apiUrl,data, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => {
	            setCourierData(response.data);
			})
			.catch(error => console.log(error))
		};
		getCourierbyIdforEdit();
	}, [courierID]);

	// console.log("=========================> " + courierData.MobileNo);

	const validationSchema = Yup.object({
		crrName: Yup.string().required('Courier Name is Required Field!'),
		crrContactName: Yup.string().required('Contact Person Name is Required Field!'),
		crrEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Email is Required Field!'),		
		crrMobile: Yup.string().max(12,'Enter 10 Digits Only!').min(10,'Enter 10 Digits Only!').matches(/^[0-9]+/i,'Enter Only Numbers').required('Mobile is Required Field!'),
		crrAddress: Yup.string().required('Courier Address is Required Field!'),
		crrWeb: Yup.string().required('Web Link is Required Field!'),
	});

	const onSubmit = (values) => {
		console.log('');

		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
		const token = tokenId;

		const CourierIDEncrypted = courierID;
		const CompanyIDEncrypt= "lrQ+Ao+IEjI=";
		const BranchIDEncrypt= "lrQ+Ao+IEjI=";
		const CourierName = courierData.CourierName;
		const CourierAddress = courierData.CourierAddress;
		const CountryCode= "+91";
		const MobileNo = courierData.MobileNo;
		const EmailID = courierData.EmailID;
		const ContactPersonName = courierData.ContactPersonName;
		const WebLink = courierData.WebLink;
		const ModifiedByEncrypt = "";

		const data = { 
			CourierIDEncrypted, 
			CompanyIDEncrypt, 
			BranchIDEncrypt, 
			CourierName, 
			CourierAddress, 
			CountryCode, 
			MobileNo, 
			EmailID, 
			ContactPersonName, 
			WebLink, 
			ModifiedByEncrypt 
		};

		console.log(data);

		axios.post(apiUrl,data, {
			headers: {
	            'Content-Type': 'application/json',
	            'Authorization': `Bearer ${token}`
	        }
		})
		.then((res) => {
			console.log(" => Edited Courier of =>  " + CourierName);
			setCourierData(data);
			navigate('/GetCourier'); 
		})
		.catch(error => console.log(error))
	}

	const formik = useFormik({
        initialValues: courierData,
		validationSchema,
		onSubmit
	});

	return(

		<div style = {{ margin: '5rem 0' }} >
			{/*<div className="d-flex flex-wrap-wrap">
							
							<div className="row" style={{ borderBottom: '1px solid #ccc', textAlign: 'left',}} >
								<div className="col">
									<div className="d-flex flex-wrap" >
										<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
											
											<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
												<h4> Edit Courier </h4>
											</div>
			
											<div className="row" style={{ textAlign: 'left',}} >
												<form onSubmit={formik.handleSubmit}>
													<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
														
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrName"> Courier Name <span className="text-danger">*</span> </label>
															<input type="text" id="crrName" name="crrName" onChange={(e) => { 	setCourierData({ ...courierData, CourierName: e.target.value })}}  value={courierData.CourierName} className="form-control" />
															<p className="text-danger"> { formik.errors.crrName && formik.touched.crrName && formik.errors.crrName } </p>
														</div>
			
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
															<input type="text" id="crrContactName" name="crrContactName" onChange={(e) => { 	setCourierData({ ...courierData, ContactPersonName: e.target.value })}}  value={courierData.ContactPersonName} className="form-control" />
															<p className="text-danger"> { formik.errors.crrContactName && formik.touched.crrContactName && formik.errors.crrContactName } </p>
														</div>
			
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
															<input type="tel" id="crrMobile" name="crrMobile" onChange={(e) => { 	setCourierData({ ...courierData, MobileNo: e.target.value })}}  value={courierData.MobileNo} className="form-control" />
															<p className="text-danger"> { formik.errors.crrMobile && formik.touched.crrMobile && formik.errors.crrMobile } </p>
														</div>
			
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrEmail"> Email <span className="text-danger">*</span> </label>
															<input type="text" id="crrEmail" name="crrEmail" onChange={(e) => { 	setCourierData({ ...courierData, EmailID: e.target.value })}}  value={courierData.EmailID} className="form-control" />
															<p className="text-danger"> { formik.errors.crrEmail && formik.touched.crrEmail && formik.errors.crrEmail } </p>
														</div>
			
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrAddress"> Address <span className="text-danger">*</span> </label>
															<input as="textarea" rows='3' id="crrAddress" name="crrAddress" onChange={(e) => { 	setCourierData({ ...courierData, CourierAddress: e.target.value })}}  value={courierData.CourierAddress} className="form-control" />
															<p className="text-danger"> { formik.errors.crrAddress && formik.touched.crrAddress && formik.errors.crrAddress } </p>
														</div>
			
														<div className="col-md-3 mb-3" >
															<label htmlFor="crrWeb"> Web Link <span className="text-danger">*</span> </label>
															<input type="text" id="crrWeb" name="crrWeb" onChange={(e) => { 	setCourierData({ ...courierData, WebLink: e.target.value })}}  value={courierData.WebLink} className="form-control" />
															<p className="text-danger"> { formik.errors.crrWeb && formik.touched.crrWeb && formik.errors.crrWeb } </p>
														</div>
			
													</div>
			
													<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
														<div className="col-md-3 mb-3" >
															<button type="submit" className="btn btn-light btn-outline-success mx-2" > UPDATE </button>
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
			
						</div>*/}
		</div>
	);
}
export default EditCourier;











/





// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================
// =============================================================================================================================================================================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function OldEditCourier()
{
	window.localStorage.getItem("login");

	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODY3NDU0NSwiZXhwIjoxNzA4Njc1MTQ1LCJpYXQiOjE3MDg2NzQ1NDV9.A4dzkzXwAcmjCjStFAZsILfHfQ-8i3TGnenFGZvdLgg';

	const navigate = useNavigate();
	useEffect(() => 
	{
		if(window.localStorage.getItem("login") === 'false')
		{
			navigate("/");
		}
	},[navigate])

	const location = useLocation();
	const currentRecord = location.state || {};

	const CourierID = currentRecord.CourierIDEncrypted;

	const validationSchema = Yup.object({
		upCrrName: Yup.string().required('Courier Name is Required Field!'),
		upCrrContactName: Yup.string().required('Contact Person Name is Required Field!'),
		upCrrEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Email is Required Field!'),		
		upCrrMobile: Yup.string().max(12,'Enter 10 Digits Only!').min(10,'Enter 10 Digits Only!').matches(/^[0-9]+/i,'Enter Only Numbers').required('Mobile is Required Field!'),
		upCrrAddress: Yup.string().required('Courier Address is Required Field!'),
		upCrrWeb: Yup.string().required('Web Link is Required Field!'),
	});

	const [recordValues,setRecordValues] = useState({
		CourierIDEncrypted: CourierID,
		CompanyIDEncrypt: "lrQ+Ao+IEjI=",
		BranchIDEncrypt: "lrQ+Ao+IEjI=",
		CourierName: currentRecord.CourierName,
		CourierAddress: currentRecord.CourierAddress,
		CountryCode: "+91",
		MobileNo: currentRecord.MobileNo,
		EmailID: currentRecord.EmailID,
		ContactPersonName: currentRecord.ContactPersonName,
		WebLink: currentRecord.WebLink,
		ModifiedByEncrypt: " Megha "
	});

	const onSubmit = (recordValues) => {
		console.log('');	
	}

	const courierUpdate = () => {
		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
		const token = tokenId;

		const { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt } = recordValues;

	    const data = { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt };

		axios.post(apiUrl,data, {
			headers: {
	            'Content-Type': 'application/json',
	            'Authorization': `Bearer ${token}`
	        }
		})
		.then((res) => {
			console.log(" => Edited Courier of =>  " + CourierName);
			navigate('/GetCourier'); 
		})
		.catch(error => console.log(error))
	}

	const formik = useFormik({
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
									<h4> Edit Courier </h4>
								</div>

								<div className="row" style={{ textAlign: 'left',}} >
									<form onSubmit={formik.handleSubmit}>
										<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
											
											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrName"> Courier Name <span className="text-danger">*</span> </label>
												<input type="text" id="upCrrName" name="upCrrName" onChange={(e) => { 
													setRecordValues({ ...recordValues, CourierName: e.target.value });
												}} value={recordValues.CourierName} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrName && formik.touched.upCrrName && formik.errors.upCrrName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
												<input type="text" id="upCrrContactName" name="upCrrContactName" onChange={(e) => { 
													setRecordValues({ ...recordValues, ContactPersonName: e.target.value });
												}} value={recordValues.ContactPersonName} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrContactName && formik.touched.upCrrContactName && formik.errors.upCrrContactName } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrMobile"> Mobile No <span className="text-danger">*</span> </label>
												<input type="tel" id="upCrrMobile" name="upCrrMobile" onChange={(e) => { 
													setRecordValues({ ...recordValues, MobileNo: e.target.value });
												}} value={recordValues.MobileNo} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrMobile && formik.touched.upCrrMobile && formik.errors.upCrrMobile } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrEmail"> Email <span className="text-danger">*</span> </label>
												<input type="text" id="upCrrEmail" name="upCrrEmail"  onChange={(e) => { 
													setRecordValues({ ...recordValues, EmailID: e.target.value });
												}} value={recordValues.EmailID} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrEmail && formik.touched.upCrrEmail && formik.errors.upCrrEmail } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrAddress"> Address <span className="text-danger">*</span> </label>
												<input as="textarea" rows='3' id="upCrrAddress" name="upCrrAddress"  onChange={(e) => { 
													setRecordValues({ ...recordValues, CourierAddress: e.target.value });
												}} value={recordValues.CourierAddress} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrAddress && formik.touched.upCrrAddress && formik.errors.upCrrAddress } </p>
											</div>

											<div className="col-md-3 mb-3" >
												<label htmlFor="upCrrWeb"> Web Link <span className="text-danger">*</span> </label>
												<input type="text" id="upCrrWeb" name="upCrrWeb" onChange={(e) => { 
													setRecordValues({ ...recordValues, WebLink: e.target.value });
												}} value={recordValues.WebLink} className="form-control" />
												<p className="text-danger"> {formik.errors.upCrrWeb && formik.touched.upCrrWeb && formik.errors.upCrrWeb } </p>
											</div>

										</div>

										<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
											<div className="col-md-3 mb-3" >
												<button type="button" onClick={() => {
					  								courierUpdate(recordValues);
					  							}} className="btn btn-light btn-outline-success mx-2" > Update </button>

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
export default OldEditCourier;






































// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// function OldOldEditCourier()
// {
// 	window.localStorage.getItem("login");

// 	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODYwNDM5NCwiZXhwIjoxNzA4NjA0OTk0LCJpYXQiOjE3MDg2MDQzOTR9.-xkwT9Ax4S1lTnMuD_5njXllqmRNA0yI5g1COONHxSE';

// 	const navigate = useNavigate();
// 	useEffect(() => 
// 	{
// 		if(window.localStorage.getItem("login") === 'false')
// 		{
// 			navigate("/");
// 		}
// 	},[navigate])

// 	const location = useLocation();
// 	const currentRecord = location.state || {};
// 	const CourierID = currentRecord.CourierIDEncrypted;

// 	const initialValues = { upCrrName: currentRecord.CourierName , upCrrAddress: currentRecord.CourierAddress , upCrrMobile: currentRecord.MobileNo , upCrrEmail: currentRecord.EmailID , upCrrContactName: currentRecord.ContactPersonName , upCrrWeb: currentRecord.WebLink  };

// 	const validationSchema = Yup.object({
// 		upCrrName: Yup.string().required('Courier Name is Required Field!'),
// 		upCrrContactName: Yup.string().required('Contact Person Name is Required Field!'),
// 		upCrrEmail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Email is Required Field!'),		
// 		upCrrMobile: Yup.string().max(12,'Enter 10 Digits Only!').matches(/^[0-9]+/i,'Enter Only Numbers').required('Mobile is Required Field!'),
// 		upCrrAddress: Yup.string().required('Courier Address is Required Field!'),
// 		upCrrWeb: Yup.string().required('Web Link is Required Field!'),
// 	});

// 	const [recordValues,setRecordValues] = useState({
// 		CourierIDEncrypted: CourierID,
// 		CompanyIDEncrypt: "lrQ+Ao+IEjI=",
// 		BranchIDEncrypt: "lrQ+Ao+IEjI=",
// 		CourierName: currentRecord.CourierName,
// 		CourierAddress: currentRecord.CourierAddress,
// 		CountryCode: "+91",
// 		MobileNo: currentRecord.MobileNo,
// 		EmailID: currentRecord.EmailID,
// 		ContactPersonName: currentRecord.ContactPersonName,
// 		WebLink: currentRecord.WebLink,
// 		ModifiedByEncrypt: " Megha "
// 	});

// 	const onSubmit = (values, { resetForm }) => {
// 		console.log('');	
// 	}

// 	const courierUpdate = (recordValues) => {
// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
// 		const token = tokenId;

// 		const { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt } = recordValues;

// 	    const data = { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt };

// 		axios.post(apiUrl,data, {
// 			headers: {
// 	            'Content-Type': 'application/json',
// 	            'Authorization': `Bearer ${token}`
// 	        }
// 		})
// 		.then((res) => {
// 			navigate('/GetCourier'); 
// 		})
// 		.catch(error => console.log(error))
// 	}

// 	return(

// 		<Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={onSubmit} >		
// 			<div style = {{ margin: '5rem 0' }} >
// 				<div className="d-flex flex-wrap-wrap">
					
// 					<div className="row" style={{ borderBottom: '1px solid #ccc', textAlign: 'left',}} >
// 						<div className="col">
// 							<div className="d-flex flex-wrap" >
// 								<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
									
// 									<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', textAlign: 'left',}} >
// 										<h4> Add Courier </h4>
// 									</div>

// 									<div className="row" style={{ textAlign: 'left',}} >
// 										<Form>
// 											<div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem', }} >
												
// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrName"> Courier Name <span className="text-danger">*</span> </label>
// 													<Field type="text" id="upCrrName" name="upCrrName" onChange={(e) => { 
// 														setRecordValues({ ...recordValues, CourierName: e.target.value });
// 													}} value={recordValues.CourierName} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrName"/></span></p>
// 												</div>

// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
// 													<Field type="text" id="upCrrContactName" name="upCrrContactName" onChange={(e) => { 
// 														setRecordValues({ ...recordValues, ContactPersonName: e.target.value });
// 													}} value={recordValues.ContactPersonName} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrContactName"/></span></p>
// 												</div>

// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrMobile"> Mobile No <span className="text-danger">*</span> </label>
// 													<Field type="tel" id="upCrrMobile" name="upCrrMobile" onChange={(e) => { 
// 														setRecordValues({ ...recordValues, MobileNo: e.target.value });
// 													}} value={recordValues.MobileNo} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrMobile"/></span></p>
// 												</div>

// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrEmail"> Email <span className="text-danger">*</span> </label>
// 													<Field type="text" id="upCrrEmail" name="upCrrEmail"  onChange={(e) => { 
// 														setRecordValues({ ...recordValues, EmailID: e.target.value });
// 													}} value={recordValues.EmailID} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrEmail"/></span></p>
// 												</div>

// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrAddress"> Address <span className="text-danger">*</span> </label>
// 													<Field as="textarea" rows='3' id="upCrrAddress" name="upCrrAddress"  onChange={(e) => { 
// 														setRecordValues({ ...recordValues, CourierAddress: e.target.value });
// 													}} value={recordValues.CourierAddress} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrAddress"/></span></p>
// 												</div>

// 												<div className="col-md-3 mb-3" >
// 													<label htmlFor="upCrrWeb"> Web Link <span className="text-danger">*</span> </label>
// 													<Field type="text" id="upCrrWeb" name="upCrrWeb" onChange={(e) => { 
// 														setRecordValues({ ...recordValues, WebLink: e.target.value });
// 													}} value={recordValues.WebLink} className="form-control" />
// 													<p><span className="text-danger"><ErrorMessage name="upCrrWeb"/></span></p>
// 												</div>

// 											</div>

// 											<div className="row" style={{ borderBottom: '1px solid #ccc', }} >
// 												<div className="col-md-3 mb-3" >
// 													<button type="button" onClick={() => {
// 						  								courierUpdate(recordValues);
// 						  							}} className="btn btn-light btn-outline-success mx-2" > Update </button>

// 													<button type="button" onClick={() => { 
// 														navigate('/GetCourier'); 
// 													}} className="btn btn-light btn-outline-success mx-2" > Cancel </button>

// 												</div>
// 											</div>

// 										</Form>
// 									</div>

// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 				</div>
// 			</div>
// 		</Formik>
// 	);
// }
// export default OldOldEditCourier;