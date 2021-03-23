// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8001;

// spin up/initializes the server
const server = app.listen(port, listening);

// const serve = app.listen(port, ()=>{console.log(`running on local host: ${port}`)})
// port is required to run the function on
// Callback function "listening" to debug
// node server.js used in the command line can be used to test that server is working
function listening () {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}


app.post('/add', function (request, response) {
    let data = request.body;
    console.log(data);
    console.log("testing working");
    // projectData = [];
    // projectData.push(request.body);
    // console.log(projectData);
});
