var db = require('../database/database');

module.exports = function (req, res) {
    if (req.method === 'GET'){
        if (req.params.id) {
            db.getBookings(req.params.id)
                .then(function (data) {
                    res.send(data);
                })
                .fail(function (error) {
                    res.status(500);
                    res.send(error);
                }); 
        } else if (req.params.from && req.params.to) {
            db.getBookingsByRange(req.body.dateFrom, req.body.dateTill)
                .then(function (data) {
                    res.send(data);
                })
                .fail(function (error) {
                    res.status(500);
                    res.send(error);
                });
        }
    } else if (req.method === 'POST'){
        db.postBooking(req.user_id, req.body.name, req.body.dateFrom, req.body.dateTill)
            .then(function (data) {
                res.send({ 
                    text: 'succes'
                });
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            }); 
    } else if (req.method === 'DELETE'){
        db.deleteBooking(req.user_id, parseInt(req.params.id))
            .then(function (data) {
                res.send({ 
                    text: 'deleted'
                });
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            }); 
    }
    
};
