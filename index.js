// Title: Uptime Monitoring Application
// Description: A RESTFul API to monitor up or down time of user define link
// Author: Md. Kabirul Hossain
// Date: 15.02.25

//dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environment");
const data = require("./lib/data");

//app object - module scaffolding
const app = {};

//testing file system
data.create('test', 'newFile', {name: 'Bangladesh', language: 'Bangla'}, function(err){
  console.log(`error was`, err);
} )

//crate server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Server is running on port ${environment.port}`);
  });
};

//handle request res
app.handleReqRes = handleReqRes;

//start the server
app.createServer();
