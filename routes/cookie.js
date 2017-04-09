var db = require('../database/database');

module.exports = function (req, res){

    db.checkAuth(req.body.email, req.body.password)
        .then(function (data) {
            req.user_id = data.user_id;
            
            res.cookie('auth', data.token, {httpOnly: true});
            res.send({
                user_id: req.user_id
            });
        })
        .fail(function (error) {
            if (error.type === 'not_found') {
                res.status(403);
            } else {
                res.status(500);
            }
            res.send(error);
        });
};
