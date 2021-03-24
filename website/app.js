/* Global Variables */
const button = document.querySelector('#generate');
button.addEventListener('click', performAction);

function performAction () {
pullData();
}

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

const getWeather = async (baseURL,apiKey, feelings) => {
    const res = await fetch (baseURL+apiKey);
    try {
        const data = await res.json();
        console.log(data);

        // Obtain temp value from data
        let temp = data.main.temp;

        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        console.log (newDate);

        // Create new data object combining date, temperature and feelings
        // Post data to server using '/add' URL
        const newData = {date:newDate, temperature:temp,content:feelings};
        postData('/add',newData);
        updateUI();
    }
    catch (error) {
        console.log("error, error");
        //handle error
    }

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
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.querySelector('#date').innerText = 'Date: '+allData[0].date;
    document.querySelector('#temp').innerHTML = 'Temperature: '+allData[0].temperature;
    document.querySelector('#content').innerHTML = 'Feelings: '+allData[0].content;
  }catch(error){
    console.log("error", error);
  }
}
}