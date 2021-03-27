/* Global Variables */
const button = document.querySelector('#generate');
button.addEventListener('click', performAction);

/* Action performed when clicking generate button*/
function performAction () {
    const zipField = document.querySelector('#zip');
    if (zipField.value == "" || zipField.validity.patternMismatch) {
        console.log("Please enter your zip code in XXXXX format")
    }
    else {
        let zipCode = zipField.value;
        let feelings = document.querySelector('#feelings').value;
        const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=`;
        let apiKey = '5fd028b76c2b7becba18184aef4d202e';
        getWeather(baseURL,apiKey,feelings)
        .then (function(data) {
            console.log(data);
            postData ('/add',data);
        })
       .then (function () {
            updateUI();
       });
    };
}

/*getWeather async function outputw 3 pieces of data */
const getWeather = async (baseURL,apiKey, feelings) => {
    const res = await fetch (baseURL+apiKey);
    try {
        const data = await res.json();
        // console.log(data);

        // Obtain temp value from data
        let temp = data.main.temp;

        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        // console.log (newDate);

        // Create new data object combining date, temperature and feelings
        // Post data to server using '/add' URL
        const newData = {date:newDate, temperature:temp,content:feelings};
        // console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error getWeather", error);
        //handle error
    }
}

/* postData asyn fx route set-up to post data to server.js */
const postData = async ( url = '', data = {})=>{
    // console.log(data);
    const response = await fetch(url, {
    method: 'POST', //*GET, POST, PUT, DELETE, etc...
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json', //run on JSON data, naturally runs on strings
    },
     // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });
        try {
            const newData = await response.json();
        // console.log(newData);
            return newData;
        }
        catch(error) {
            console.log("error postData", error);
        // appropriately handle the error
        }
}

/* Async fx to update UI elements using data fecthed from server */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.querySelector('#date').innerText = 'Date: '+allData[0].date;
        document.querySelector('#temp').innerHTML = 'Temperature: '+allData[0].temperature;
        document.querySelector('#content').innerHTML = 'Feelings: '+allData[0].content;
    }
    catch(error){
        console.log("error updateUI", error);
    }
}
