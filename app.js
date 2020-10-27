var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=bHra1j9vmn0WazgawJMdRojCX2YzRbA5BRP5EqUA1Y8";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      parseData(request.response)
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
    })
);

const parseData = (response) => {
  var plantDict = JSON.parse(response)
  var commonPlantNames = plantDict.data.map(x => x.common_name)
  console.log(plantDict)
  addPrettyPlantList(commonPlantNames)
}

const addPrettyPlantList = (plants) => {
  console.log(plants)
  document.getElementById('plants').innerHTML = ""
  for (var i in plants) {
    document.getElementById('plants').innerHTML += plants[i] + "<br>"
  }
}