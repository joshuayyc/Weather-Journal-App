/* Global Variables */
const button = document.querySelector('#generate');
button.addEventListener('click', pullData);


function pullData (e) {
    console.log ("pullData Test");
    const zipField = document.querySelector('#zip');
    if (zipField.value == "" || zipField.validity.patternMismatch) {
        console.log("Please enter your zip code in XXXXX format")
    }
    else {
        let zipCode = zipField.value;
        let feelings = document.querySelector('#feelings').value;
        const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=`;
        // 94040
        //98101
        // api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
        let apiKey = '5fd028b76c2b7becba18184aef4d202e';
        getWeather(baseURL,apiKey,feelings);
    }
}

const getWeather = async (baseURL,apiKey,feelings) => {
    const res = await fetch (baseURL+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        // Get date, temp, content newData

        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        console.log (newDate);

        let temp = data.main.temp;
        console.log (temp);

        let content = data.weather[0].description;
        console.log (content);

        document.querySelector('#date').innerText = `Date: ${newDate}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${temp}`;
        document.querySelector('#content').innerHTML = `Weather: ${content}`;
        console.log(feelings);
        return data;
    }
    catch (error) {
        console.log("error, error");
        //handle error
    }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
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
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

postData('/add', {movie:'the matrix', score:5});
// postData('/add', {movie:'pitchPerfect', score:4.5});


const testData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'GET', //*GET, POST, PUT, DELETE, etc...
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
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

testData('/test', {test:'the test1', test2:5});

