// // Title: Uptime Monitoring Application
// // Description: A RESTFul API to monitor up or down time of user define link
// // Author: Md. Kabirul Hossain
// // Date: 15.02.25

// //dependencies
const http = require("http");
// const { handleReqRes } = require("./helpers/handleReqRes");
// const environment = require("./helpers/environment");
// const data = require("./lib/data");

// //app object - module scaffolding
// const app = {};

// //testing write data to file
// // data.create('test', 'newFile', {name: 'Bangladesh', language: 'Bangla'}, function(err){
// //   console.log(`error was`, err);
// // })

// //test read data from file
// // data.read('test', 'newFile', function(err, data){
// //   console.log(`error was`, err);
// //   console.log(`Data`, data);
// // })                                             

// //test update file data
// // data.update('test', 'newFile', {name: 'UK', language: 'English'}, function(err){
// //   console.log(`error was`, err);
// // })

// // test delete file
// // data.delete('test', 'newFile',function(err){
// //     console.log(`error was`, err);
// //   })


// //crate server
// app.createServer = () => {
//   const server = http.createServer(app.handleReqRes);
//   server.listen(environment.port, () => {
//     console.log(`Server is running on port ${environment.port}`);
//   });
// };

// //handle request res
// app.handleReqRes = handleReqRes;

// //start the server
// app.createServer();
// *****************************New Follow Rabbil Bhai Tutorial *************

const server = http.createServer((req, res)=>{
  if(req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is the Home Page</h1>');
    res.end();
  }
  if(req.url == '/about'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is the about Page</h1>');
    res.end();
  }
  if(req.url == '/contact'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is the contact Page</h1>');
    res.end();
  }
})
server.listen(3000);
console.log("Server is running...........");

//Http Protocol Request Response
//Req methods POST, GET, PUT, DELETE etc
//Response Data comes from server 2 way through HEAD or BODY
//Head data comes pair waise key and value
//Body data type normally JSON
// When we write something in search bar that is called request(req) and then what we see in the browser it's called response(res)

//What is HTTP Client
//Ans: Those send HTTP Request in server and Recive response that is called HTTP Client.
//Example of HTTP Client
// Axios, Fetch, Jquery Ajax etc
//HTTP client for Testing
// Postman, Fiddler