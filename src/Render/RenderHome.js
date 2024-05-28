import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from 'formik';

import FC from './FC';
 // eslint-disable-next-line
import RenderDetails from './RenderDetails';



function RenderHome()
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
  	const { initialValues, validationSchema, keyValue, setKeyValue, insertUser, } = FContext;

	// const initialValues = { uname: '', uemail: '', unote: '' };

  	// const validationSchema = Yup.object({
	// 	uname: Yup.string().min(2,'Enter Proper Name!').required('Required!'),
	// 	uemail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Required!'),
	// 	unote: Yup.string().required('Required!').min(10,'Enter Note of Minimum Length 10'),
	// });

	const onSubmit = (values, { resetForm }) => {
		insertUser(values);
		// resetForm(); //will reset value of form
		setKeyValue(keyValue + 1);
		// navigate("/RenderDetails");


    	console.log('');
    	console.log(' => Key : ' + keyValue);
    	console.log(' => Name : ' + values.uname);
    	console.log(' => Email : ' + values.uemail);
    	console.log(' => Note : ' + values.unote);
    	console.log('');
  	};

  	return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        	<div style = {{ margin: '5rem 0' }} >
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
											<button type="submit" className="btn btn-light btn-outline-success" > Add USER </button>
										</div>
{/*
										<div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
											<button type="submit" onclick={() => { navigate("/RenderDetails")}} className="btn btn-light btn-outline-success" > Add USER </button>
										</div>
*/}

									</Form>

					    		</div>
					    	</div>
			            </div>
			        </div>
			    </div>
			</div>
  		</Formik>
  	);

}

export default RenderHome;