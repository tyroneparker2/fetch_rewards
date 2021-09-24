# Fetch_Rewards
To start the app you need download node.js using the link: https://nodejs.org/en/

After you download the repository and cd into the folder, you can to run npm install to get the dependencies.

To run the app, enter node app.js and the server will run on http://localhost:3000/
## Types of requests
Get request at url/ will return all payer point balances 

Post request at url/add  will add transactions for a specific payer and date. It will require body with parameter name, points, and date.

Post request at url/spend  will spend points. It will require body with parameter points.

To test the requests, you can postman extension to run get and post reqests.

To enter post parameter, click on body, raw, and json. Example input would be:

{
	"name": "DANNON",
	"points": 300,
	"date":  "2020-10-31T10:00:00Z"
}
