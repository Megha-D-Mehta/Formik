import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

function OldGetCourier()
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

	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODYwNDM5NCwiZXhwIjoxNzA4NjA0OTk0LCJpYXQiOjE3MDg2MDQzOTR9.-xkwT9Ax4S1lTnMuD_5njXllqmRNA0yI5g1COONHxSE';

	const refDel = useRef('');
	const refClose = useRef('');

	const [getRecords, setGetRecords] = useState([]);

	useEffect(() => {
		GetCourierList();
	},[])

	const GetCourierList = () => 
	{
		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierList';
		const token = tokenId;

		const data = {
		  	CurrentPage: 1,
			PageSize: 10,
			Search: "",
			Sorting: "",
			Status: -1,
			CompanyIDEncrypted: "lrQ+Ao+IEjI=",
			BranchIDEncrypted: "lrQ+Ao+IEjI="
		};

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
		.then(response => {
			if (!response.ok) {
	            throw new Error('Network response was not ok');
	        }
			return response.json();
		})
		.then(data => {
			setGetRecords(data.CourierList);
		})
		.catch(error => {
			console.error('Error:', error);
			setGetRecords([]);
		})
	}

	const [values,setValues] = useState({
		CourierIDEncrypted: '',
		CompanyIDEncrypt: "lrQ+Ao+IEjI=",
		BranchIDEncrypt: "lrQ+Ao+IEjI=",
		CourierName:'',
		CourierAddress:'',
		CountryCode: "+91",
		MobileNo:'',
		EmailID:'',
		ContactPersonName:'',
		WebLink:'',
		ModifiedByEncrypt: " Megha "
	});

	
	const getCourierbyIdforDelete = (currentCourier) => 
	{
		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
		const token = tokenId;
		const courierid = currentCourier.CourierIDEncrypted;
		const data = { courierid };

		axios.post(apiUrl,data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		.then(res => {
			console.log("RES getCourierbyId => " + res.data); //RES getCourierbyId => [object Object]
			setValues({ 
				...values,
				CourierIDEncrypted: currentCourier.CourierIDEncrypted,
				CourierName: currentCourier.CourierName, 
				CourierAddress: currentCourier.CourierAddress, 
				MobileNo: currentCourier.MobileNo, 
				EmailID: currentCourier.EmailID, 
				ContactPersonName: currentCourier.ContactPersonName, 
				WebLink: currentCourier.WebLink
			})
			refDel.current.click();
		})
		.catch(error => console.log(error))
	}

	const courierDelete = (values) => 
	{
		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierDelete';
		const token = tokenId;

		const { CourierIDEncrypted } = values;
		const ModifiedByEncrypted = '';
		const data = { CourierIDEncrypted, ModifiedByEncrypted };

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data),
		})
		.then(res => {
			refDel.current.click();
			GetCourierList();
		})
		.catch(error => console.log(error));
	}

	return(
		<>
			<div>

	        	<button type="button" ref={refDel} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalDel" > Launch demo modal </button>
				<div className="modal fade" id="exampleModalDel" tabIndex="-1" aria-labelledby="exampleModalLabelDel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">

							<div className="modal-header">
		        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Delete Courier Details </h1>
		        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  						</div>

	  						<div className="modal-body" style={{ backgroundColor: '#F5E8DD', borderRadius: '10px',  }}>
								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }}>
									<h3> Are You Sure You Want to Delete Record of {values.CourierName}  </h3>
								</div>
	  						</div>

	  						<div className="modal-footer">
	  							<button type="button" onClick={() => {
	  								courierDelete(values);
	  							}} className="btn btn-light btn-outline-success mx-2" > Yes </button>

	  							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" > No </button>
	  						</div>

						</div>
					</div>
				</div>

		        <div style = {{ backgroundColor: 'white', margin: '5rem 0' }} >
		        	<div>
		        		<div className="row"  style={{ borderBottom: '1px solid #ccc', textAlign: 'left', paddingTop: '1rem', marginBottom: '1rem' }} >
							
							<div className="col-md-1 mb-3" >
 									<button onClick={ () => {
 										navigate("/AddCourier");
 									}} className="btn btn-light btn-outline-success mx-2" > <i className="fa-solid fa-plus"></i> Add Courier </button>
							</div>
							<div className="col-md mb-3" >
								<h4>Courier Name</h4>
							</div>
							<div className="col-md mb-3" >
								<h4>Mobile No</h4>
							</div>
							<div className="col-md mb-3" >
								<h4>Contact Person Name</h4>
							</div>
							<div className="col-md mb-3" >
								<h4>Email</h4>
							</div>
							<div className="col-md mb-3" >
								<h4>Web Link</h4>
							</div>

					    </div>

					    <h2 className="text-center" style= {{ padding: '2rem 0' }} >{getRecords.length === 0 && 'No Couriers Found'}</h2>

					    {getRecords.map(record => {
					    	return(
					    		<div className="row" key={record.CourierIDEncrypted} style={{ borderBottom: '1px solid #ccc', textAlign: 'left', marginBottom: '1rem'   }} >
					    			
					    			<div className="col-md-1 mb-2">
					    				<div className="d-flex justify-content-center">
						    				<i className="fa-regular fa-trash-can mx-2 my-2" onClick={() => {
						    					getCourierbyIdforDelete(record);
						    				}} style={{color: '#fa295d' }}></i>
						    				<Link className="fa-regular fa-pen-to-square mx-2 my-2" to={`/EditCourier/${record.CourierIDEncrypted}`} state={record} style={{ color: '#8fa0bc' }} ></Link>
						    			</div>
						    		</div>

					    			<div className="col-md mb-2" >
										<p> {record.CourierName.slice(0,25)}... </p>
									</div>
									<div className="col-md mb-2" >
										<p> {record.MobileNo} </p>
									</div>
									<div className="col-md mb-2" >
										<p> {record.ContactPersonName.slice(0,30)}... </p>
									</div>
									<div className="col-md mb-2" >
										<p> {record.EmailID.slice(0,15)}... </p>
									</div>
									<div className="col-md mb-2" >
										<p> {record.WebLink} </p>
									</div>

					    		</div>
					    	)
					    })}

		        	</div>
		        </div>
		    </div>
		</>
	);
}
export default OldGetCourier;



















































