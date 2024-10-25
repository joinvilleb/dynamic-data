
// imports express into the project 
const express = require('express')

const app = express()
// specify static routes

app.use(express.static('public'))


// import a package for handlebars called express-handlebars
const expressHandlebars = require('express-handlebars')

// make express use the handlebars tenplate engine
app.engine('handlebars', expressHandlebars.engine({

    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

// store the express server in a variable called app
const PORT = process.env.PORT || 3000

// Import app-wide data

const gallery = require('./data/gallery.json')
// process routes 

app.get('/', (request, response) => {

   console.log(gallery)

   const data = require("./data/home-data.json")
   response.render('landing', {
   gallery,
   data

   })
})

app.get('/economy', (request, response) => {

   response.render('page',
    {title: "Economy in Los Angeles",
    abstract: "All you need to know about Los Angeles. From the Hollywood sign to the Santa Monica Pier, there is something for everyone.",
    }
   )

})

app.get('/entertainment', (request, response) => {

    response.render('page',
     {title: "Entertainment in Los Angeles",
     abstract: "Here, you can find the best entertainment in Los Angeles. From the Hollywood sign to the Santa Monica Pier, there is something for everyone.",
     }
    )
 
 })


app.get('/weather', (request, response) => {

    response.type('text/plain')
    response.send('Get more information on Los Angeles weather and climate and plan your trip accordingly')

})

app.get('/gallery', (request, response) => {
    
        response.type('text/plain')
        response.send('This is a collection of images from Los Angeles. Explore some of the gorgeous views of the city.')
    
    })


// handle the error FIRST
// default responses for anything that does not match the routes above (below) NOT FOUND!
app.use( (request,response)=>{

    
    response.status(404)
    response.render('404')

})

// THIS TRIGGERS A SERVER ERROR

app.get('/error', (req, res) => {

    response.type('text/plain')
    response.status(500)
    response.send('Hi there, this a server error!')

})
    

// SERVER ERROR :(
    app.use((error,request,response,next)=>{
    console.log(error.message)
        response.status(500)
        response.render('500')
    })

    app.listen(PORT, () => {

        console.log(`Express is running on http://localhost:${PORT}`)
        console.log('Press Ctrl-C to terminate...')
    })




    //NOTES

    //Section descriptions:
    // About: 1  short paragraph per page
    // Services: At least 4 services per page
    // Packages: Show at least 6 packages per page
    // Gallery: Show at least 16 images per page

