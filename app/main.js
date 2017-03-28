console.log('HELLO');

const Superagent = require('superagent');

var login = document.getElementById('login');
var logout = document.getElementById('logout');
var register = document.getElementById('addUser');
var addBike = document.getElementById('addBike');

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
var bookBike = document.getElementById('bookBike')

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

bookBike.addEventListener('onreset', function(){
    event.preventDefault();
    
    dateFrom.min = getDate();
    dateTill.max = '';
})

bookBike.addEventListener('submit', function(event){
    event.preventDefault();
    
    if (dateFrom.value && dateTill.value){
        var bikeName = document.getElementById('bike').value;
    
        Superagent
            .post('http://localhost:3000/api/bookings/')
            .send({ 
                name: bikeName,
                dateFrom: dateFrom.value,
                dateTill: dateTill.value
            })
            .set('Accept', 'application/json')
            .end(function(err, res){
console.log(err, res);         
            });
    }
});
