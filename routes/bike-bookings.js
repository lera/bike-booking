var db = require('../database/database');

module.exports = function (req, res) {
    if (req.params.id){
        db.getBikesBookings(req.params.id)
            .then(function (data) {
                if (data[0]){
                    res.send(data);
                } else {
                    res.status(404);
                    res.send({
                        status: 404,
                        error: 'Not Found'
                    });
                }
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });
    } else if (req.params.fromTo) {
        var dateFrom = req.params.fromTo.split(',')[0];
        var dateTo = req.params.fromTo.split(',')[1];
        
        db.getAvailableBikes(dateFrom, dateTo)
            .then(function (data) {
                
                res.send(data);
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            }); 
    }
};
