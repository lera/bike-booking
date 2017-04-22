var Q = require('q');
var db = require('../database/database');
var hal = require('../hal');

module.exports = function (req, res) {
    if (req.user_id === parseInt(req.params.id)){
        db.getUserBookings(req.params.id)
            .then(function (bookings) {
                const bookingsHal = hal.list(req.url, 'booking', bookings);
                
                const embedBike = req.query._embedded && req.query._embedded.split(',').indexOf('bike') > -1;
                const embedUser = req.query._embedded && req.query._embedded.split(',').indexOf('user') > -1;

                if (embedBike || embedUser) {
                    const promises = [];
                    
                    bookings
                        .forEach(function (booking, i) {
                            const bookingHal = bookingsHal._embedded.items[i];
                            
                            if (embedBike) {
                                const promise = db.getBike(booking.bike_id)
                                    .then(function (bike) {
                                        const bikeHal = hal.bike(bike);
                                        
                                        hal.embed(bookingHal, 'bike', bikeHal);
                                    }); 
                                    
                                promises.push(promise);
                            } 
                            if (embedUser) {
                                const promise = db.getUser(booking.user_id)
                                    .then(function (user) {
                                        const userHal = hal.user(user);
                                        
                                        hal.embed(bookingHal, 'user', userHal);
                                    }); 
                                    
                                promises.push(promise);
                            }
                            
                            
                        });
    
                    return Q.all(promises)
                        .then(results => {
                            return bookingsHal;
                        });
                }
                
                return bookingsHal;
            })
            .then(function (bookingsHal) {
                res.send(bookingsHal);
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });
    } else {
        res.status(403);
        res.send({});
    }

};
