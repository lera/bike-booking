const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/auth');

module.exports = function () {
    const app = express.Router();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(authMiddleware);

    app.get('/', require('./routes/home'));

    app.get('/users/:id(\\d+)?', require('./routes/users'));
    
    app.post('/users/', require('./routes/users'));

    app.get('/users/:id/bookings/', require('./routes/user-booking'));
    
    app.get('/users/:id/bikes/', require('./routes/user-bikes'));
    
    app.post('/bikes/', require('./routes/bikes'));

    app.get('/bikes/:id(\\d+)?', require('./routes/bikes'));

    app.get('/bikes/bookings/:fromTo', require('./routes/bike-bookings'));

    app.get('/bookings/:id(\\d+)/', require('./routes/bookings'));
    
    app.delete('/bookings/:id(\\d+)/', require('./routes/bookings'));
    
    app.post('/bookings/', require('./routes/bookings'));

    app.get('/bookings/:from(\\d{4}-\\d{2}-\\d{2}),:to(\\d{4}-\\d{2}-\\d{2})/', require('./routes/bookings'));

    app.post('/login/', require('./routes/cookie'));

    app.get('/logout/', require('./routes/logout'));

    return app;
};
