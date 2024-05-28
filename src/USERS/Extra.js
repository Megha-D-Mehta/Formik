// .nav /* left */
// {
//     width: 20%;
//     height: 100%;
//     flex: 20%;
//     background-color: cadetblue;
//     padding: 4vw;
//     float: left;
//     font-size: 1rem;
//     box-sizing: border-box;
// }


import React, { useState, } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


function Extra() 
{

    const initialValues = { uname: '', uemail: '', unote: '' };

    const userdetails = [];
    const [inUsers,setInUsers] = useState(userdetails);
    const [keyValue,setKeyValue] = useState(1);


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

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });


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

    return (
        <div style = {{ margin: '5rem 0' }} >
            <div className="d-flex flex-wrap-wrap">
                <div className="row">
                    
                    <div className="col">
                        <div className="d-flex flex-wrap "  >
                            <div  style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', backgroundColor: 'white', float: 'center', padding: '4vw', boxSizing: 'border-box', marginLeft: '0.5rem' }} >
                           
                                <h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>

                               <form onSubmit={formik.handleSubmit}>
                                    <label htmlFor="uname"> Name </label>
                                    <input type="text" id="uname" name="uname" onChange={formik.handleChange} value={formik.values.uname} placeholder=" Enter Name " className="form-control" />
                                    <p style={{ color: 'red' }}> { formik.errors.uname && formik.touched.uname && formik.errors.uname } </p>

                                    <label htmlFor="uemail" style={{ margin: '1rem 0rem 0px', }} > Email </label>
                                    <input type="email" id="uemail" name="uemail" onChange={formik.handleChange} value={formik.values.uemail} placeholder=" Enter Email " className="form-control" />
                                    <p style={{ color: 'red' }}> { formik.errors.uemail && formik.touched.uemail && formik.errors.uemail } </p>

                                    <label htmlFor="unote" style={{ margin: '1rem 0rem 0px', }} > Note </label>
                                    <textarea id="unote" name="unote" rows='2' onChange={formik.handleChange} value={formik.values.unote} placeholder=" Enter Note " className="form-control" />
                                    <p style={{ color: 'red' }}> { formik.errors.unote && formik.touched.unote && formik.errors.unote } </p>

                                    <div className="row d-grid justify-content-center" style={{ marginTop: '2rem' }} >
                                        <button type="submit" className="btn btn-light btn-outline-success" > Add USER </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="d-flex flex-direction-row">
                            <div style = {{  border: '1px solid', boxShadow: '5px 5px 5px #BBE2EC', borderRadius: '10px', float: 'center', backgroundColor: 'white', padding: '4vw', boxSizing: 'border-box', textAlign: 'center', width: '800px' }} >
                            
                                {/*width: '20%', height: '100%', flex: '20%', backgroundColor: 'blueviolet', padding: '4vw', float: 'left', fontSize: '1rem', boxSizing: 'border-box', */}   
                                <h1 style={{ marginBottom: '1.56rem' }} > User Details with Yup </h1>
                                    
                                <div className="row my-2" style={{ padding:'0 20px' }} >
                                    <h2>{inUsers.length === 0 && 'No Users'}</h2>
                                    {inUsers.map((initialValues) => {
                                        return(
                                            <div key={initialValues.key} className="col-md-6 my-4">
                                                <div className="card" >
                                                    <div className="card-body d-flex flex-column" style={{ textAlign: 'left' }}  >
                                                        <h5 className="card-title"> {initialValues.uname}</h5>
                                                        <p className="card-text"> {initialValues.key} </p>
                                                        <p className="card-text"> {initialValues.uemail} </p>
                                                        <p className="card-text" style={{ height: '5rem' }}><small className="text-body-secondary"> {initialValues.unote.slice(0,150)} ... </small></p>
                                                
                                                        <div className="d-flex justify-content-end">
                                                            <i className="fa-regular fa-trash-can mx-2" onClick={() => {removeUser(initialValues.uname)}} style={{color: '#fa295d' }}></i>
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
    );
}
export default Extra;