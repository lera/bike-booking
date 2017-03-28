var db = require('../database/database');

module.exports = function (req, res) {
    
    if (req.method === 'GET'){
        if (req.params.id){
            return db.getBike(req.params.id)
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
        db.getBikes()
            .then(function (data) {
                res.send(data);
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });
    } else if (req.method === 'POST'){
        return db.postBike(req.user_id, req.body.name)
            .then(function (data) {
                res.send({ 
                    text: 'succes'
                });
            })
            .fail(function (error) {
                res.status(500);
                res.send(error);
            });  
    }
};
