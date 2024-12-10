
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
        response.render('about',
            {data, 
            gallery, 
            }
            )
    }
)

app.get('/souveniers', (request, response) => {

    const data = require("./data/category_1.json")

   response.render('category',
    {data, gallery,
    }
   )

})

app.get('/clothing', (request, response) => {

    const data = require("./data/category_2.json")

    response.render('category',
     {data, gallery,
     }
    )
 
 })


app.get('/food', (request, response) => {

    const data = require("./data/category_3.json")

    response.render('category',
        {data, gallery,
        }
        )

})


const categories = {

    1: require('./data/category_1.json'), // souveniers

    2: require('./data/category_2.json'), // clothing

    3: require('./data/category_3.json') // food
};

app.get('/product/:id', (request, response) => {

    const productId = parseInt(request.params.id);
    

    let categoryData;

    for (const key in categories) {
        const foundProduct = categories[key].products.find(p => p.id === productId);
        if (foundProduct) {
            categoryData = categories[key];
            break;
        }
    }


    if (!categoryData) {

        return response.status(404).render('404');

    }

    const product = categoryData.products.find(p => p.id === productId);


    const relatedProducts = categoryData.products

        .filter(p => p.category === product.category && p.id !== productId)

        .slice(0, 4);

    response.render('details', {

        product,

        relatedProducts

    });
});

app.get('/category/:id', (request, response) => {

    const categoryId = parseInt(request.params.id);


    const categoryData = categories[categoryId];
    if (!categoryData) {

        return response.status(404).render('404'); // Category not found
    }

    response.render('category', {

        data: categoryData

    });
});




app.get('/gallery', (request, response) => {

    const data = require("./data/gallery.json")
    
    response.render('landing', 

    {data, gallery,
    }
    )
})

app.get('/contact', (request, response) => {

    const data = require("./data/about.json")

    response.render('landing',

        {data, gallery,

        }
        )

})

let cart = []; 

app.get('/cart', (request, response) => {

    response.render('cart', { cart }); // cart page

});



app.use(express.urlencoded({ extended: true })); // POST request data

// Add a product to the cart

app.post('/cart', (request, response) => {

    const { id, name, description, price, image } = request.body;


    cart.push({ id, name, description, price, image });


    response.redirect('/cart');
    
});

    const fs = require('fs');
    const path = require('path');

    app.post('/checkout', (request, response) => {
        const { name, address, email, phone } = request.body;

        // Save the cart and customer details to orders.json
        const order = {
            customer: {
                name,
                address,
                email,
                phone
            },
            cart
        };

        const ordersFilePath = path.join(__dirname, 'data', 'orders.json');

    fs.readFile(ordersFilePath, 'utf8', (err, data) => {

        let orders = [];

        if (!err && data) {

            orders = JSON.parse(data);
        }
        orders.push(order);

        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (writeErr) => {
            if (writeErr) {

                console.error('Error saving order:', writeErr);

                return response.status(500).send('Error saving order.');

            }


            cart = [];

            // Redirect to the thank-you page
            response.redirect('/thank-you');
        });
    });

    });




app.get('/thank-you', (request, response) => {

    response.render('thank-you');

});



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

