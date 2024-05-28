'''
	setValue change krvi

	https://stackoverflow.com/questions/70078332/how-to-set-all-formik-values-at-once

	https://formik.org/docs/api/formik

	http://192.168.0.200:814/swagger/index.html
'''

CourierName: '', MobileNo: '', EmailID: '', ContactPersonName: '', WebLink: ''

CourierName
MobileNo
EmailID
ContactPersonName
WebLink


http://192.168.0.200:814/api/Authentication/Login
{
  "UserName": "nirav2404",
  "Password": "123456",
  "DeviceType": 0,
  "FCMToken": ""
}

http://192.168.0.200:814/api/Courier/CourierInsert
{
  "CompanyIDEncrypt": "lrQ+Ao+IEjI=",
  "BranchIDEncrypt": "lrQ+Ao+IEjI=",
  "CourierName": " Enter ",
  "CourierAddress": " Enter ",
  "CountryCode": "+91",
  "MobileNo": " Enter ",
  "EmailID": " Enter ",
  "ContactPersonName": " Enter ",
  "WebLink": " Enter ",
  "CreatedByEncrypt": ""
}

http://192.168.0.200:814/api/Courier/GetCourierList
{
  "CurrentPage": 1,
  "PageSize": 10,
  "Search": "",
  "Sorting": "",
  "Status": -1,
  "CompanyIDEncrypted": "lrQ+Ao+IEjI=",
  "BranchIDEncrypted": "lrQ+Ao+IEjI="
}
RESPONSE => 
	{
	  "IsSuccess": true,
	  "EncryptID": "string",
	  "Message": "string",
	  "CourierList": [
	    {
	      "CourierIDEncrypted": "string",
	      "CompanyIDEncrypt": "string",
	      "BranchIDEncrypt": "string",
	      "CompanyName": "string",
	      "BranchName": "string",
	      "CourierName": "string",
	      "CourierAddress": "string",
	      "CountryCode": "string",
	      "MobileNo": "string",
	      "EmailID": "string",
	      "ContactPersonName": "string",
	      "WebLink": "string",
	      "CreatedDate": "string",
	      "IsActive": true,
	      "IsDelete": true,
	      "RecordCount": 0,
	      "RowNo": 0
	    }
	  ],
	  "TotalRecordCount": 0
	}


http://192.168.0.200:814/api/Courier/CourierUpdate
	{
	  "CourierIDEncrypted": " get from records ",
	  "CompanyIDEncrypt": "lrQ+Ao+IEjI=",
	  "BranchIDEncrypt": "lrQ+Ao+IEjI=",
	  "CourierName": " Enter ",
	  "CourierAddress": " Enter ",
	  "CountryCode": "string",
	  "MobileNo": " Enter ",
	  "EmailID": " Enter ",
	  "ContactPersonName": " Enter ",
	  "WebLink": " Enter ",
	  "ModifiedByEncrypt": " Megha "
	}

http://192.168.0.200:814/api/Courier/CourierDelete
	{
	    "CourierIDEncrypted": " Enter ",
	    "ModifiedByEncrypted": ""
	}

http://192.168.0.200:814/api/Courier/CourierActiveInActive
{
  "CourierIDEncrypted": "JPlXhtjpeCY=",
  "IsActive": false,
  "ModifiedByEncrypted": ""
}


	C:\Users\Dell\Desktop\APPEGIC\formik\src\API\GetCourier.js
		const [records, setRecords] = useState([]);
		useEffect(() => {
			const apiUrl = 'http://192.168.0.200:814/api/Courier/GetCourierList';
			const token = '';
			const data = {
			  	CurrentPage: 1,
				PageSize: 10,
				Search: "",
				Sorting: "",
				Status: -1,
				CompanyIDEncrypted: "lrQ+Ao+IEjI=",
				BranchIDEncrypted: "lrQ+Ao+IEjI="
			};
			fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			})
				.then(response => {
					console.log('Response status:', response.status);
					console.log('Response headers:', response.headers);
					return response.json();
				})
				.then(data => {
					console.log('Response data:', data);
					setRecords(data.CourierList);
				})
				.catch(error => {
					console.error('Error:', error);
				})
		},[])



// const getNotes = async () => {
// 		// API Call 
// 		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
// 			}
// 		});
// 		const json = await response.json() 
// 		setNotes(json)
// 	}


