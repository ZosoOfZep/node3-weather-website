const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static dreictory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather',
        name: 'Gary Coutts'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title: 'About Me',
        name: 'Gary Coutts'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        message: 'This is the help info for the site.',
        title: 'Help',
        name: 'Gary Coutts'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
    
        if(error)
        {
            return res.send({
                error: 'Geocode Error:-' + error
            })
        }
        
        forecast(latitude,longitude, (error, forecastdata) => {
    
            if(error)
            {
                return res.send({
                    error: 'Forecast Error:-' + error
                })
            }
    
            res.send({
                forecast: forecastdata,
                location: location,
                address:  req.query.address
            })
    
          })
    })



})

app.get('/products',(req,res)=>{

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })

})
app.get('/help/*',(req,res)=>{

    res.render('404',{
        errorMessage: 'Help Article not found',
        title: '404',
        name: 'Gary Coutts'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Page Not Found',
        title: '404',
        name: 'Gary Coutts'
    })
})

app.listen(3000,()=>{

    console.log('Server is up on port 3000')
})