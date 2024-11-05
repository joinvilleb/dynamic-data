
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

   const data = require("./data/home-data.json") // import data from a JSON file
   response.render('landing', {
   gallery,
   data

   })
})

app.get('/about', (request, response) => {
    
        const data = require("./data/about.json")
        response.render('landing',
            {data,
            gallery,
            }
            )
    }
)

app.get('/economy', (request, response) => {

    const data = require("./data/economy.json")

   response.render('landing',
    {data, gallery,
    }
   )

})

app.get('/entertainment', (request, response) => {

    const data = require("./data/entertainment.json")

    response.render('landing',
     {data, gallery,
     }
    )
 
 })


app.get('/weather', (request, response) => {

    const data = require("./data/weather.json")

    response.render('landing',
        {data, gallery,
        }
        )

})

app.get('/gallery', (request, response) => {

    const data = require("./data/gallery.json")
    
    response.render('landing', 
    {data, gallery,
    }
    )
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

