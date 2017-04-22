var db = require('../database/database');
var hal = require('../hal');

module.exports = function (req, res) {

    if (req.method === 'GET'){
        db.getUserBikes(req.params.id)
            .then(function (data) {
                res.send(hal.list(req.url, 'bike', data));
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });
    }

};
