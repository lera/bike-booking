var db = require('../database/database');

module.exports = function (req, res) {
    if (req.user_id === parseInt(req.params.id)){
        db.getUserBookings(req.params.id)
            .then(function (data) {
                if (data[0]){
                    res.send(data);
                } else {
                    res.send('has no bookings');
                }
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
