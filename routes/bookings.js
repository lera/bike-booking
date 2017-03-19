var db = require('../database/database');

module.exports = function (req, res) {
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
        db.getBookingsByRange(req.params.from, req.params.to)
            .then(function (data) {
                res.send(data);
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });
    }
};
