
import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate } from 'react-router-dom'
// import { useFormik } from 'formik';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

function UserYup() 
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


	const initialValues = { uname: '', uemail: '', unote: '' };

	const userdetails = [];
	const [inUsers,setInUsers] = useState(userdetails);
	const [keyValue,setKeyValue] = useState(1);
	const [editUser,setEditUSer] = useState({ editedName: '', editedEmail: '', editedNote: '' });

	
	const ref = useRef('');
	const refClose = useRef('');


	const validationSchema = Yup.object({
		uname: Yup.string().min(2,'Enter Proper Name!').required('Required!'),
		uemail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Required!'),
		unote: Yup.string().required('Required!').min(10,'Enter Note of Minimum Length 10'),
	});


  	const onSubmit = (values, { resetForm }) => {
		insertUser(values);
		// resetForm(); //will reset value of form
		setKeyValue(keyValue + 1);

    	console.log('');
    	console.log(' => Key : ' + keyValue);
    	console.log(' => Name : ' + values.uname);
    	console.log(' => Email : ' + values.uemail);
    	console.log(' => Note : ' + values.unote);
    	console.log('');
  	};

  	// const formik = useFormik({
    // 	initialValues,
    // 	onSubmit,
    // 	validationSchema
  	// });


  	const insertUser = (initialValues) =>
  	{
		console.log(" Added User : " + initialValues.uname);
		// setInUsers(inUsers.concat(initialValues));
		setInUsers([ ...inUsers, { ...initialValues, key: keyValue }]);
  	}

  	const removeUser = (name) => {
		console.log(" Deleted User : " + name);
		const restUser = inUsers.filter((initialValues) => { return initialValues.uname !== name })
		setInUsers(restUser);
  	}

	const modifyUsers = (ename, eemail, enote) => {
		console.log(" Updated User : " + ename + '\n');

		 const updatedUsers = inUsers.map(user => {
	        if (user.uname === ename) {
	            return {
	                ...user,
	                uemail: eemail,
	                unote: enote
	            };
	        }
	        return user;
	    });
	    setInUsers(updatedUsers)
  	}

  	const updatedUser = (currentUser) => {
		setEditUSer({ editedName: currentUser.uname , editedEmail: currentUser.uemail, editedNote: currentUser.unote  });
		ref.current.click();
	}

	const clickUpdate = (e) => {
		e.preventDefault();
		const { editedName, editedEmail, editedNote } = editUser;

		setEditUSer({ editedName, editedEmail, editedNote });
		modifyUsers(editedName, editedEmail, editedNote);
		refClose.current.click();
	}

	const onUpdateChange = (e) => {
		setEditUSer({ ...editUser, [e.target.name]: e.target.value });
	}

	return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >

			<div style = {{ margin: '5rem 0' }} >
			    <div className="d-flex flex-wrap-wrap">
			        <div className="row">
			            
			            <div className="col">
			                <div className="d-flex flex-wrap "  >
			                    <div  style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
			                   
			                        <h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>
									
									<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" > Launch demo modal </button>
									<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  						<div className="modal-dialog">
					   						<div className="modal-content">
					      						<div className="modal-header">
							        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Edit User Details </h1>
							        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					      						</div>
					      						<div className="modal-body" style={{ backgroundColor: '#BBE2EC', borderRadius: '10px',  }}>
													<Form method="POST" >
														<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
															<label htmlFor = "edname" style={{  fontWeight: '600', fontSize: '22px' }} > Name </label>
															<Field type="text" id="edname" name="edname" className="form-control" value={editUser.editedName} readOnly style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
														</div>
														<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
															<label htmlFor = "edemail" style={{ fontWeight: '600', fontSize: '22px' }} > Email </label>
															<Field type="email" id="edemail" name="editedEmail" onChange={onUpdateChange} value={editUser.editedEmail} className="form-control" placeholder={editUser.editedEmail} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
														</div>
														<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
															<label htmlFor = "ednote" style={{ fontWeight: '600', fontSize: '22px' }} > Note </label>
															<Field  as="textarea" id="ednote" name="editedNote" rows='3' onChange={onUpdateChange} value={editUser.editedNote} className="form-control" placeholder={editUser.editedNote} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
														</div>
													</Form>
					      						</div>
					      						<div className="modal-footer">
					      							<button type="button" onClick={clickUpdate} className="btn btn-light btn-outline-success mx-2" > Update </button>
					      							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" >Close</button>
					      						</div>
				   							</div>
				   						</div>
				   					</div>

									<Form>
										<label htmlFor="uname"> Name </label>
										<Field type="text" id="uname" name="uname" placeholder=" Enter Name " className="form-control" />
	                                    <p><small style={{ color: 'red' }} ><ErrorMessage name="uname"/></small></p>

										<label htmlFor="uemail" style={{ margin: '1rem 0rem 0px', }} > Email </label>
										<Field type="email" id="uemail" name="uemail" placeholder=" Enter Email " className="form-control" />
	                                    <p><small style={{ color: 'red' }} ><ErrorMessage name="uemail"/></small></p>

										<label htmlFor="unote" style={{ margin: '1rem 0rem 0px', }} > Note </label>
										<Field as="textarea" id="unote" name="unote" rows='2' placeholder=" Enter Note " className="form-control" />
										<p><small style={{ color: 'red' }} ><ErrorMessage name="unote" /></small></p>

										<div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
											<button type="submit" className="btn btn-light btn-outline-success" > Add USER </button>
										</div>
									</Form>

								</div>
	               			</div>
	            		</div>

	            		<div className="col">
			                <div className="d-flex flex-direction-row">
			                    <div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', float: 'center', backgroundColor: 'white', padding: '4vw', boxSizing: 'border-box', textAlign: 'center', width: '800px' }} >

			                    	<h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>
									
									<div className="row my-3" style={{ padding:'0 20px' }}  >
										<h2>{inUsers.length === 0 && 'No Users'}</h2>
										{inUsers.map((initialValues) => {
											return(
	                                            <div key={initialValues.key} className="col-md-6 my-4">
													<div className="card" >
														<div className="card-body d-flex flex-column" style={{ textAlign: 'left' }}  >
															<h5 className="card-title"> {initialValues.uname}</h5>
															<p className="card-text"> {initialValues.uemail} </p>
															<p className="card-text" style={{ height: '5rem' }}><small className="text-body-secondary"> {initialValues.unote.slice(0,150)} ... </small></p>
													
		                                                	<div className="d-flex justify-content-end">
		                                                    	<i className="fa-regular fa-trash-can mx-2" onClick={() => {removeUser(initialValues.uname)}} style={{color: '#fa295d' }}></i>
		                                            			<i className="fa-regular fa-pen-to-square mx-2 " onClick={() => {updatedUser(initialValues)}} style={{ color: '#8fa0bc' }} ></i>
		                                                	</div>
														</div>
													</div>
												</div>
											)
										})}
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
export default UserYup;




































