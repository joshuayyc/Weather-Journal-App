/* Global Variables */
// Add API credentials
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
const apiKey = '5fd028b76c2b7becba18184aef4d202e';
// let apiKey = '{5fd028b76c2b7becba18184aef4d202e}';

const button = document.querySelector('#generate');
button.addEventListener('click', pullData);

function pullData (e) {
    console.log ("pullData Test");
    getWeather(baseURL,apiKey);
}

const getWeather = async (baseURL,apiKey) => {
    const res = await fetch (baseURL+apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log("error, error");
        //handle error
    }
}






// Create a new date instance dynamically with JS
// let d = new Date();
// // let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// const postData = async ( url = '', data = {})=>{
//     console.log(data);
//       const response = await fetch(url, {
//       method: 'POST', //*GET, POST, PUT, DELETE, etc...
//       credentials: 'same-origin',
//       headers: {
//           'Content-Type': 'application/json', //run on JSON data, naturally runs on strings
//       },
//      // Body data type must match "Content-Type" header
//       body: JSON.stringify(data),
//     });
//
//       try {
//         const newData = await response.json();
//         console.log(newData);
//         return newData;
//       }catch(error) {
//       console.log("error", error);
//       // appropriately handle the error
//       }
//   }

// postData('/add', {answer:42});
