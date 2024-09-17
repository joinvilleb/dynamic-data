// ways to declare variables
// JavaScript Object Notation AKA JSON
// to get out of folders, use ../
// whenever you make a change to the functionality, press Ctrl + C to terminate the server and restart it



// Node.js has a built in module called HTTP, 
// which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).

const http = require('http'); // puts the required module into a constant called http
// in order to access local files, we need to work with the file system

const fs = require('fs'); // puts the required module into a constant called fs

// define the port the app will be access from (80,8080,8888 are default to the domain /)

const PORT = process.env.PORT || 8080;

// the callback is a function which executes after something else had completed
// syntax to create a function

const functionName = (parameter1, parameter2, parameter3) => 
    
    { // write he code to be executed by the function here

        console.log("funtionName was called");
        console.log(parameter1);
        console.log(parameter2);
        console.log(parameter3);


}


// create a function to read files and display them: 

const displayPage = (path,res, contentType, responseCode = 200) => {
    fs.readFile(__dirname + path , (errors, content) => {


        // __dirname is a fail-safe way to get the current directory

        if (errors) {


            res.writeHead(500, {'Content-Type': 'text/plain'})
            return res.end('500 - Huge Internal Error')


        }

        res.writeHead(responseCode, {'Content-Type': contentType})

        res.end(content)

    })
}

// "/public/home.html"

// createServer() method creates an HTTP server:
const server = http.createServer((request, response) => {


    console.log(request)
    console.log("Responding to request")

    var path = request.url;

    switch (path) {
        
        case '':
        case '/':
            displayPage('/public/home.html', response, 'text/html')
            break;
        case '/about':
            displayPage('/public/about.html', response, 'text/html')
            break;
        case '/contact':
            displayPage('/public/contact.html', response, 'text/html')
            break;
        case '/logo':
            displayPage('/public/image.jpg', response, 'image/jpg')
            break;
        case '/saturday':
            displayPage('/public/saturday.html', response, 'text/html')
            break;
        default:
            displayPage('/public/404.html', response, 'text/html', 404)
            break;
    }



    console.log(request.url)
    console.log(request.method) 
    
    


})
// must use ` tick when using ${} to insert variables
server.listen(PORT, ()=> console.log(`server started on port http://localhost:${PORT}; ` + 'press Ctrl +C to terminate....'))