//=================================================================================================================================================================================================================================================
// 									OLD without design
//=================================================================================================================================================================================================================================================
// return (
//   		<>
// 	    	<div style = {{ borderRadius: '10px',  boxSizing: 'border-box', margin: '5rem 0', }} >
// 				<div className="container" >
// 					<div className="row" style={{backgroundColor: 'cadetblue'}} >

// 						<div className="col d-flex justify-content-start align-items-flex-start" style={{ height: '550px', padding: '30px', }}>
// 							<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC' , borderRadius: '10px', backgroundColor: 'white', padding: '30px',  }} >
// 								<h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>
								
// 								<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" > Launch demo modal </button>
// 								<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// 			  						<div className="modal-dialog">
// 				   						<div className="modal-content">
// 				      						<div className="modal-header">
// 						        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Edit User Details </h1>
// 						        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// 				      						</div>
// 				      						<div className="modal-body" style={{ backgroundColor: '#BBE2EC', borderRadius: '10px',  }}>
// 												<Form method="POST" >
// 													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 														<label htmlFor = "edname" style={{  fontWeight: '600', fontSize: '22px' }} > Name </label>
// 														<input type="text" id="edname" name="edname" className="form-control" value={editUser.editedName} readOnly style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
// 													</div>
// 													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 														<label htmlFor = "edemail" style={{ fontWeight: '600', fontSize: '22px' }} > Email </label>
// 														<input type="email" id="edemail" name="editedEmail" onChange={onUpdateChange} value={editUser.editedEmail} className="form-control" placeholder={editUser.editedEmail} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
// 													</div>
// 													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
// 														<label htmlFor = "ednote" style={{ fontWeight: '600', fontSize: '22px' }} > Note </label>
// 														<textarea id="ednote" name="editedNote" rows='3' onChange={onUpdateChange} value={editUser.editedNote} className="form-control" placeholder={editUser.editedNote} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
// 													</div>
// 												</form>
// 				      						</div>
// 				      						<div className="modal-footer">
// 				      							<button type="button" onClick={clickUpdate} className="btn btn-light btn-outline-success mx-2" > Update </button>
// 				      							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" >Close</button>
// 				      						</div>
// 			   							</div>
// 			   						</div>
// 			   					</div>

