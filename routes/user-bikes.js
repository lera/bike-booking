var db = require('../database/database');

module.exports = function (req, res) {
    
        if (req.method === 'GET'){
            db.getUserBikes(req.params.id)
                .then(function (data) {
                    if (data[0]){
                        res.send(data);
                    } else {
                        res.send('has no bikes');
                    }
                    
                })
                .fail(function (error) {
                    res.status(500);
                    res.send(error);
                });  
        } 
    
};