//================================================================================================================================================================================
// 		GETCOURIER with delete & edit in same file
//================================================================================================================================================================================


// import React, { useState, useEffect, useRef } from 'react';
// // eslint-disable-next-line
// import { useNavigate, Link } from 'react-router-dom'
// // import { Formik, Form, Field } from 'formik';
// import axios from 'axios';


// function OldGetCourier()
// {
// 	window.localStorage.getItem("login");

// 	const tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklERW5jcnlwdCI6IkdJb2RoSmpZblVKTkN4MmMwVWFZeGc9PSIsIm5iZiI6MTcwODU5NjYyNywiZXhwIjoxNzA4NTk3MjI3LCJpYXQiOjE3MDg1OTY2Mjd9.O6nKRFuYged_KBP6S0n93Y05iJLVE4jjYeCUNfbqlCs';

// 	const navigate = useNavigate();
// 	useEffect(() => 
// 	{
// 		if(window.localStorage.getItem("login") === 'false')
// 		{
// 			navigate("/");
// 		}
// 	},[navigate])

// 	// const refEdit = useRef('');
// 	const refDel = useRef('');
// 	const refClose = useRef('');


// 	const [getRecords, setGetRecords] = useState([]);

// 	useEffect(() => {
// 		GetCourierList();
// 	},[])

// 	const GetCourierList = () => 
// 	{
// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierList';
// 		const token = tokenId;

// 		const data = {
// 		  	CurrentPage: 1,
// 			PageSize: 10,
// 			Search: "",
// 			Sorting: "",
// 			Status: -1,
// 			CompanyIDEncrypted: "lrQ+Ao+IEjI=",
// 			BranchIDEncrypted: "lrQ+Ao+IEjI="
// 		};