// 								<form onSubmit={formik.handleSubmit}>
// 									<label htmlFor="uname"> Name </label>
// 									<input type="text" id="uname" name="uname" onChange={formik.handleChange} value={formik.values.uname} placeholder=" Enter Name " className="form-control" />
// 									<p style={{ color: 'red' }}> { formik.errors.uname && formik.touched.uname && formik.errors.uname } </p>

// 									<label htmlFor="uemail" style={{ margin: '1rem 0rem 0px', }} > Email </label>
// 									<input type="email" id="uemail" name="uemail" onChange={formik.handleChange} value={formik.values.uemail} placeholder=" Enter Email " className="form-control" />
// 									<p style={{ color: 'red' }}> { formik.errors.uemail && formik.touched.uemail && formik.errors.uemail } </p>

// 									<label htmlFor="unote" style={{ margin: '1rem 0rem 0px', }} > Note </label>
// 									<textarea id="unote" name="unote" rows='2' onChange={formik.handleChange} value={formik.values.unote} placeholder=" Enter Note " className="form-control" />
// 									<p style={{ color: 'red' }}> { formik.errors.unote && formik.touched.unote && formik.errors.unote } </p>

// 									<div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
// 										<button type="submit" className="btn btn-light btn-outline-success" > Add USER </button>
// 									</div>
// 								</form>
// 							</div>
// 						</div>

// 						<div className="col d-flex justify-content-end align-items-flex-start" style = {{  padding: '30px', }}  >
// 							<div style = {{  textAlign: 'center', width: '800px' , border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC' , borderRadius: '10px', backgroundColor: 'white', padding: '30px' }} >                      
// 								<h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>
								
// 								<div className="row my-2" style={{ padding:'0 20px' }}  >
// 									<h2>{inUsers.length === 0 && 'No Users'}</h2>
// 									{inUsers.map((initialValues) => {
// 										return(
//                                             <div key={initialValues.key} className="col-md-6 my-4">
// 												<div className="card" >
// 													<div className="card-body d-flex flex-column" style={{ textAlign: 'left' }}  >
// 														<h5 className="card-title"> {initialValues.uname}</h5>
//                                                         <p className="card-text"> {initialValues.key} </p>
// 														<p className="card-text"> {initialValues.uemail} </p>
// 														<p className="card-text" style={{ height: '5rem' }}><small className="text-body-secondary"> {initialValues.unote.slice(0,150)} ... </small></p>
												
// 	                                                	<div className="d-flex justify-content-end">
// 	                                                    	<i className="fa-regular fa-trash-can mx-2" onClick={() => {removeUser(initialValues.uname)}} style={{color: '#fa295d' }}></i>
// 	                                            			<i className="fa-regular fa-pen-to-square mx-2 " onClick={() => {updatedUser(initialValues)}} style={{ color: '#8fa0bc' }} ></i>
// 	                                                	</div>
// 													</div>
// 												</div>
// 											</div>
// 										)
// 									})}
// 								</div>

// 							</div>
// 						</div>

// 					</div>
// 				</div>
// 			</div>
// 		</>
//   	);
// }