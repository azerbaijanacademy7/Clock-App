// let myCityIP = [];
// fetch('https://freegeoip.app/json/').then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data);
//     myCityIP.push(data.ip)
//     console.log(myCityIP)

//   }).catch(function() {
//     console.log("Booo");
//   });

//   fetch(`http://worldtimeapi.org/api/ip/${myCityIP}`).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data);
//   }).catch(function() {
//     console.log("Booo");
//   });
var mainElement = document.getElementById('main-wrapper');
var refreshIcon = document.getElementById('refresh-icon');

let randomValue = Math.random()*1000;
randomValue= Math.round(randomValue);
console.log(randomValue);
quoteCall(randomValue);

refreshIcon.addEventListener('click', function(){
    randomValue = Math.random()*1000;
    randomValue= Math.round(randomValue);
    quoteCall(randomValue)
    return randomValue;
})

document.getElementById('more-btn').addEventListener('click', function(){
    btnState = "More" ? "Less" : "More";
    if(document.getElementById('btn').innerHTML=="More"){
        document.getElementById('btn').innerHTML = "Less";
        document.getElementById('btn-icon').src = "./assets/desktop/icon-arrow-up.svg";
        document.getElementById('quotes').style.display = 'none';
        document.getElementById('more-sect').style.display = 'block';
        document.getElementById('clock-wrapper').classList.remove('clock_wrapper_more');
        document.getElementById('clock-wrapper').classList.add('clock_wrapper_less');    
    }
    else{
        document.getElementById('btn').innerHTML = "More";
        document.getElementById('btn-icon').src = "./assets/desktop/icon-arrow-down.png";
        document.getElementById('quotes').style.display = 'block';
        document.getElementById('more-sect').style.display = 'none';
        document.getElementById('clock-wrapper').classList.add('clock_wrapper_more');
        document.getElementById('clock-wrapper').classList.remove('clock_wrapper_less');   
    }
})

function quoteCall(randomValue){
    fetch('https://type.fit/api/quotes').then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById('quotes-text').innerHTML = '"' + data[randomValue].text + '"'
        document.getElementById('quotes-author').innerHTML = data[randomValue].author
        console.log(data[randomValue]);
    }).catch(function() {
        console.log("error!");
    });
}


// let myCityIP;
// let timeCity;

// fetch('https://freegeoip.app/json/').then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data);
//     myCityIP = data.ip;
//     console.log(myCityIP)
    
//     fetch(`http://worldtimeapi.org/api/ip/${myCityIP}`).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         console.log(data.datetime);
//         timeCity = data.datetime;
//         // return timeCity;
//     }).catch(function() {
//         console.log("Booo");
//     });
//     return myCityIP;
//   }).catch(function() {
//     console.log("Booo");
//   });
//   console.log(myCityIP)






let timeCity;
let myCityIP;
fetch('https://freegeoip.app/json/')
    .then(function(response) {
          if(response.ok) {
              response.json().then(function(data) {
                console.log(data)
                var timeZone = data.time_zone;
                var cityName = data.city;
                var countryName = data.country_name;
                myCityIP = data.ip;
                // apicall(myCityIP);
                fetch(`http://worldtimeapi.org/api/ip/${myCityIP}`).then(function(response) {
                    return response.json();
                }).then(function(data) {console.log(data)
                    let unix_timestamp = data.unixtime;
                    var date = new Date(unix_timestamp * 1000);
                    var hours = "0" + date.getHours();
                    var minutes = "0" + date.getMinutes();

                    var formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
                    // console.log(data.datetime);
                    // timeCity = data.datetime;
                    var goodTime;
                    if(hours>=6&&hours<=17){
                        goodTime = "Good Morning";
                    }
                    else{
                        goodTime = "Good Evening";
                    }

                    if(goodTime=="Good Morning"){
                        document.getElementById('good-time-icon').src = "./assets/desktop/icon-sun.svg";
                        mainElement.classList.add('main_daytime');
                        document.getElementById('more-sect').style.backgroundColor = 'rgba(255,255,255,0.75)';
                        document.getElementById('more-sect').style.color = '#303030';
                    }
                    else{
                        document.getElementById('good-time-icon').src = "./assets/desktop/icon-moon.svg"
                        mainElement.classList.add('main_nighttime');
                        document.getElementById('more-sect').style.backgroundColor = 'rgba(0,0,0,0.75)';
                        document.getElementById('more-sect').style.color = '#fff';
                        // document.getElementById('main').style.backgroundImage = url('./assets/mobile/bg-image-nighttime.jpg');
                    }
                    // mainElement.style.backgroundImage =  goodTime = "Good Evening" ? URL('./assets/mobile/bg-image-nighttime.jpg') : URL('./assets/mobile/bg-image-daytime.jpg')
                    document.getElementById('good-time').innerHTML = goodTime;
                    document.getElementById('clock-time').innerHTML = formattedTime
                    console.log(cityName)
                    cityName = " " ? "Baku" : cityName
                    document.getElementById('time-region').innerHTML = 'in ' + cityName + ', ' + countryName;
                    document.getElementById('time-zone').innerHTML = timeZone;
                    document.getElementById('day-of-year').innerHTML = data.day_of_year;
                    document.getElementById('day-of-week').innerHTML = data.day_of_week;
                    document.getElementById('week-number').innerHTML = data.week_number;
                }).catch(function() {
                            console.log("Error happpened!!!");
                        });
              });
          } else {
              console.log("response failed!");
          }
    });

