var db = require('../database/database');
var hal = require('../hal');

module.exports = function (req, res) {

console.log('USER_ID', req.user_id);

    if (req.params.id && req.method === 'GET') {
        return db.getUser(req.params.id)
            .then(function (data) {
                res.send(hal.user(data));
            })
            .fail(function (error) {
                if (error.type === 'not_found') {
                    res.status(404);
                } else {
                    res.status(500);
                }
                res.send(error);
            });
    } else if (req.method === 'POST'){
        return db.postUser(req.body.name, req.body.surname, req.body.address, req.body.email, req.body.password)
            .then(function () {
                res.send({});
            })
            .fail(function (error) {
                if (error.type === 'not_found') {
                    res.status(404);
                } else {
                    res.status(500);
                }
                res.send(error);
            });
    }

    db.getUsers()
        .then(function (data) {
            res.send(data);
        })
        .fail(function (error) {
            res.status(500);
            res.send(error);
        });

};
