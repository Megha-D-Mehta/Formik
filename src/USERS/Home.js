
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// eslint-disable-next-line
import HomeDetails from './HomeDetails';


const initialValues = { uname: '', uemail: '', unote: '' };

function Home() 
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

	const userdetails = [];
	const [inUsers,setInUsers] = useState(userdetails);
	const [keyValue,setKeyValue] = useState(1);
	const [hdUser,setHdUser] = useState({ Key: '', Name: '', Email: '', Note: '' });


	const validationSchema = Yup.object({
		uname: Yup.string().min(2,'Enter Proper Name!').required('Required!'),
		uemail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Required!'),
		unote: Yup.string().required('Required!').min(10,'Enter Note of Minimum Length 10'),
	});

	const onSubmit = (values) => {
		insertUser(values);
		setKeyValue(keyValue + 1);
		// navigate("/HomeDetails");

    	console.log('');
    	console.log(' => Key : ' + keyValue);
    	console.log(' => Name : ' + values.uname);
    	console.log(' => Email : ' + values.uemail);
    	console.log(' => Note : ' + values.unote);
    	console.log('');

    	setHdUser({ Key: keyValue, Name: values.uname, Email: values.uemail, Note: values.unote });    	
  	};


	const insertUser = (initialValues,usr) =>
  	{
		console.log(" Added User : " + initialValues.uname);
		// setInUsers(inUsers.concat(initialValues));
		setInUsers([ ...inUsers, { ...initialValues, key: keyValue }]);
 	}

  	
	// eslint-disable-next-line
	const location = useLocation();
	console.log("  =====> hdUser(Home) : ");

	const Name = hdUser.Name;
	const Email = hdUser.Email;
	const Note = hdUser.Note;
	const Key = hdUser.Key;

	console.log(' => Name : ' + Name);
	console.log(' => Email : ' + Email);
	console.log(' => Note : ' + Note);
	console.log(' => Key : ' + Key);

	const data = {
		dName: hdUser.Name,
		dEmail: hdUser.Email,
		dNote: hdUser.Note,
		dKey: hdUser.Key,
	};
	

	return(
        <div style = {{ margin: '5rem 0' }} >
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
			    <div className="d-flex flex-wrap-wrap">
			     	
			     	<div className="row">

			            <div className="col">
			            	<div className="d-flex flex-wrap " >
					    		<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
			                        
			                        <h1 style={{ marginBottom: '1.56rem', padding: '0 60px' }} > User Details  </h1>

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
											<button type="submit" className="btn btn-light btn-outline-success" > 
												Add USER 
											</button>

											<Link type="submit" className="btn btn-light btn-outline-success" to="/HomeDetails" state={data} > USER </Link>
											{/*<Link type="submit" className="btn btn-light btn-outline-success" to={{ pathname: "/HomeDetails", state: { Name, Email, Note, Key, length } }} >  USER </Link>*/}
										</div>

									</Form>

					    		</div>
					    	</div>
			            </div>
			        </div>
  						{/*<HomeDetails Name={Name} Email={Email}  Note={Note} length={length} />*/}
			    </div>
  			</Formik>
  		</div>
  	)
}

export default Home;













































//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================
//=================================================================================================================================================================================================================================================

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
// // import { useFormik } from 'formik';

// import { Formik, Form, Field, ErrorMessage } from 'formik';

// import Users from './Users'

// import * as Yup from 'yup';

// function Home() 
// {
// 	window.localStorage.getItem("login");
// 	const navigate = useNavigate();
// 	useEffect(() => 
// 	{
// 		if(window.localStorage.getItem("login") === 'false')
// 		{
// 			navigate("/");
// 		}
// 	},[navigate])


// 	const initialValues = { uname: '', uemail: '', unote: '' };

// 	const userdetails = [];
// 	const [inUsers,setInUsers] = useState(userdetails);
// 	const [keyValue,setKeyValue] = useState(1);

// 	// const [editUser,setEditUSer] = useState({ editedName: '', editedEmail: '', editedNote: '' });

// 	// const [errEmail,setErrEmail] = useState(null);
// 	// const [errNote,setErrNote] = useState(null);

// 	// const ref = useRef('');
// 	// const refClose = useRef('');

// 	const validationSchema = Yup.object({
// 		uname: Yup.string().min(2,'Enter Proper Name!').required('Required!'),
// 		uemail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Required!'),
// 		unote: Yup.string().required('Required!').min(10,'Enter Note of Minimum Length 10'),
// 	});

// 	const onSubmit = (values) => {
// 		insertUser(values);
// 		setKeyValue(keyValue + 1);
// 		navigate("/Users");

//     	console.log('');
//     	console.log(' => Key : ' + keyValue);
//     	console.log(' => Name : ' + values.uname);
//     	console.log(' => Email : ' + values.uemail);
//     	console.log(' => Note : ' + values.unote);
//     	console.log('');
//   	};


