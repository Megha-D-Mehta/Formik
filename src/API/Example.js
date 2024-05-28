
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

function Example(props) {
    const initialValues = { crrMobile: '' };
    const [inrecords, setInRecords] = useState([]);

    const onSubmit = (values, { resetForm }) => {
        console.log(' Mobile No : ' + values.crrMobile);
        insertCourier(values);
    }

    const insertCourier = (initialValues) => {
        console.log(" Added User : " + initialValues.crrName);
        setInRecords(inrecords.concat(initialValues));
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <div style={{ margin: '5rem 0' }}>
                
                <Form>
                    <div className="row" style={{ borderBottom: '1px solid #ccc', marginBottom: '1.56rem' }}>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="crrMobile"> Mobile No <span className="text-danger">*</span> </label>
                            <Field type="tel" id="crrMobile" name="crrMobile" maxLength="15" placeholder="Enter Mobile No" className="form-control" />
                        </div>
                    </div>
                    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
                        <div className="col-md-3 mb-3">
                            <button type="submit" className="btn btn-light btn-outline-success mx-2"> Add USER </button>
                        </div>
                    </div>
                </Form>
            
            </div>
        </Formik>
    );
}

export default Example;

