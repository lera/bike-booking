var db = require('../database/database');

module.exports = function (req, res) {

    console.log('USER_ID', req.user_id);

    if (req.params.id) {
        return db.getUser(req.params.id)
            .then(function (data) {
                res.send(data);
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
