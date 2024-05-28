import React, { useContext } from 'react';

// import userContext from './userContext';

function UserDetails(props)
{
	const {usr} = props;

	return(
		<div className="row my-3">
			<div className="col-md-4 mb-3">
				<h1 style={{ margin: '2rem 0' }} > Add User Details </h1>

			
			</div>
		</div>


	)
}

export default UserDetails;

// {user.map((usr) => {
// 	return usr.name;
// })}

// <div key={note._id} className="col">
// 	<div className="card" style={{width: '25rem' }} >
// 	  	<div className="card-body">
// 	  	</div>
// 	</div>
// </div>

/*
	{usr.name}
				{usr.email}
				{usr.note}

				<div className="card" style={{width: '25rem' }} >
				  	<div className="card-body">
				  		<h3 className="card-title" >{usr.name}</h3>
				  		<p className="card-text">{usr.email}</p>
				  		<p className="card-text">{usr.note}</p>
				  	</div>
				</div>
*/