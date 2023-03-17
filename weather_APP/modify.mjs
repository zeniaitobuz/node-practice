import { weatherData as weatherDatabase} from "./weatherDb.mjs";

let val={}

console.log("Original Data->")
console.log(weatherDatabase)
console.log("")

function create(location,tempC){
    val.location = location
    val.tempC = tempC
    weatherDatabase.push(val)
    console.log("Data after insertion->")
    console.log(weatherDatabase)
    console.log("")
}


function read(){
    console.log("Reading data....")
    console.log(weatherDatabase)
    console.log("")
}

function update(location, newtemp){
    var weatherData = weatherDatabase.find(value => value.location==location).tempC=newtemp;
    console.log("Data after updation->")
    console.log(weatherDatabase)
    console.log("")
}

export function deletedata(location){
    weatherDatabase.splice( weatherDatabase.findIndex(a => a.location === location) , 1);
    console.log("Data after deletion->")
    console.log(weatherDatabase)
    console.log("")
}

create("Paris",8)
update("Paris",4)
read()
deletedata("Paris")