// OriginalGetCourier


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function GetCourier()
{
	window.localStorage.getItem("login");
	const tokenId = window.localStorage.getItem("token");

	const navigate = useNavigate();
	useEffect(() => 
	{
		if(window.localStorage.getItem("login") === 'false')
		{
			console.log(" Please Login! ");
			navigate("/");
		}
	},[navigate])

	// const tokenId = token;

	const [getRecords, setGetRecords] = useState([]);
	const [courierID,setCourierID] = useState('');
	const [courierName,setCourierName] = useState('');
	const [status,setStatus] = useState();
	const [activity,setActivity] = useState('');
	const [pgSize,setPgSize] = useState(5);	
	const [pgNo,setPgNo] = useState(1);

	const [srchval,setSrchval] = useState('');

	const [totalResults,setTotalResults] = useState(0);
	//original
	const totalPages = [];
	for (let i = 1; i <= Math.ceil(totalResults / pgSize); i++)
	{
		totalPages.push(
			<>
				<button key={i} type="button" disabled={(totalResults === 0) || (i === pgNo)} className="btn btn-light btn-outline-danger" onClick={() => { setPgNo(i); }} > {i} </button>
			</>
		);
	}

	const [sorted,setSorted] = useState('sort'); //button
	const [fieldName,setFieldName] = useState('');   // fieldName

	// eslint-disable-next-line
	const [sortVal,setSortVal] = useState(''); //button

	console.log( "\n pgSize => " + pgSize + "\n pgNo => " + pgNo + "\n srchval => " + srchval + "\n totalResults => " + totalResults + "\n");

	const handleSorting = (fildName) => {

	    setFieldName(fildName);
	    let newSortType = '';
	    if (fildName === fieldName) 
	    {
	    	if (sorted === 'sort') 
		    {
		        setSorted('sort-up');
		        newSortType = 'ASC';
		    } 
		    else if (sorted === 'sort-up')
		    {
		        setSorted('sort-down');
		        newSortType = 'DESC';
		    } 
		    else if (sorted === 'sort-down') 
		    {
		        setSorted('sort');
		        newSortType = 'ASC';
		        fildName = 'CourierName';
		    }
	    }
	    else
	    {
	    	setSorted('sort-up');
		    newSortType = 'ASC';
	    }

	    const sortVal = fildName + ' ' + newSortType;
	    console.log(sortVal);
	    setSortVal(sortVal);
	    GetCourierList(pgSize, pgNo, srchval, sortVal);
	}

	const refDel = useRef('');
	const refStatus = useRef('');
	const refClose = useRef('');


	useEffect(() => {
		GetCourierList(pgSize,pgNo,srchval);
		// eslint-disable-next-line
	},[pgSize,pgNo])


	const GetCourierList = (pgSize=5,pgNo=1,srchval='',sortVal='') => {

		const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierList';

		const token = tokenId;

		const data = {
		  	CurrentPage: pgNo,
			PageSize: pgSize,
			Search: srchval === undefined ? '' : srchval,
			Sorting: sortVal,
 			Status: -1,
			CompanyIDEncrypted: "lrQ+Ao+IEjI=",
			BranchIDEncrypted: "lrQ+Ao+IEjI="
		};
		// console.log( "\n INSIDE [GetCourierList] Search => " + data.Search + "\n\n");

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
		.then((response) => {
			if(response.Unauthorized || response.status === 401)
			{
				console.log(" \t Status => TOKEN IS EXPIRED!");
				setTotalResults(0);
				navigate("/");
			}
			return response.json();
		})
		.then(data => {
			const updatedRecords = data.CourierList.map(courier => ({
                ...courier,
                isActive: courier.IsActive,
                color: courier.IsActive ? '#006400' : '#FF0000'
            }));
			setGetRecords(updatedRecords);
			setTotalResults(data.TotalRecordCount);
			// setGetRecords(data.CourierList);
		})
		.catch(error => {
			console.log(" => ERROR in ['GetCourierList'] : " + error.message);
			setGetRecords([]);
		})
	}

	const courierDelete = (courierID) => {

		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierDelete';
		const token = tokenId;

		const data = { 
			CourierIDEncrypted: courierID,
			ModifiedByEncrypted: '' 
		};

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data),
		})
		.then((response) => {
			refDel.current.click();
			GetCourierList(pgSize,pgNo);
	    	console.log(" => Deleted Courier of => " + courierName);
		})
		.catch(error => console.log(" => ERROR in ['courierDelete'] : " + error.message));
	}
 
	const courierActiveStatus = (courierID,Status) => {
		
		const newStatus = !Status;

		const apiUrl = 'http://192.168.0.200:814/api/Courier/CourierActiveInActive';
		const token = tokenId;

		const data = { 
			CourierIDEncrypted: courierID,
			IsActive: newStatus,
			ModifiedByEncrypted: ''
		};

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data),
		})
		.then((response) => {
	  		refClose.current.click();
	    	console.log(` => Changed Status => ${activity} to ${activity === 'Active' ? 'InActive' : 'Active'} =>  ` + courierName);
	    	GetCourierList(pgSize,pgNo);
		})
		.catch(error => console.log(" => ERROR in ['courierActiveStatus'] : " + error.message));
	}	
	
	return(
		<>
			<div>
	        	<button type="button" ref={refDel} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalDel" > Launch demo modal </button>
				<div className="modal fade" id="exampleModalDel" tabIndex="-1" aria-labelledby="exampleModalLabelDel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
		        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Delete Courier Details </h1>
		        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  						</div>
	  						<div className="modal-body" style={{ backgroundColor: '#F5E8DD', borderRadius: '10px', }}>
								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }}>
									<h3> Are You Sure You Want to Delete Record of {courierName}  </h3>
								</div>
	  						</div>
	  						<div className="modal-footer">
	  							<button type="button" onClick={() => {
	  								courierDelete(courierID);
	  								refClose.current.click();
	  							}} className="btn btn-light btn-outline-success mx-2" > Yes </button>
	  							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" > No </button>
	  						</div>
						</div>
					</div>
				</div>

				<button type="button" ref={refStatus} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalStatus" > Launch demo modal </button>
				<div className="modal fade" id="exampleModalStatus" tabIndex="-1" aria-labelledby="exampleModalLabelStatus" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
		        				<h1 className="modal-title fs-5" id="exampleModalLabel"> Change Courier Status </h1>
		        				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  						</div>
	  						<div className="modal-body" style={{ backgroundColor: '#F5E8DD', borderRadius: '10px',  }}>
								<div className="row" style={{ margin: '1rem 40px', textAlign: 'left',  }}>
									<p> Status : {activity} </p>
									<h3> Are You Sure You Want to Change Status? </h3>
									<h4> Courier Name : {courierName}  </h4>
								</div>
	  						</div>
	  						<div className="modal-footer">
	  							<button type="button" onClick={() => {
	  								courierActiveStatus(courierID, status);
	  							}} className="btn btn-light btn-outline-success mx-2" > Yes </button>
	  							<button ref={refClose} type="button" className="btn btn btn-light btn-outline-danger mx-2" data-bs-dismiss="modal" > No </button>
	  						</div>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-between"  style={{ marginTop: '5rem', }}>
					<div style={{ marginLeft: '1rem', }} >
						<button onClick={ () => {
							navigate("/AddCourier");
						}} className="btn btn-light btn-outline-success " > <i className="fa-solid fa-plus"> </i> Add Courier </button>
					</div>

					<div style={{ marginLeft: '1rem', }} >
						<div className="container-fluid d-flex">
					      	<input type="text" id="crrSearch" name="crrSearch" onChange={(e) => { setSrchval(e.target.value); }} placeholder="Search" className="form-control me-2" />
					      	<button className="fa-solid fa-magnifying-glass btn btn-outline-success" type="button" 
					      		onClick= {() => {	setPgNo(1); GetCourierList(pgSize, 1, srchval);	}} >
					      	</button>
						</div>
					</div>
				</div>

