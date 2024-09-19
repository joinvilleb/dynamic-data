
// imports express into the project 
const express = require('express')

const app = express()


// import a package for handlebars called express-handlebars
const expressHandlebars = require('express-handlebars')

// make express use the handlebars tenplate engine
app.engine('handlebars', expressHandlebars.engine({

    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

// store the express server in a variable called app
const PORT = process.env.PORT || 3000
// process routes 

app.get('/', (request, response) => {

   response.render('home')
})

app.get('/about', (request, response) => {

   response.render('about')

})

app.get('/weather', (request, response) => {

    response.type('text/plain')
    response.send('Get more information on Miami weather and climate')

})

app.get('/location', (request, response) => {
    
        response.type('text/plain')
        response.send('Explore Miami Desstinations, such as Miami Beach, Coconut Grove, and Coral Gables')
    
    })

app.get('/contact', (request, response) => {

    response.type('text/plain')
    response.send('Contact Miami Government')

})

app.get('/history', (req, res) => {

    res.type('text/plain')
    res.send('Learn more about Miami history')

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
    response.send('Hi there, this is a test!')

})
    

// SERVER ERROR :(
    app.use((error,request,response,next)=>{
    
        response.status(500)
        response.render('500')
    })

    app.listen(PORT, () => {

        console.log(`Express is running on http://localhost:${PORT}`)
        console.log('Press Ctrl-C to terminate...')
    })
