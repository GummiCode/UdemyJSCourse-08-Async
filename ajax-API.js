/////////////////////////////////////////////////
// 1. What is AJAX?
// - Asynchronous JAvasScript And XML

// AJAX is a process by whcih we asynchronously communicate with a server.
// We sendout a simple HTTP requrest (eg. a GET or a POST) which is routed to the server (API), and the API sends back a response (Serves the Request).
// AJAS is simply a term used to describe this process.

// API stands for Application Programming Interface.
// Fundamentally an API i a piece of software which communicates with another/other pieces of software.
// BUT in the context of web development, when we use the term APi we're usually specifically describing an API that handles requests. It is the software stored on the server which receives the request, processes it, and gives the Response which will be served back to the Client.

// We can build our own APIs, and we can access existing APIs to get useful data that we can use in our apps.

///////////////////////////////////////////
// Using FETCH to retrieve data from an API

// We're going to use an APi called MetaWeather:
//              http://www.metaweather.com/api/
// The moethods it provides are described in its documentation. We;ll be using a method that gives weather data for a location specified in the request (using a value called a Where On Earth ID (woeid)).

// We use the "fetch" method to send the request. We pass in a URL as a string. The URL specifies our request. The format is specified in the documentation for the API.

// fetch("http://www.metaweather.com/api/location/2487956");

// This returns a dataset in JSON format. We can convert this to an object for our use.

// BREAK: SAME ORIGIN POLICY
// Security policies are rules embedded in software to protect users from security risks.
// For example, reputable browsers have policies about how data can be shared and so forth.
// The SAME ORIGIN POLICY is such a security policy. This policy requires that data can only be transferred -directly- between two web pages if they have the same origin, ie. if they're on the same network (or other designated shared system). This is because allowing websites direct access to one another creates a significant risk of insecure data transferral, and allows daisy-chaining of all kinds of data to all kinds of locations without controls.
// For us, this means that we can't make direct AJAX requests between our domain  (the website we're running on our PC) and the MetaWeather API.

// A feature called CROSS-ORIGIN RESOURCE SHARING needs to be provided on the host API for this policy to be met. Metaweather hasn't implemented CORS, so we use a proxy to channel the request.

// We don't have our own server for this so we need an alternative solution. The course advises using a proxy server called crossorigin, but this has been bloced under CORS protocol since 2017. The course guidance advises using the heroku proxy below, which does work.

//const id = 2487956;

//fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`)

// The Fecth method returns  a promise, and so we need to process it using .then and .catch statements or async/await. We'll write the code for both.

//const id = 2487956;

//fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`)
//.then(result => )
//.catch(error => );

//TODO: Add the Async/Await version

// The fetched data is in JSON format. We can convert it to JS using the super convenient .json method. This returns a promise, so we'll also need to process the output of that using then/catch or async/await.

const woeidCalifornia = 2487956;
const woeidLondon = 444418;

function getWeather(woeid) {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
  )
    .then((result) => {
      //console.log(result); // Logs the response in json format
      return result.json(); // Converts the json to js. Asynchronous, returns a Promise.
    })
    .then((data) => {
      // Here we process the data from the result.json promise
      //console.log(data); //Finally we output the data as a standard object.
      const today = data.consolidated_weather[0].weather_state_name;
      const locale = data.parent.title;
      console.log(`Welcome to ${locale}! Today the weather will be ${today}.`);
    })
    .catch((error) => console.log("Error!"));
}

getWeather(woeidCalifornia);
getWeather(woeidLondon);

// Now that the data is nabbed you can see what the location is! o take a look :3

