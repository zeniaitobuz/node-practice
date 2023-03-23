const http = require("http");

const port = 200;
const fs = require("fs");
const path = require("path");
let weatherData = "";

function readingFile() {
  const data = fs.readFileSync(path.resolve("weatherDb.txt"), "utf8");
  console.log(path.resolve("weatherDb.txt"));
  weatherData = JSON.parse(data);
}

readingFile();
const myserver = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(getRequestData(req));
});

myserver.listen(port, () => {
  console.log("port ...", port);
});

function getRequestData(req) {
  let location = req.url.substring(1);
  let str = "/" + location;
  let weatherDatabase = [
    {
      location: "",
      tempC: "",
      feelsLike: "",
      condition: "",
    },
  ];

  if (req.url === "/") {
    console.log(weatherData);
    return JSON.stringify({ weatherData });
  } else if (req.url === str) {
    for (let i = 0; i < weatherData.length; i++) {
      if (location === weatherData[i].location) {
        weatherDatabase[0].location = weatherData[i].location;
        weatherDatabase[0].tempC = weatherData[i].tempC;
        weatherDatabase[0].feelsLike = weatherData[i].feelsLike;
        weatherDatabase[0].condition = weatherData[i].condition;
        console.log(weatherDatabase);
        return JSON.stringify({ weatherDatabase });
      }
    }
  } else {
    return "NOT FOUND";
  }
}
