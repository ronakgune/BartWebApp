
var Client = require('node-rest-client').Client;
var express = require('express');
var fs = require('fs');

var app = express();
var client = new Client();
var stationNameList = " ";
var htmlString = "";


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("BART app listening at http://%s:%s", host, port)
})

app.get('/stations', function (req, res) {
  
  client.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V", function (data, response) {
    var stations = data.root.stations[0].station;
    
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(stations);

  });
});

app.get('/station', function (req, res) {
  const query = req.query; 
  const stationAbbr = query.source; 
  
  const url = "http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=" + stationAbbr
  + "&key=MW9S-E7SL-26DU-VV8V";
  client.get(url, function (data, response) {
    var stations = data.root.stations[0].station;
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(stations);
  });
});

app.get('/trips', function (req, res) {
  const query = req.query; 
  const sourceAbbr = query.source;
  const destAbbr = query.dest;
  
  const url = "http://api.bart.gov/api/sched.aspx?cmd=depart&orig=" + sourceAbbr
  + "&dest=" + destAbbr + "&time=now&date=now&key=MW9S-E7SL-26DU-VV8V&b=1&a=4&l=1";
  
  client.get(url, function (data, response) {
    
    if (sourceAbbr === destAbbr) {
      var tripInfo = data;
    } else {
      var tripInfo = data.root.schedule[0].request[0];
    }
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(tripInfo);
  });
});

app.get('/', function (req, res) {
    fs.readFile('./index.html', 'utf8', function(err, text){
      if(err){
        console.log("Coud not find ../client/index.html file");
        return;
    }
          res.send(text);
    });
});

app.get('/*.js', function (req, res) {
    fs.readFile(req.path.substring(1), 'utf8', function(err, text){
      if(err){
        console.log("Coud not find /*.js file");
        return;
      }
      res.setHeader("content-type", "text/javascript; charset=UTF-8")
          res.send(text);
    });
});

app.get('/*.css', function (req, res) {
  fs.readFile(req.path.substring(1), 'utf8', function(err, text){
    if(err){
        console.log("Coud not find /*.css file");
        return;
    }
    res.setHeader("content-type", "text/css; charset=UTF-8");
        res.send(text);
  });
});

