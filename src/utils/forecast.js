const request = require('postman-request')

const forecast = (latitude,longitude, callback)=> {


    const url='http://api.weatherstack.com/current?access_key=d6cd12110ea14702ff3aabad11be462e&query='+ latitude + ',' + longitude + '&units=m'

    request({url, json: true},(error,{body})=>{

        if(error)
        {
            callback('Unable to connect to weather service')
        }
        
        else if(body.error)
        {
            callback(body.error.info)
        }
        else
        {
        
            callback(undefined, {       
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,

            })
        }
    })
}


module.exports = forecast