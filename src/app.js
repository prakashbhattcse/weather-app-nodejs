// It's because you're running the node command within the src folder. You need to run it from outside the src folder:
// node src/app.js
const request = require('postman-request');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')
const geoCode = require('./Utils/geoCode');
const forcast = require('./Utils/forcast')
const port= process.env.PORT || 3000

const filePath = path.join(__dirname,'../public')
// console.log(filePath);

//changes the default view engine.
app.set('view engine','hbs')

// As we know template engine uses views folder but what if we want to use another name other then views
// app.set('views', the new name path)

const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('views', viewPath); 
hbs.registerPartials(partialPath);

// to render static pages
app.use(express.static(filePath))

app.get('/',(req,res)=>{
    res.render('index', {myName:'Amit',
title:'Weather',
Name:'Amit'})


})

var demo = {
    name : 'Amit',
    age : 20
}
  
app.get('/demo', (req, res)=>{
     res.render('demo', {demo : demo,
        title:'Demo',
        Name:'Amit',})
})

app.get('/about', (req, res)=>{
    console.log(req.query)
    res.render('about', {
        Name:'Amit',
        title : 'About Me'})
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude, longitude, (error, forecastData) => {    // Object destructuring here so earlier code was data.latitude, data.longitude, (error..
            if (error) {
                return res.send({error})
            }
            return res.send({
                forcast:forecastData,location,
                address : req.query.address
            })
        })
    })
    // res.send({
    //     title:'Weather',
    //     temerature: 35,
    //     address:req.query.address
    // })
})


app.get('*',(req,res)=>{
    res.render('404_Page',{
        Name:'Amit',
        title:'Error Page',
        errorMessage:'Page not Found'
    })
})
app.listen(port,()=>{
    console.log('server is working perfectly')
})



// app.get('/',(req,res)=>{
//     res.send('Hello im homepage')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>hello im about</h1>')
// })