// 		fetch(apiUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: JSON.stringify(data),
// 		})
// 		.then(response => {
// 			return response.json();
// 		})
// 		.then(data => {
// 			// console.log(data);
// 			setGetRecords(data.CourierList);
// 		})
// 		.catch(error => {
// 			console.error('Error:', error);
// 		})
// 	}

// 	const [values,setValues] = useState({
// 		CourierIDEncrypted: '',
// 		CompanyIDEncrypt: "lrQ+Ao+IEjI=",
// 		BranchIDEncrypt: "lrQ+Ao+IEjI=",
// 		CourierName:'',
// 		CourierAddress:'',
// 		CountryCode: "+91",
// 		MobileNo:'',
// 		EmailID:'',
// 		ContactPersonName:'',
// 		WebLink:'',
// 		ModifiedByEncrypt: " Megha "
// 	});

	
// 	const getCourierbyIdforDelete = (currentCourier) => 
// 	{
// 		// console.log(" =====> updateCourier = (currentCourier) start ");
// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
// 		const token = tokenId;
// 		const courierid = currentCourier.CourierIDEncrypted;
// 		const data = { courierid };

// 		axios.post(apiUrl,data, {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${token}`
// 			}
// 		})
// 		.then(res => {
// 			console.log("RES getCourierbyId => " + res.data); //RES getCourierbyId => [object Object]
// 			setValues({ 
// 				...values,
// 				CourierIDEncrypted: currentCourier.CourierIDEncrypted,
// 				CourierName: currentCourier.CourierName, 
// 				CourierAddress: currentCourier.CourierAddress, 
// 				MobileNo: currentCourier.MobileNo, 
// 				EmailID: currentCourier.EmailID, 
// 				ContactPersonName: currentCourier.ContactPersonName, 
// 				WebLink: currentCourier.WebLink
// 			})
// 			// console.log(" =====> updateCourier = (currentCourier) end ");
// 			refDel.current.click();
// 		})
// 		.catch(error => console.log(error))
// 	}

// 	const courierDelete = (values) => 
// 	{
// 	    // console.log(" =====> courierDelete = (currentCouriertoDelete) start ");

// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierDelete';
// 		const token = tokenId;
		
// 		const { CourierIDEncrypted } = values;
// 		const ModifiedByEncrypted = '';

// 		const data = { CourierIDEncrypted, ModifiedByEncrypted };

// 		fetch(apiUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${token}`
// 			},
// 			body: JSON.stringify(data),
// 		})
// 		.then(res => {
// 			refDel.current.click();
// 			GetCourierList();
// 			// console.log(" =====> courierDelete = (currentCouriertoDelete) end ");
// 		})
// 		.catch(error => console.log(error));

// 		// eslint-disable-next-line
// 		{/*
// 		axios.post(apiUrl,data, {
// 	      	headers: {
// 	        	'Content-Type': 'application/json',
// 	        	'Authorization': `Bearer ${token}`
// 	      	}
// 	    })
// 	    .then(res => {
// 	      	refDel.current.click();
// 	      	GetCourierList();
// 	      	// console.log(" =====> courierDelete = (currentCouriertoDelete) end ");
// 	    })
// 	    .catch(error => console.log(error));
// 	    */}

// 	}
// 	// eslint-disable-next-line
// 	{/*
// 	const getCourierbyIdforEdit = (currentCourier) => 
// 	{
// 		// console.log(" =====> updateCourier = (currentCourier) start ");
// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierDetailByID';
// 		const token = tokenId;
// 		const courierid = currentCourier.CourierIDEncrypted;
// 		const data = { courierid };

// 		axios.post(apiUrl,data, {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${token}`
// 			}
// 		})
// 		.then(res => {
// 			// console.log("RES getCourierbyId => " + res); //RES getCourierbyId => [object Object]
// 			setValues({ 
// 				...values,
// 				CourierIDEncrypted: currentCourier.CourierIDEncrypted,
// 				CourierName: currentCourier.CourierName, 
// 				CourierAddress: currentCourier.CourierAddress, 
// 				MobileNo: currentCourier.MobileNo, 
// 				EmailID: currentCourier.EmailID, 
// 				ContactPersonName: currentCourier.ContactPersonName, 
// 				WebLink: currentCourier.WebLink
// 			})
// 			// console.log(" =====> updateCourier = (currentCourier) end ");
// 			refEdit.current.click();
// 		})
// 		.catch(error => console.log(error))
// 	}
// */}

