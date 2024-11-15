

// initializing the express server
// npm install express
// npm install express-handlebars
const express = require('express')

const expressHandlebars = require('express-handlebars')

const app = express()
// specify static routes


// import a package for handlebars called express-handlebars



const bodyParser = require('body-parser') // import body-parser to processs POST data from forms

app.use(bodyParser.urlencoded({extended: true})) // body parser neeeds to be initialized

const handler = require('./lib/handler') // import the handler module



// make express use the handlebars tenplate engine
app.engine('handlebars', expressHandlebars.engine({ 

    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')


// store the express server in a variable called app
const PORT = process.env.PORT || 8000
app.get('/', (req, res) => {

    res.render('page', {req})
})

app.get('/',(req,res)=>{
    res.render('page',{req})
})

app.get('/mad',(req,res)=>{
    const data = require('./data/mad-data.json')
    res.render('madform',{data})
})
app.get('/madprocess',(req,res)=>{
   res.render('madprocess',{req}) 
})

// ROUTES FOR NEWSLETTER SIGNUP

app.get('/newsletter-signup', handler.newsletterSignup)


app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/newsletter/list', handler.newsletterSignupList)

app.get('/newsletter/thankyou', (req, res) => {
    
        res.render('thankyou')
    
    })

    // newsletter/details/?email=hjg@haha.com

app.get('/newsletter/details/:email', handler.newsLetterUser)
app.get('/newsletter/delete/:email', handler.newsLetterUserDelete)





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

