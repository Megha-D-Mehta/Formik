import React, { useState } from 'react'

import UserContext from './UserContext';


function UserState(props)
{
	const userInitials = [];
		// {
		// 	"name": "a",
		// 	"email": "anmd.dds@sddd.dsd",
		// 	"note": "dshvghsvdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// },
		// {
		// 	"name": "b",
		// 	"email": "as@sd.dsd",
		// 	"note": "dshvghknkdnks mkd ks ndfm sodfsm osndpfnsdfo svdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// },
		// {
		// 	"name": "c",
		// 	"email": "as@sd.dsd",
		// 	"note": "dshvghknkdnks mkd ks ndfm sodfsm osndpfnsdfo svdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// },
		// {
		// 	"name": "d",
		// 	"email": "as@sd.dsd",
		// 	"note": "dshvghknkdnks mkd ks ndfm sodfsm osndpfnsdfo svdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// },
		// {
		// 	"name": "e",
		// 	"email": "as@sd.dsd",
		// 	"note": "dshvghknkdnks mkd ks ndfm sodfsm osndpfnsdfo svdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// },
		// {
		// 	"name": "f",
		// 	"email": "as@sd.dsd",
		// 	"note": "dshvghknkdnks mkd ks ndfm sodfsm osndpfnsdfo svdfmncjkbdjf kjfvbdfv vnsbdcijsbdc sjcbsdi dc vjvjnjfbdsif"
		// }
	// ];

	const [users, setUsers] = useState(userInitials);

	//Add User
	const addUser = (user) => {
		console.log("Adding User details of " + user.name);
		setUsers(users.concat(user));
	}


	//Delete User
	const deleteUser = (name) => {
		console.log("Deleting User : " + name);
		const newUsers = users.filter((user) => {return user.name !== name})
		setUsers(newUsers);
	}

	//Edit User
	// const editUser = (name,email,note) => {
	// 	console.log("Editing User");

	// 	for(let i = 0; i < users.length; i++)
	// 	{
	// 		const element = users[i];
	// 		if(element.name === name)
	// 		{
	// 			users[i].email = email;
	// 			users[i].note = note;
	// 		}
	// 		break;
	// 	}
	// 	setUsers(users);


	// 	const editedUsers = users.map((user) => 
	// 		user.name === name ? { ...user, email, note } : user
	// 		);

	// 	setUsers(editedUsers);
	// }

	const editUser = (name,email,note) => {
		console.log("Editing User");

		let editedUsers = JSON.parse(JSON.stringify(users))
		for(let i = 0; i < editedUsers.length; i++)
		{
			const element = editedUsers[i];
			if(element.name === name)
			{
				editedUsers[i].email = email;
				editedUsers[i].note = note;
				break;
			}
		}
		setUsers(editedUsers);
	}



	return(
		<UserContext.Provider value={{ users, setUsers, addUser, deleteUser, editUser }} >
		{/*<UserContext.Provider value={{ addUser, deleteUser, editUser }} >*/}
			{props.children}
		</UserContext.Provider>
	)
}
export default UserState;
