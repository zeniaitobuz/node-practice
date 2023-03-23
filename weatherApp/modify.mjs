import { weatherData as weatherDatabase } from "./weatherDatabase.mjs";

let dataValues = {};

console.log("Original Data->");
console.log(weatherDatabase);
console.log("");

export function createData(location, tempC, feelsLike, condition) {
  dataValues.location = location;
  dataValues.tempC = tempC;
  dataValues.feelsLike = feelsLike;
  dataValues.condition = condition;
  weatherDatabase.push(dataValues);
  console.log("Data after insertion->");
  console.log(weatherDatabase);
  console.log("");
}

export function readData() {
  console.log("Reading data....");
  console.log(weatherDatabase);
  console.log("");
}

export function updateData(location, newTemp) {
  let weatherData = (weatherDatabase.find(
    (value) => value.location === location
  ).tempC = newTemp);
  console.log("Data after updation->");
  console.log(weatherDatabase);
  console.log("");
}

export function deleteData(location) {
  weatherDatabase.splice(
    weatherDatabase.findIndex((a) => a.location === location),
    1
  );
  console.log("Data after deletion->");
  console.log(weatherDatabase);
  console.log("");
}

// createData("Paris", 8, 10, "mist");
// updateData("Paris", 4);
// readData();
// deleteData("Paris");
