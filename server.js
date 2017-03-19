const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(authMiddleware);

app.get('/', require('./routes/home'));

app.get('/users/:id(\\d+)?', require('./routes/users'));

app.get('/users/:id/bookings/', require('./routes/user-booking'));

app.get('/users/:id/bikes/', require('./routes/user-bikes'));

app.get('/bikes/:id(\\d+)?', require('./routes/bikes'));

app.get('/bikes/:id/bookings/', require('./routes/bike-bookings'));

app.get('/bookings/:id(\\d+)/', require('./routes/bookings'));

app.get('/bookings/:from(\\d{4}-\\d{2}-\\d{2}),:to(\\d{4}-\\d{2}-\\d{2})/', require('./routes/bookings'));

app.post('/login/', require('./routes/cookie'));

app.get('/logout/', require('./routes/logout'));

app.listen(3000, function () {
    console.log('\nWeb server started http://localhost:3000\n');
});
