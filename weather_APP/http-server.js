// const e=require('express');
const http=require('http');

const port=200;
const fs= require('fs');
const path= require('path');
var weatherData="";

function read(){
   const data =fs.readFileSync((path.resolve('weather-db.txt')), 'utf8');
   console.log(path.resolve('weather-db.txt')); 
    weatherData=JSON.parse(data);
    
  };
  
read();
const myserver = http.createServer((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    // res.writeHead(200,{'Content-Type':'text-plain'});
    res.end(getRequestData(req));
});

myserver.listen(port,()=>{
    console.log('port ...',port)
})

function getRequestData(req){
    var location=(req.url).substring(1);
    var str='/'+location;
    var weatherDatabase=[
        {
            location:"",
            tempC:"",
            feelslike_c:"",
            condition:""
        }
    ];
    if(req.url==='/'){
        console.log(weatherData);
        return JSON.stringify({weatherData});
    }else if(req.url==str){
        for(let i=0;i<weatherData.length;i++){
            if(location==weatherData[i].location){
                
                weatherDatabase[0].location=(weatherData[i]).location;
                weatherDatabase[0].tempC=(weatherData[i]).tempC;
                weatherDatabase[0].feelslike_c=(weatherData[i]).feelslike_c;
                weatherDatabase[0].condition=(weatherData[i]).condition;
                console.log(weatherDatabase);
                return JSON.stringify({weatherDatabase});  
            }
        }
    }
    else{
        return ('NOT FOUND')
    }
}
