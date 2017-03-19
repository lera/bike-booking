
module.exports = function (req, res){

    res.cookie('auth', null, {maxAge: -10000});
    res.send({});
};
