let eList = require('../data/emails.json')

// to write or create files in node.js, you need to use to use the file System (fs) module

const fs = require('fs')

exports.newsletterSignup = (req, res) => { // create your functions here

    res.render('newsletter-signup', { csrf: 'supersecretcode'})

}

exports.newsletterSignupProcess = (req, res) => { // create your functions here
    
    console.log(req.body)

    // to store the data:
    // first create a new user variable

    var newUser = {

        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zip,
        "email": req.body.email



    }

    console.log("Cleaned user")
    console.log(newUser)
    eList.users.push(newUser)
    // once we have a clean user, we add to eList

    // we need to turn the eList values back into text in order to write

    var json = JSON.stringify(eList)

    fs.writeFileSync('./data/emails.json', json,'utf8', ()=> {
        console.log("File written")
    })

    eList.users.push(newUser)
    console.log("current eList")
    console.log(eList)

    res.redirect(303, '/newsletter/thankyou')

}

exports.newsletterSignupList = (req, res) => { // create your functions here
    eList = require('../data/emails.json')
    console.log(eList)
    res.render('userspage', {"users":eList.users})
}

exports.newsLetterUser = (req, res) => { // create your functions here

    var userDetails = eList.users.filter((user) => {

        return user.email === req.params.email

    })

    res.render('userdetails', {"users": userDetails})
}


exports.newsLetterUserDelete = (req, res) => { // create your functions here

    var newUsers = {"users":[]}
    
    newUsers.users = eList.users.filter((user) => {

        return user.email != req.params.email

    })

    var json = JSON.stringify(newUsers)

    fs.writeFileSync('./data/emails.json', json,'utf8', ()=> {
        console.log("File written")
    })

    res.send('<a href="/newsletter/list">Back to list</a>')
}


