const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault() 

    const location = searchElement.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{

    response.json().then((data) => {

        if(data.error)
        {
            messageOne.textContent = data.error

        }
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.description    
            messageThree.textContent = ' Actual Temperature: ' + data.forecast.temperature + '      Feels Like: ' + data.forecast.tempfeelslike
            messageFour.textContent = ' Humidity: ' + data.forecast.humidity
        }
    })
})
})