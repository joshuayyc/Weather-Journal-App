// Setup empty JS object to act as endpoint for all routes
const projectData = [];

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

//
// app.post('/add', function (request, response) {
//     let data = request.body;
//     console.log(data);
//     console.log("testing working");
//     projectData=[];
//     projectData.push(request.body);
//     console.log(projectData);
// });

/* SET-UP HANDLERS - used to directly respond to HTTP requests, such as GET and POST*/

// Add a GET route that returns projectData in server code
// GET request is used to access data from the project's end point - projectData
// Get method takes 2 arguments: 1 string (url path - root (home)), 2 callback function (req,res) --> request and response. 
app.get('/test', function(req,res){
    res.send("hello world");
    res.send(projectData);
})

// Add a POST route that adds incoming data to projectData [HTTP POST request sends data to the project's end point - visible in git bash console]
// Data added to endpoint projectData, can then be accessed later using a GET request.
// app.post('/add', function(req, res){
//     res.send ("Post received");
//     console.log(req.body);
//     projectData.push(req.body);
//     console.log(projectData);
// })


app.post('/add', function(request, response) {
    let data = request.body;
    let newEntry = {
        movie: data.movie, 
        score: data.score
        };
    projectData.push(newEntry);
    console.log(projectData);
    // projectData['movie'] = data.movie
    // console.log (projectData);
});


// postData('/add', {movie:'the matrix', score:5});
