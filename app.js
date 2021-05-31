window.addEventListener('load', () => { //once page loads, will gather geolocation information!
    let lon;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f16fda48f4492d5907280b0b72cb154`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main; //easier way to write data.main.temp! 
                const description = data.weather[0].description; //since weather was an ARRAY and not an object (like data.main), need to first access array then access object property!
                const {country} = data.sys;
                
                let cel = temp -273.15
                let feren = (temp - 32) * (5/9);

                temperatureDegree.textContent = Math.floor(cel); //converting kelvin to celsius!
                temperatureDescription.textContent = description;
                locationTimezone.textContent = `Location: ${country}`;
                
                
                
                console.log(temperatureSpan);
                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(cel);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(cel * 9/5 + 32);
                    }
                })  
                
            });
        });
    } else {
        console.log("hi");
    }

    
})