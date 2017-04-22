console.log('HELLO');

const Superagent = require('superagent');

var login = document.getElementById('login');
var logout = document.getElementById('logout');
var register = document.getElementById('addUser');
var addBike = document.getElementById('addBike');

var userID = null;

login.addEventListener('submit', function(event){
    event.preventDefault();
    
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
    
    Superagent
        .post('http://localhost:3000/api/login/')
        .send({ 
            email: email, 
            password: password 
        })
        .set('Accept', 'application/json')
        .end(function(err, res){
           console.log(err, res);
           userID = res.body.user_id;
        });
})

logout.addEventListener('submit', function(event){
    event.preventDefault();
    
    Superagent
        .get('http://localhost:3000/api/logout/')
        .set('Accept', 'application/json')
        .end(function(err, res){
           console.log(err, res);
        });
});

register.addEventListener('submit', function(event){
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('newEmail').value;
    var password = document.getElementById('newPassword').value;
    
    Superagent
        .post('http://localhost:3000/api/users/')
        .send({ 
            name: name,
            surname: surname,
            address: address,
            email: email, 
            password: password 
        })
        .set('Accept', 'application/json')
        .end(function(err, res){
           console.log(err, res);
        });
});

addBike.addEventListener('submit', function(event){
    event.preventDefault();
    
    var name = document.getElementById('bikeName').value;
    var message = document.getElementById('message');
    
    message.innerHTML = '';
    
    Superagent
        .post('http://localhost:3000/api/bikes/')
        .send({ 
            name: name
        })
        .set('Accept', 'application/json')
        .end(function(err, res){
console.log(err, res);         
           if (res.statusCode === 500){
               message.innerHTML = 'you are not loged in';
           }
        });
});

////////booking

var dateFrom = document.getElementById('dateFrom');
var dateTill = document.getElementById('dateTill');
var getBikes = document.getElementById('getBikes');
var hourFrom = document.getElementById('hourFrom');
var hourTill = document.getElementById('hourTill');
var bikesList = document.getElementById('bikesList');

 var getDate = function (){
    var date = new Date();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    
    return date.getFullYear() + '-' + month + '-' + day;
};

dateFrom.min = getDate();

dateFrom.addEventListener('change', function (event) {
    event.preventDefault();
    
    dateTill.min = dateFrom.value;
});

dateTill.addEventListener('change', function (event) {
    event.preventDefault();
    
    dateFrom.max = dateTill.value;
});

//time of booking
var addHours = function (element){
    for(var i = 0; i <= 23; i++){
        var option = document.createElement("option");
    
        if (i < 10){
            option.innerHTML = "0" + i + ":00";
        } else {
            option.innerHTML = i + ":00";
        }
        element.appendChild(option);
    };
};

addHours(hourFrom);
addHours(hourTill);

getBikes.addEventListener('onreset', function(){
    event.preventDefault();
    
    dateFrom.min = getDate();
    dateTill.max = '';
})

var chosenBike = null;

getBikes.addEventListener('submit', function(event){
    event.preventDefault();
    bikesList.innerHTML = '';
    
    if (dateFrom.value && dateTill.value){
        Superagent
            .get('http://localhost:3000/api/bikes/bookings/' + dateFrom.value + ' ' + hourFrom.value + ',' + dateTill.value + ' ' + hourTill.value)
            .set('Accept', 'application/json')
            .end(function(err, res){
   
                res.body.map(item => {
                    var bike = document.createElement('p');
                    bike.innerHTML = item.name;
                    bike.className = 'bike';
                    bikesList.appendChild(bike);
                })  
                printAvailableBikes(); 
                var button = document.createElement('input');
                button.type = 'button';
                button.value = 'BOOK';
                bikesList.appendChild(button);
                button.addEventListener('click', function(event){
                    event.preventDefault();
                    
                    if (chosenBike){
                        Superagent
                            .post('http://localhost:3000/api/bookings/')
                            .send({ 
                                name: chosenBike,
                                dateFrom: dateFrom.value + ' ' + hourFrom.value,
                                dateTill: dateTill.value + ' ' + hourTill.value
                            })
                            .set('Accept', 'application/json')
                            .end(function(err, res){
console.log(err, res);         
                            });
                    }
                })
            });
    }
});

function printAvailableBikes (){
    var availableBikes = [].slice.call(document.getElementsByClassName('bike'));
    
    if (availableBikes.length) {
        availableBikes.map(item => {
            item.addEventListener('click', function(event){
                event.preventDefault();
                availableBikes.map(item => {
                    if (item.className != 'bike'){
                       item.className = 'bike'; 
                    }
                });
                item.className += ' blue';
                chosenBike = item.innerHTML;
            })
        })
    
    }
}


// get my bookings

const getMyBookings = document.getElementById('getMyBookings');
var myBookings = document.getElementById('myBookings');

getMyBookings.addEventListener('click', function(event){
    event.preventDefault();
    
    Superagent
        .get('http://localhost:3000/api/users/' + userID + '/bookings/')
        .set('Accept', 'application/json')
        .end(function(err, res){
console.log(err, res);  
            res.body.map(item => {
                var bookingID = document.createElement('input'); 
                var buttonDelete = document.createElement('input');
                var buttonChange = document.createElement('input');
                buttonDelete.type = 'button';
                buttonDelete.value = 'delete';
                bookingID.value = 'booking id: ' + item.id;
                bookingID.disabled = true;
                myBookings.appendChild(bookingID);
                myBookings.appendChild(buttonDelete);
                deleteBooking (buttonDelete, item.id, bookingID);
            })      
        });
});

// delete booking
function deleteBooking (element, bookingID, text) {
    element.addEventListener('click', function(event){
        event.preventDefault();
        
        Superagent
            .delete('http://localhost:3000/api/bookings/' + bookingID)
            .set('Accept', 'application/json')
            .end(function(err, res){
console.log(err, res);        
                if (res.body.text === 'deleted'){
                    myBookings.removeChild(element);
                    myBookings.removeChild(text);
                } 
            });
    })
}

// change booking



