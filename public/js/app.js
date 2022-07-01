
fetch('http://puzzle.mead.io/puzzle').then((response) =>
    response.json()).then((data) => {
        console.log(data)

    });

// fetch('http://puzzle.mead.io/puzzle')
// .then((response)=>{ response.json().then((data)=>{
//     console.log(data)
//     })
// })

// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=pk.eyJ1IjoicmFuZG9tdXNlcm5hbWUxMyIsImEiOiJjbDRwbDNtd2gwZnA3M2ptd3djM2d5MzZoIn0.IagWlb5zQXqt3b4r9Y7F-Q')
// .then((response)=> response.json()).then((data)=>{
//     console.log(data)
//     })



const weatherForm = document.querySelector('form');
const inputForm = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = inputForm.value
    message1.textContent = 'Loading'
    message2.textContent = ''

    fetch('/weather?address=' + location)   //earlier http://localhost:3000/weather?address.. but changed bcz of server to auto detect heroku or localhost
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forcast

                }


            })
        })

})