// 	const insertUser = (initialValues) => {
// 		console.log(" Added User : " + initialValues.uname);
// 		// setInUsers(inUsers.concat(initialValues));
// 		setInUsers([ ...inUsers, { ...initialValues, key: keyValue }]);
//   	}

//   	const removeUser = (name) => {
// 		console.log(" Deleted User : " + name);
// 		const restUser = inUsers.filter((initialValues) => { return initialValues.uname !== name })
// 		setInUsers(restUser);
//   	}

// 	const modifyUsers = (ename, eemail, enote) => {
// 		console.log(" Updated User : " + ename + '\n');

// 		 const updatedUsers = inUsers.map(user => {
// 	        if (user.uname === ename) {
// 	            return {
// 	                ...user,
// 	                uemail: eemail,
// 	                unote: enote
// 	            };
// 	        }
// 	        return user;
// 	    });
// 	    setInUsers(updatedUsers)
//   	}

//   	// const updatedUser = (currentUser) => {
// 	// 	setEditUSer({ editedName: currentUser.uname , editedEmail: currentUser.uemail, editedNote: currentUser.unote  });
// 	// 	ref.current.click();
// 	// }

// 	// const clickUpdate = (e) => {
// 	// 	e.preventDefault();
// 	// 	const { editedName, editedEmail, editedNote } = editUser;

// 	// 	if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail) || editedNote.length < 10)
// 	// 	{
// 	// 		if(editedEmail === '')
// 	// 		{
// 	// 			setErrEmail('Required!');
// 	// 		}
// 	// 		else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail))
// 	// 		{
// 	// 			setErrEmail('Enter Valid Email!');
// 	// 		}
// 	// 		if(editedNote === '')
// 	// 		{
// 	// 			setErrNote('Required!');
// 	// 		}
// 	// 		if(editedNote.length < 10)
// 	// 		{
// 	// 			setErrNote('Enter Note of Minimum Length 10!');
// 	// 		}
// 	// 	}
// 	// 	else
// 	// 	{
// 	// 		setEditUSer({ editedName, editedEmail, editedNote });
// 	// 		modifyUsers(editedName, editedEmail, editedNote);
// 	// 		setErrEmail(null);
// 	// 		setErrNote(null);
// 	// 		refClose.current.click();
// 	// 	}

// 	// 	// setEditUSer({ editedName, editedEmail, editedNote });
// 	// 	// modifyUsers(editedName, editedEmail, editedNote);
// 	// 	// refClose.current.click();
// 	// }

// 	// const onUpdateChange = (e) => {
// 	// 	setEditUSer({ ...editUser, [e.target.name]: e.target.value });
// 	// }

// 	return(
//         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
//         	<div style = {{ margin: '5rem 0' }} >
// 			    <div className="d-flex flex-wrap-wrap">
// 			     	<div className="row">			            
// 			            <div className="col">
// 			            	<div className="d-flex flex-wrap " >
// 					    		<div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
// 			                        <h1 style={{ marginBottom: '1.56rem', padding: '0 60px' }} > User Details  </h1>

// 					    			<Form>
// 										<label htmlFor="uname"> Name </label>
// 										<Field type="text" id="uname" name="uname" placeholder=" Enter Name " className="form-control" />
// 			                            <p><small style={{ color: 'red' }} ><ErrorMessage name="uname"/></small></p>

// 										<label htmlFor="uemail" style={{ margin: '1rem 0rem 0px', }} > Email </label>
// 										<Field type="email" id="uemail" name="uemail" placeholder=" Enter Email " className="form-control" />
// 			                            <p><small style={{ color: 'red' }} ><ErrorMessage name="uemail"/></small></p>

// 										<label htmlFor="unote" style={{ margin: '1rem 0rem 0px', }} > Note </label>
// 										<Field as="textarea" id="unote" name="unote" rows='2' placeholder=" Enter Note " className="form-control" />
// 										<p><small style={{ color: 'red' }} ><ErrorMessage name="unote" /></small></p>

// 										<div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
// 											<button type="submit" className="btn btn-light btn-outline-success" > Add USER </button>
// 										</div>
// 									{/*
// 										<div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
// 											<button type="submit" onclick={() => { navigate("/RenderDetails")}} className="btn btn-light btn-outline-success" > Add USER </button>
// 										</div>
// 									*/}

// 									</Form>

// 					    		</div>
// 					    	</div>
// 			            </div>

// 			            {/*<Users initialValues={initialValues} inUsers={inUsers} removeUser={removeUser} editUser={editUser} updatedUser={updatedUser} clickUpdate={clickUpdate} onUpdateChange={onUpdateChange} errEmail={errEmail} errNo={errNote} />*/}
// 			            <Users initialValues={initialValues} inUsers={inUsers} removeUser={removeUser} modifyUsers={modifyUsers} />

// 			        </div>
// 			    </div>
// 			</div>
//   		</Formik>

// 	);
// }  	
// export default Home;

			
