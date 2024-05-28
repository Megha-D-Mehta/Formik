import React, { useState, useRef } from 'react'
import * as Yup from 'yup';

import FC from './FC';

function State(props)
{
	const initialValues = { uname: '', uemail: '', unote: '' };

	const userdetails = [];
	const [inUsers,setInUsers] = useState(userdetails);
	const [keyValue,setKeyValue] = useState(1);

	const [editUser,setEditUSer] = useState({ editedName: '', editedEmail: '', editedNote: '' });

	const [errEmail,setErrEmail] = useState(null);
	const [errNote,setErrNote] = useState(null);

	const ref = useRef('');
	const refClose = useRef('');

	const validationSchema = Yup.object({
		uname: Yup.string().min(2,'Enter Proper Name!').required('Required!'),
		uemail: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Enter Valid Email').required('Required!'),
		unote: Yup.string().required('Required!').min(10,'Enter Note of Minimum Length 10'),
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

		if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail) || editedNote.length < 10)
		{
			if(editedEmail === '')
			{
				setErrEmail('Required!');
			}
			else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedEmail))
			{
				setErrEmail('Enter Valid Email!');
			}
			if(editedNote === '')
			{
				setErrNote('Required!');
			}
			if(editedNote.length < 10)
			{
				setErrNote('Enter Note of Minimum Length 10!');
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

		// setEditUSer({ editedName, editedEmail, editedNote });
		// modifyUsers(editedName, editedEmail, editedNote);
		// refClose.current.click();
	}

	const onUpdateChange = (e) => {
		setEditUSer({ ...editUser, [e.target.name]: e.target.value });
	}


  	return(
  		<FC.Provider value={{ initialValues, validationSchema, inUsers, setInUsers,keyValue, setKeyValue, insertUser, removeUser, modifyUsers, editUser, setEditUSer, ref, refClose, updatedUser, clickUpdate, onUpdateChange, errEmail, setErrEmail, errNote, setErrNote }}>
  			{props.children}
  		</FC.Provider>
  	);
}
export default State;
