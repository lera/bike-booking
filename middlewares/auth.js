var db = require('../database/database');

module.exports = function (req, res, next){
    
    req.user_id = null;
   
    if (req.cookies.auth) {
        return db.checkAuthByToken(req.cookies.auth)
            .then(function (data) {            
                req.user_id = data.user_id;
                
                next();
            })
            .fail(function (error) {
                next();
            });
    }
    
    next();
};