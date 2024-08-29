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

const PORT = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    console.log(request)
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World\n')
})
// must use ` tick when using ${} to insert variables
server.listen(PORT, ()=> console.log(`server started on port ${PORT}; ` + 'press Ctrl-C to terminate....'))

// server.listen(PORT) // tells the server to listen on the port defined above