// 	// eslint-disable-next-line
// 	{/*
// 	const courierUpdate = (values) => {
// 		// console.log(" =====> courierUpdate = (values, {e}) start ");
// 		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierUpdate/';
// 		const token = tokenId;

// 		const { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt } = values;

// 	    const data = { CourierIDEncrypted, CompanyIDEncrypt, BranchIDEncrypt, CourierName, CourierAddress, CountryCode, MobileNo, EmailID, ContactPersonName, WebLink, ModifiedByEncrypt };

// 		axios.post(apiUrl,data, {
// 			headers: {
// 	            'Content-Type': 'application/json',
// 	            'Authorization': `Bearer ${token}`
// 	        }
// 		})
// 		.then((res) => {
// 			// console.log("RES courierUpdate => " + res); //RES courierUpdate => [object Object]
// 			refClose.current.click();
// 			GetCourierList();
// 			// console.log(" =====> courierUpdate = (values, {e}) end ");
// 		})
// 		.catch(error => console.log(error))
// 	}
// */}

// 	return(
// 		<>
// 		{/*<Formik>*/}
// 			<div>

// 	        	<button type="button" ref={refDel} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalDel" > Launch demo modal </button>
// 				<div className="modal fade" id="exampleModalDel" tabIndex="-1" aria-labelledby="exampleModalLabelDel" aria-hidden="true">
// 					<div className="modal-dialog modal-dialog-centered">
// 						<div className="modal-content">

// 							<div className="modal-header">
// 		        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Delete Courier Details </h1>
// 		        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// 	  						</div>

// 	  						<div className="modal-body" style={{ backgroundColor: '#F5E8DD', borderRadius: '10px',  }}>
// 								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }}>
// 									<h3> Are You Sure You Want to Delete Record of {values.CourierName}  </h3>
// 								</div>
// 	  						</div>

// 	  						<div className="modal-footer">
// 	  							<button type="button" onClick={() => {
// 	  								courierDelete(values);
// 	  							}} className="btn btn-light btn-outline-success mx-2" > Yes </button>

// 	  							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" > No </button>
// 	  						</div>

// 						</div>
// 					</div>
// 				</div>

// 			{/*
// 	        	<button type="button" ref={refEdit} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" > Launch demo modal </button>
// 				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// 					<div className="modal-dialog">

// 						<div className="modal-content">
// 	  						<div className="modal-header">
// 		        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Courier Details </h1>
// 		        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// 	  						</div>

// 	  						<div className="modal-body" style={{ backgroundColor: '#BBE2EC', borderRadius: '10px',  }}>
// 								<Form method="POST" >

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrName"> Courier Name <span className="text-danger">*</span> </label>
// 										<Field type="text" id="upCrrName" name="upCrrName" onChange={(e) => { 
// 											setValues({ ...values, CourierName: e.target.value });
// 										}} value={values.CourierName} className="form-control" />
// 									</div>

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrContactName"> Contact Person Name <span className="text-danger">*</span> </label>
// 										<Field type="text" id="upCrrContactName" name="upCrrContactName" onChange={(e) => { 
// 											setValues({ ...values, ContactPersonName: e.target.value });
// 										}} value={values.ContactPersonName} className="form-control" />
// 									</div>

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrMobile"> Mobile No <span className="text-danger">*</span> </label>
// 										<Field type="tel" id="upCrrMobile" name="upCrrMobile" onChange={(e) => { 
// 											setValues({ ...values, MobileNo: e.target.value });
// 										}} value={values.MobileNo} className="form-control" />
// 									</div>

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrEmail"> Email <span className="text-danger">*</span> </label>
// 										<Field type="text" id="upCrrEmail" name="upCrrEmail"  onChange={(e) => { 
// 											setValues({ ...values, EmailID: e.target.value });
// 										}} value={values.EmailID} className="form-control" />
// 									</div>

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrAddress"> Address <span className="text-danger">*</span> </label>
// 										<Field as="textarea" rows='3' id="upCrrAddress" name="upCrrAddress"  onChange={(e) => { 
// 											setValues({ ...values, CourierAddress: e.target.value });
// 										}} value={values.CourierAddress} className="form-control" />
// 									</div>