{/*
CourierName
MobileNo
ContactPersonName
EmailID
WebLink
*/}
		        <div style = {{ backgroundColor: 'white', margin: '1rem 0', overflowX: 'hidden' }}  >
		        	<table className="table table-hover abc" style={{ width: '100%', tableLayout: 'fixed' }}>
		        		<thead>
		        			<tr>
		        				<th scope="col" style={{ width: '7%' }} ></th>

		        				<th scope="col" style={{ width: '20%' }}  onClick={ () => { handleSorting('CourierName'); }} > 
		        					Courier Name 
		        					<i className={`fa-solid fa-${fieldName === 'CourierName' ? sorted : 'sort'} mx-2`}> </i>
		        				</th>

		        				<th scope="col" style={{ width: '10%' }} onClick={ () => { handleSorting('MobileNo'); }}> 
		        					Mobile No 
		        					<i className={`fa-solid fa-${fieldName === 'MobileNo' ? sorted : 'sort'} mx-2 `} > </i>
		        				</th>

		        				<th scope="col" style={{ width: '20%' }} onClick={ () => { handleSorting('ContactPersonName'); }}> 
		        					Contact Person Name 
		        					<i className={`fa-solid fa-${fieldName === 'ContactPersonName' ? sorted : 'sort'} mx-2 `} > </i>
		        				</th>

		        				<th scope="col" style={{ width: '13%' }} onClick={ () => { handleSorting('EmailID'); }}> 
		        					Email 
		        					<i className={`fa-solid fa-${fieldName === 'EmailID' ? sorted : 'sort'} mx-2 `} > </i>
		        				</th>

		        				<th scope="col" style={{ width: '30%' }} onClick={ () => { handleSorting('WebLink'); }}> 
		        					Web Link 
		        					<i className={`fa-solid fa-${fieldName === 'WebLink' ? sorted : 'sort'} mx-2 `} > </i>
		        				</th>
		        			</tr>
		        		</thead>

		        		 <tbody>
                            {getRecords.length === 0 ? (
                                <tr>
                                    <td colSpan="6"><h2 className="text-center">No Couriers Found</h2> </td>
                                </tr>
                               ) : (
                                getRecords.map(record => {
                                	const encoded = window.btoa(record.CourierIDEncrypted);
                                	return(
	                                    <tr key={record.CourierIDEncrypted}>
	                                        <th scope="row">
	                                            <div className="d-flex justify-content-center">
	                                                
	                                                <i className="fa-regular fa-trash-can mx-1 my-2" onClick={() => {
	                                                    setCourierID(record.CourierIDEncrypted);
	                                                    setCourierName(record.CourierName);
	                                                    refDel.current.click();
	                                                }} style={{ color: '#fa295d' }}> </i>

	                                                <i className="fa-solid fa-circle mx-1 my-2" onClick={() => {
	                                                    setCourierID(record.CourierIDEncrypted);
	                                                    setCourierName(record.CourierName);
	                                                    setStatus(record.IsActive);
	                                                    setActivity(record.IsActive ? 'Active' : 'InActive');
	                                                    refStatus.current.click();
	                                                }} style={{ color: record.color }}> </i>

	                                                {/*<Link className="fa-regular fa-pen-to-square mx-1 my-2" to={`/EditCourier/${encodeURIComponent(record.CourierIDEncrypted)}`} style={{ color: '#8fa0bc' }} ></Link>*/}

	                                                <Link className="fa-regular fa-pen-to-square mx-1 my-2" to={`/EditCourier/${encoded}`} style={{ color: '#8fa0bc' }} ></Link>

	                                            </div>
	                                        </th>
	                                        <td> {record.CourierName} </td>
	                                        <td> {record.MobileNo} </td>
	                                        <td> {record.ContactPersonName} </td>
	                                        <td> {record.EmailID} </td>
	                                        <td> {record.WebLink} </td>
	                                    </tr>
                                   	);
                                })
                            )}
                        </tbody>

		        	</table>
		        </div>

		        <div className="d-flex justify-content-between"  style={{ marginTop: '1rem', }}>
					<div>
					    <button onClick={ () => { setPgSize(5); setPgNo(1); }} className="btn btn-light btn-outline-success " > 5 </button>
					    <button onClick={ () => { setPgSize(10); setPgNo(1); }} className="btn btn-light btn-outline-success " > 10 </button>
					    <button onClick={ () => { setPgSize(25); setPgNo(1); }} className="btn btn-light btn-outline-success " > 25 </button>
					    <button onClick={ () => { setPgSize(50); setPgNo(1); }} className="btn btn-light btn-outline-success " > 50 </button>
					    <button onClick={ () => { setPgSize(100); setPgNo(1); }} className="btn btn-light btn-outline-success " > 100 </button>
					</div>

					<div>
						{totalResults === 0 ? 0 : (pgNo - 1) * pgSize + 1} to {Math.min(pgNo * pgSize, totalResults)} out of {totalResults} On Page No. : {pgNo}
					</div>

					<div>

						<button type="button" disabled={pgNo<=1} className="btn btn-light btn-outline-danger" onClick={() => { setPgNo(pgNo-1); }} > &#x21AB; Prev </button>

						<button type="button" className="btn btn-light btn-outline-danger" 
							disabled={(totalResults === 0) || (pgNo - 1 === 0)}
							onClick={() => { 
								setPgNo(totalResults === 0 ? 1 : pgNo - 1 === 0 ? 1 : pgNo - 1 === 1 || Math.ceil(totalResults / pgSize) - 1 === 1 ? 1 : pgNo === Math.ceil(totalResults / pgSize) ? Math.ceil(totalResults / pgSize) - 2 : pgNo - 1);
							}
						}> 
							{totalResults === 0 ? 1 : (pgNo - 1) === 0 ? 1 : pgNo === 2 ? 1 : (pgNo - 1) === Math.ceil(totalResults/pgSize) - 1 ? Math.ceil(totalResults/pgSize) - 2  : pgNo - 1} 
						</button>


						<button type="button" className="btn btn-light btn-outline-danger" 
							disabled={totalResults === 0 || pgNo === (totalResults === 0 ? 2 : pgNo === 1 ? 2 : pgNo === 2 ? 2 : (pgNo === Math.ceil(totalResults/pgSize) ? Math.ceil(totalResults/pgSize) - 1 : pgNo)) || totalResults < pgSize}
							onClick={() => { 
								setPgNo(pgNo >= Math.ceil(totalResults/pgSize) ?  pgNo-1 : pgNo+1);
							}
						}>
							{totalResults === 0 ? 2 : pgNo === 1 ? 2 :  pgNo === 2 ? 2 : (pgNo) === Math.ceil(totalResults/pgSize) ? Math.ceil(totalResults/pgSize) - 1 : pgNo } 

						</button>


						<button type="button" className={`btn btn-light btn-outline-danger`}
							disabled={totalResults === 0 || pgNo * pgSize >= totalResults}
							onClick={() => { 
								setPgNo(totalResults === 0 ? 3 : (pgNo + 1) === 2 ? 3 : (pgNo + 1) === Math.ceil(totalResults/pgSize) + 1 ? Math.ceil(totalResults/pgSize) + 2  : pgNo + 1);
							}
						}>
							{totalResults === 0 ? 3 : (pgNo + 1) === 2 ? 3 : pgNo === 2 ? 3 : (pgNo + 1) === Math.ceil(totalResults/pgSize) + 1 ? Math.ceil(totalResults/pgSize) : pgNo + 1} 
						</button>


						<button type="button" disabled={pgNo >= Math.ceil(totalResults/pgSize)} className="btn btn-light btn-outline-danger" onClick={() => { 
							setPgNo(pgNo+1);
						}} > Next &#x21AC; </button>

					</div>
				</div>

			{/*
		        <div className="d-flex justify-content-end"  style={{ marginTop: '1rem', }}>
		        	<div>
						<button type="button" disabled={pgNo <= 1} className="btn btn-light btn-outline-danger" onClick={() => { setPgNo(pgNo - 1); }} > &#x21AB; Prev </button>
							{totalPages}
						<button type="button" disabled={pgNo + 1 > Math.ceil(totalResults/pgSize)} className="btn btn-light btn-outline-danger" onClick={() => { setPgNo(pgNo+1); }} > Next &#x21AC; </button>					
					</div>
				</div>
			*/}
		    </div>
		</>
	);
}
export default GetCourier;
