// // Title: Uptime Monitoring Application
// // Description: A RESTFul API to monitor up or down time of user define link
// // Author: Md. Kabirul Hossain
// // Date: 15.02.25

// //dependencies
const http = require("http");
const URL = require("url");
const fs = require('fs');
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

// const server = http.createServer((req, res)=>{
//   if(req.url == '/'){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>This is the Home Page</h1>');
//     res.end();
//   }
//   if(req.url == '/about'){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>This is the about Page</h1>');
//     res.end();
//   }
//   if(req.url == '/contact'){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>This is the contact Page</h1>');
//     res.end();
//   }
// })
// server.listen(3000);
// console.log("Server is running...........");

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

// ##########   URL Module    ##########
// Using URL Module breakdown the url using parse then we will get hostname, pathname, searchQuery, port etc

//##############  Synchronous & Asynchronous ################

//When we use Synchronous
// when need process time short and simple task then we will use Synchronous

//When we use Asynchronous
// when process time high and also process complex then we will use Asynchronous
// We always try to use Asynchronous


//##############  fs ready file ready html page ##################
// const server = http.createServer((req, res)=>{
//   if(req.url == '/'){
//     fs.readFile('Home.html', (err, data)=>{
//       res.writeHead(200, {'content-type': 'text/html'});
//       res.write(data);
//       res.end();
//     })
    
//   }
// })
// server.listen(3000);
// console.log("Server is running...........");


// // Write File
// //ASyncronous Way
// //In Asyncronous must pass a call back function
// const server = http.createServer((req, res)=>{
//   if(req.url == '/'){
//     fs.writeFile('write.txt', "Hi, How are you?", (err)=>{
//       if(!err){
//         res.writeHead(200, {"content-type": "text/html"});
//         res.write("Write File SuccessFully");
//         res.end();
//       }else{
//         res.writeHead(200, {"content-type": "text/html"});
//         res.write("Write File Fail");
//         res.end();
//       }
//     })
    
//   }
// })
// server.listen(3000);
// console.log("Server is running...........");

// Write File
//Syncronous Way
// Syncronous not need to pass callback function
const server = http.createServer((req, res)=>{
  if(req.url == '/'){
    let error = fs.writeFileSync('write1.txt', "Hi, How are you?");
      if(!error){
        res.writeHead(200, {"content-type": "text/html"});
        res.write("Write File SuccessFully");
        res.end();
      }else{
        res.writeHead(200, {"content-type": "text/html"});
        res.write("Write File Fail");
        res.end();
      }
    
    
  }
})
server.listen(3000);
console.log("Server is running...........");