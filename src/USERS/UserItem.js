import React, { useContext } from 'react';

import UserContext from './UserContext';

function UserItem(props)
{
	const context = useContext(UserContext);
	const {user, updateUser} = props;
	const {deleteUser} = context;

	return(

		<>
			<h5 className="card-title"> {user.name} </h5>
			<p className="card-text"> {user.email} </p>
			<p className="card-text" style={{ height: '5rem' }}  ><small className="text-body-secondary"> {user.note} </small></p>


			<div className="d-flex justify-content-end">
				<i className="fa-regular fa-trash-can mx-2" onClick={() => {deleteUser(user.name)}} style={{color: '#fa295d' }}></i>
				<i className="fa-regular fa-pen-to-square mx-2"  onClick={() => {updateUser(user)}}  style={{ color: '#8fa0bc' }} ></i>
			</div>
		</>
	);
}

export default UserItem;
