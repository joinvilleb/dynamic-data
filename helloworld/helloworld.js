// ways to declare variables

var name = "John"
var age = 23.5
let lastName = "Smith"
const year = 2024

// JavaScript Object Notation AKA JSON

var printer = {
    color:"black",
    size:"small",
    price:29.99
}

// Node.js has a built in module called HTTP, 
// which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).

const http = require('http'); // puts the required module into a constant called http

// define the port the app will be access from (80,8080,8888 are default to the domain /)

const PORT = process.env.PORT || 8080;

// the callback is a function which executes after something else had completed

// createServer() method creates an HTTP server:
const server = http.createServer((request, response) => {


    console.log("****************************************")
    console.log("****************************************")

    console.log(request)
    console.log("Responding to request")



    console.log("****************************************")
    console.log("****************************************")

    console.log(request.url)
    console.log(request.method) 
    // GET, POST, PUT, DELETE
    // GET => read operation of a database
    // POST => create operation of a database
    // PUT => update operation of a database
    // DELETE => delete operation of a database

    // How to respond to requests
    // ROUTING


    if (request.url === "/") {
        // execute the statement
        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('Home Page')
    }   
    else if (request.url === "/contact") {
            // execute the statement
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end('Contact Page')
    }
    else if (request.url === "/about") {
        // execute the statement
    response.writeHead(200, { 'Content-Type': 'text/plain' })

    // response.send("Home page") is rarely used

    response.end('About Page')
    }
    else if (request.url === "/gallery") {
        // execute the statement
    response.writeHead(200, { 'Content-Type': 'Text/HTML' })
    response.end('<html><head><title>Page Title</title></head><body><h1>My first HTML response</h1></body></html>')
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end('404 Page Not Found')
    }



    // Basic conditions
    /** 
     * Equals: if a == b (Equals sign twice because = by itself is an assignment operator)
     * Not equals: if a != b
     * Greater than: if a > b
     * Less than: if a < b
     * Greater than or equal to: if a >= b
     * Less than or equal to: if a <= b
     * 
     * 
     */



})
// must use ` tick when using ${} to insert variables
server.listen(PORT, ()=> console.log(`server started on port http://localhost:${PORT}; ` + 'press Ctrl +C to terminate....'))


// server.listen(PORT) // tells the server to listen on the port defined above