// 									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 										<label htmlFor="upCrrWeb"> Web Link <span className="text-danger">*</span> </label>
// 										<Field type="text" id="upCrrWeb" name="upCrrWeb" onChange={(e) => { 
// 											setValues({ ...values, WebLink: e.target.value });
// 										}} value={values.WebLink} className="form-control" />
// 									</div>
// 								</Form>
// 	  						</div>
// 	  						<div className="modal-footer">
// 	  							<button type="button" onClick={() => {
// 	  								courierUpdate(values);
// 	  							}} className="btn btn-light btn-outline-success mx-2" > Update </button>
// 	  							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" >Close</button>
// 	  						</div>
// 						</div>
// 					</div>
// 				</div>
// 			*/}
// 		        <div style = {{ backgroundColor: 'white', margin: '5rem 0' }} >
// 		        	<div>
// 		        		<div className="row"  style={{ borderBottom: '1px solid #ccc', textAlign: 'left', paddingTop: '1rem', marginBottom: '1rem' }} >
							
// 							<div className="col-md-1 mb-3" >
//  									<button onClick={ () => {
//  										navigate("/AddCourier");
//  									}} className="btn btn-light btn-outline-success mx-2" > <i className="fa-solid fa-plus"></i> Add Courier </button>
// 							</div>
// 							<div className="col-md mb-3" >
// 								<h4>Courier Name</h4>
// 							</div>
// 							<div className="col-md mb-3" >
// 								<h4>Mobile No</h4>
// 							</div>
// 							<div className="col-md mb-3" >
// 								<h4>Contact Person Name</h4>
// 							</div>
// 							<div className="col-md mb-3" >
// 								<h4>Email</h4>
// 							</div>
// 							<div className="col-md mb-3" >
// 								<h4>Web Link</h4>
// 							</div>

// 					    </div>

// 					    {getRecords.map(record => {
// 					    	return(
// 					    		<div className="row" key={record.CourierIDEncrypted} style={{ borderBottom: '1px solid #ccc', textAlign: 'left', marginBottom: '1rem'   }} >
					    			
// 					    			<div className="col-md-1 mb-2">
// 					    				<div className="d-flex justify-content-center">
// 						    				<i className="fa-regular fa-trash-can mx-2 my-2" onClick={() => {
// 						    					getCourierbyIdforDelete(record);
// 						    				}} style={{color: '#fa295d' }}></i>

// 						    				<Link className="fa-regular fa-pen-to-square mx-2 my-2" to={`/EditCourier/${record.CourierIDEncrypted}`} state={record} style={{ color: '#8fa0bc' }} ></Link>

// 						    			{/*
// 						    				<i className="fa-regular fa-pen-to-square mx-2 my-2 " onClick={() => {
// 						    					getCourierbyIdforEdit(record);
// 						    				}} style={{ color: '#8fa0bc' }} ></i>
// 						    			*/}

// 						    			</div>
// 						    		</div>

// 					    			<div className="col-md mb-2" >
// 										<p> {record.CourierName.slice(0,25)}... </p>
// 									</div>
// 									<div className="col-md mb-2" >
// 										<p> {record.MobileNo} </p>
// 									</div>
// 									<div className="col-md mb-2" >
// 										<p> {record.ContactPersonName.slice(0,30)}... </p>
// 									</div>
// 									<div className="col-md mb-2" >
// 										<p> {record.EmailID.slice(0,15)}... </p>
// 									</div>
// 									<div className="col-md mb-2" >
// 										<p> {record.WebLink} </p>
// 									</div>

// 					    		</div>
// 					    	)
// 					    })}

// 		        	</div>
// 		        </div>

// 		    </div>
// 	    {/*</Formik>*/}
// 		</>

// 	);
// }
// export default OldGetCourier;
