import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { Formik, Form, Field } from 'formik';


import FC from './FC';

function RenderDetails()
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

	const FContext = useContext(FC);
  	
  	 
  	const { initialValues, inUsers, removeUser, editUser, ref, refClose, updatedUser, clickUpdate, onUpdateChange, errEmail, errNote } = FContext;

  	return(
        <Formik initialValues={initialValues} >
			<div className="card p-4 my-5" style={{ width: '100%' }} >

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
	                					<p><small style={{ color: 'red' }} > { errEmail } </small></p>
									</div>
									<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
										<label htmlFor = "ednote" style={{ fontWeight: '600', fontSize: '22px' }} > Note </label>
										<Field  as="textarea" id="ednote" name="editedNote" rows='3' onChange={onUpdateChange} value={editUser.editedNote} className="form-control" placeholder={editUser.editedNote} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
										<p><small style={{ color: 'red' }} > { errNote } </small></p>
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

			    <h1 className="text-center " style={{ marginBottom: '2rem', padding: '0 60px' }} > User Details  </h1>

			    <div className="row ">
					<div className="col-md-1 mb-3" style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }} >
						<p style={{ fontWeight: 'bold', borderRadius: '10px', fontSize: '22px' }} >Options</p>
					</div>
					<div className="col-md mb-3" style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }} >
						<h4>Name</h4>
					</div>
					<div className="col-md mb-3" style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }} >
						<h4>Email</h4>
					</div>
					<div className="col-md mb-3" style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }} >
						<h4>Note</h4>
					</div>
			    </div>
			    
			    	<h2 className="text-center" >{inUsers.length === 0 && 'No Users'}</h2>
			    	{inUsers.map((initialValues) => {
			    		return(
			    			<div className="row " key={initialValues.key} >

			    				<div className="col-md-1 mb-2 " style={{ borderBottom: '1px solid #ccc', textAlign: 'left',}} >
									<div className="d-flex justify-content-center">
					                	<i className="fa-regular fa-trash-can mx-2 my-2" onClick={() => {removeUser(initialValues.uname)}} style={{color: '#fa295d' }}></i>
					        			<i className="fa-regular fa-pen-to-square mx-2 my-2 " onClick={() => {updatedUser(initialValues)}} style={{ color: '#8fa0bc' }} ></i>
					            	</div>
								</div>

								<div className="col-md mb-2" style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }} >
									<p> {initialValues.uname} </p>
								</div>

								<div className="col-md mb-2" style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }} >
									<p> {initialValues.uemail} </p>
								</div>

								<div className="col-md mb-2" style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }} >
									<p> {initialValues.unote.slice(0,100)} ... </p>
								</div>
			    			</div>
			    		)
			    	})}

			</div>
  		</Formik>
  	);

}




export default RenderDetails;