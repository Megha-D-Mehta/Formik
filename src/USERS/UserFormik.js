
import React, { useState, useEffect, useRef, } from 'react';

import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik';


const defaultValue = { uname: '', uemail: '', unote: '' };

const validation = (values) => {
	const errors = {};
	
	if(!values.uname)
	{
		errors.uname = 'Required!';
	}
	else if(values.uname.length < 3)
	{
		errors.uname = 'Enter Proper Name!';
	}
	if(!values.uemail)
	{
		errors.uemail = 'Required!';
	}
	else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.uemail))
	{
		errors.uemail = 'Enter Valid Email';
	}
	if(!values.unote)
	{
		errors.unote = 'Required!';
	}
	else if(values.unote.length < 10)
	{
		errors.unote = 'Enter Note of Minimum Length 10';
	}

	return errors;

}

// const onSubmit = (values) => {
// 	console.log(" Name : " + values.uname);
// 	console.log(" Email : " + values.uemail);
// 	console.log(" Note : " + values.unote);
// }

function UserFormik()
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

	const onSubmit = (values) => {
		insertUser(values);
		console.log(" Name : " + values.uname);
		console.log(" Email : " + values.uemail);
		console.log(" Note : " + values.unote);
	}

	// const userInitials = [];
	const userdetails = [];

	// const [users, setUsers] = useState(userInitials);
	const [inUsers,setInUsers] = useState(userdetails);


	const ref = useRef('');
	const refClose = useRef('');

	//ADD USER
	const insertUser = (defaultValue) =>
	{
		console.log(" => Added User : " + defaultValue.uname);
		// setUsers(users.concat(user));
		setInUsers(inUsers.concat(defaultValue));
	}

	//DELETE USER
	const removeUser = (userName) => {
		console.log(" => Deleted User : " + userName);
		const restUser = inUsers.filter((defaultValue) => {return defaultValue.uname !== userName})
		setInUsers(restUser);
	}

	const modifyUsers = (ename, eemail, enote) => {
		console.log("");
		console.log(" => Updated User = (ename,eemail,enote) ");
		console.log(" => modifyUsers ename : " + ename);
		console.log(" => modifyUsers eemail : " + eemail);
		console.log(" => modifyUsers eemail : " + enote);
		console.log("");
	    console.log("");

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
	    setInUsers(updatedUsers);
	};


	const [editUser,setEditUSer] = useState({ editedName: '', editedEmail: '', editedNote: '' });

	const updatedUser = (currentUser) => {
		// console.log("");
		// console.log("updatedUser = (currentUser)");
		// console.log(" => updatedUser(currentUser) name  : " + currentUser.uname);
		// console.log(" => updatedUser(currentUser) email  : " + currentUser.uemail);
		// console.log(" => updatedUser(currentUser) note  : " + currentUser.unote);
		// console.log("");

		setEditUSer({ editedName: currentUser.uname , editedEmail: currentUser.uemail, editedNote: currentUser.unote  });
		ref.current.click();
	}

	const [errEmail,setErrEmail] = useState(null);
	const [errNote,setErrNote] = useState(null);

	const clickUpdate = (e) => {
		// console.log("clickUpdate = (e)");
		// console.log(" => clickUpdate = (values) uname : " + defaultValue.uname);
		// console.log(" => clickUpdate = (values) uemail : " + defaultValue.uemail);
		// console.log(" => clickUpdate = (values) unote : " + defaultValue.unote);
		// console.log("");
		// console.log(" => clickUpdate = (modifyUsers) editedName : " + editUser.editedName);
		// console.log(" => clickUpdate = (modifyUsers) editedEmail : " + editUser.editedEmail);
		// console.log(" => clickUpdate = (modifyUsers) editedNote : " + editUser.editedNote);
		// console.log("");

		e.preventDefault();
		const { editedName, editedEmail, editedNote } = editUser;
		// console.log("");
		// console.log("Updated Name: ", editedName);
		// console.log("Updated Email: ", editedEmail);
		// console.log("Updated Note: ", editedNote);
		// console.log("");

		if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail) || editedNote.length < 10)
		{
			if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail))
			{
				setErrEmail('Enter Valid Email');
			}
			if(editedNote.length < 10)
			{
				setErrNote('Enter Note of Minimum Length 10');
			}
		}
		else
		{
			setEditUSer({ editedName, editedEmail, editedNote });
			modifyUsers(editedName, editedEmail, editedNote);
			setErrEmail(null);
			setErrNote(null);
			refClose.current.click();
		}
	}

	const onUpdateChange = (e) => {
		setEditUSer({ ...editUser, [e.target.name]: e.target.value });
	}



	return(
		<div style = {{ borderRadius: '10px',  boxSizing: 'border-box', margin: '5rem 0', backgroundColor:'violet' }} >
			<div className="container d-flex justify-content-center align-items-center"  style={{  width: '100%', borderRadius: '10px', backgroundColor: '#CDFADB'  }} >
				<div className="card p-4 my-5" style={{  width: '1000px',  borderRadius: '10px', textAlign: 'center', backgroundColor: '#BBE2EC' }} >
					<h1 style={{ marginBottom: '1.56rem' }} > User Details with Formik </h1>

					<Formik initialValues={defaultValue} validate={validation} onSubmit={onSubmit} >
						{({ values, 
							errors,
							touched,
							handleChange,
							handleBlur,
							handleReset,
							handleSubmit,
							isSubmitting }) => (

							<>

								<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" > Launch demo modal </button>
								<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  						<div className="modal-dialog">
				   						<div className="modal-content">
				      						<div className="modal-header">
						        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Edit User Details </h1>
						        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      						</div>
				      						<div className="modal-body" style={{ backgroundColor: '#BBE2EC', borderRadius: '10px',  }}>
												<form method="POST" >
													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
														<label htmlFor = "edname" style={{  fontWeight: '600', fontSize: '22px' }} > Name </label>
														<input type="text" id="edname" name="edname" className="form-control" value={editUser.editedName} readOnly style={{ fontWeight: '600', fontSize: '22px', width: '800px', }} />
													</div>
													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
														<label htmlFor = "edemail" style={{ fontWeight: '600', fontSize: '22px' }} > Email </label>
														<input type="email" id="edemail" name="editedEmail" onChange={onUpdateChange} value={editUser.editedEmail} className="form-control" placeholder={editUser.editedEmail} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
														<p style={{ color: 'red' }}> { errEmail } </p>
													</div>
													<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }} >
														<label htmlFor = "ednote" style={{ fontWeight: '600', fontSize: '22px' }} > Note </label>
														<textarea id="ednote" name="editedNote" rows='3' onChange={onUpdateChange} value={editUser.editedNote} className="form-control" placeholder={editUser.editedNote} style={{ fontWeight: '600', fontSize: '22px', width: '800px' }} />
														<p style={{ color: 'red' }}> { errNote } </p>
													</div>
												</form>
				      						</div>
				      						<div className="modal-footer">
				      							<button type="button" onClick={clickUpdate} className="btn btn-light btn-outline-success mx-2" > Update </button>
				      							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" >Close</button>
				      						</div>
			   							</div>
			   						</div>
			   					</div>
								<form method='POST' onSubmit={handleSubmit} style={{ backgroundColor: '#FFD0EC', borderRadius: '10px', textAlign: 'left', }}  >

									<div className="row" style={{ margin: '2rem 40px 1rem 40px', fontWeight: '600', fontSize: '22px', width: '800px', }} > {/*top right bottom left*/}
										<label htmlFor="uname"> Name </label>
										<input type="text" id="uname" name="uname" value={values.uname} onChange={handleChange} className="form-control" placeholder=" Enter Name "  />
										<p style={{ color: 'red' }}> { errors.uname && touched.uname && errors.uname } </p>
									</div>
									<div className="row" style={{ margin: '1rem 40px', fontWeight: '600', fontSize: '22px', width: '800px', }} >
										<label htmlFor="uemail"> Email </label>
										<input type="text" id="uemail" name="uemail" value={values.uemail} onChange={handleChange} className="form-control" placeholder=" Enter Email "  />
										<p style={{ color: 'red' }}> { errors.uemail && touched.uemail && errors.uemail } </p>
									</div>
									<div className="row" style={{ margin: '1rem 40px', fontWeight: '600', fontSize: '22px', width: '800px', }} >
										<label htmlFor="unote"> Note </label>
										<textarea id="unote" name="unote" rows='3' value={values.unote} onChange={handleChange} className="form-control" placeholder=" Enter Note "  />
										<p style={{ color: 'red' }}> { errors.unote && touched.unote && errors.unote } </p>
									</div>

									<div className="row d-grid justify-content-center" style={{ margin: '3rem 50px' }} >
										<button type="submit" className="btn btn-light btn-outline-success" style={{ fontWeight: '600', padding: '15px 30px', cursor: 'pointer', borderRadius: '10px', fontSize: '30px'  }}>
											Add USER
										</button>
									</div>
									
								</form>
							</>
						)}						
					</Formik>
					<div className="my-4" style={{  width: '950px', padding: '30px 0', borderRadius: '10px', textAlign: 'center', backgroundColor: '#FFD0EC' }} >
						<h1 style={{ margin: '2rem 0' }} > User Details </h1>
						<div className="row my-3" style={{ padding:'0 20px' }}  >
							<h2>{inUsers.length === 0 && 'No Users'}</h2>
							{inUsers.map((defaultValue) => {
								return(
									<div key={defaultValue.uname}  className="col-md-4 my-4">
										<div className="card" >
											<div className="card-body d-flex flex-column" style={{ textAlign: 'left' }}  >
											    <h5 className="card-title"> {defaultValue.uname} </h5>
											    <p className="card-text"> {defaultValue.uemail} </p>
												<p className="card-text" style={{ height: '5rem' }}><small className="text-body-secondary"> {defaultValue.unote} </small></p>

												<div className="d-flex justify-content-end">
													<i className="fa-regular fa-trash-can mx-2" onClick={() => {removeUser(defaultValue.uname)}} style={{color: '#fa295d' }}></i>
													<i className="fa-regular fa-pen-to-square mx-2 " onClick={() => {updatedUser(defaultValue)}} style={{ color: '#8fa0bc' }} ></i>
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
	)
}

export default UserFormik;



    // //EDIT USER
    // //const editUser = (name,email,note) => {
    // const modifyUsers = (name,email,note) => {
    //     console.log(" => Modified User : " + name);

    //     let modiefiedUser = JSON.parse(JSON.stringify(inUsers));
    //     for(let n = 0; n < modiefiedUser.length; n++)
    //     {
    //      const fields = modiefiedUser[n];
    //      if(fields.uname === name)
    //      {
    //          modiefiedUser[n].email = email;
    //          modiefiedUser[n].note = note;
    //          break;
    //      }
    //     }
    //     setInUsers(modiefiedUser);
    // }

    // // const [euser,seteUser] = useState({ ename: '', eemail: '', enote: '' });
    // const [editUser,setEditUSer] = useState({ editedName: '', editedEmail: '', editedNote: '' });

    // //UPDATE USER 
    // const updatedUser = (curUser) => {
    //     console.log(" => Updated User : " + curUser.uname);
    //     setEditUSer({ editedName: curUser.uname , editedEmail: curUser.uemail , editedNote: curUser.unote });
    //     ref.current.click();
    // }

    // // Handle Update
    // const clickUpdate = (e) => {
    //     console.log(" => Handlling Update of User : " + editUser.editedName);
    //     e.preventDefault();
    //     setEditUSer({ editedName: defaultValue.uname, editedEmail: defaultValue.uemail, editedNote: defaultValue.unote });
    //     modifyUsers(editUser.uname, editUser.uemail, editUser.unote);
        
    //     refClose.current.click();
    // }

    // const onUpdateChange = (e) => {
    //     setEditUSer({ ...editUser, [e.target.name]: e.target.value });
    // }