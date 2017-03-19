const Q = require('q');
const mysql = require('mysql');

const settings = {
    table_users: 'Users',
    table_bookings: 'Bookings',
    table_bikes: 'Bikes',
    table_auth: 'Auth'
};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpw',
    database : 'bikeBooking'
});

const query = function (selector, params){
    return Q.promise(function (resolve, reject) {
        if (params){
            connection.query(selector, params, function (err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        } else {
            connection.query(selector, function (err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }
    });
}

const single = function (list) {
    if (list.length === 0) {
        return Q.reject({
            type: 'not_found'
        });
    }

    return list[0];
};

const getUser = function(userId){
    return query(`SELECT * FROM ${settings.table_users} WHERE id = ?`, [userId]).then(single);
};
const getUsers = function(){
    return query(`SELECT * FROM ${settings.table_users}`);
};

const getUserBookings = function(userId){
    return query(`SELECT * FROM ${settings.table_bookings} WHERE user_id = ?`, [userId]);
};

const getUserBikes = function(userId){
    return query(`SELECT * FROM ${settings.table_bikes} WHERE user_id = ?`, [userId]);
};

const getBikes = function(){
    return query(`SELECT * FROM ${settings.table_bikes}`);
};

const getBike = function(bikeId){
        return query(`SELECT * FROM ${settings.table_bikes} WHERE id = ?`, [bikeId]).then(single);
};

const getBikesBookings = function(bikeId){
    return query(`SELECT * FROM ${settings.table_bookings} WHERE bike_id = ?`, [bikeId]);
};

const getBookings = function(bookingId){
    return query(`SELECT * FROM ${settings.table_bookings} WHERE id = ?`, [bookingId]);
};

const getBookingsByRange = function (rangeFrom, rangeTo){
    return query(`SELECT * FROM ${settings.table_bookings} WHERE time_range_from >= ? AND time_range_to >= ?`, [rangeFrom, rangeTo]);
}

const checkAuth = function (email, password){
    return query(`SELECT token FROM ${settings.table_auth} WHERE email = ? AND password = ?`, [email, password]).then(single);
};

const checkAuthByToken = function (token){
    return query(`SELECT user_id FROM ${settings.table_auth} WHERE token = ?`, [token]).then(single);
};



module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    getUserBookings: getUserBookings,
    getUserBikes: getUserBikes,
    getBikes: getBikes,
    getBike: getBike,
    getBikesBookings: getBikesBookings,
    getBookings: getBookings,
    getBookingsByRange: getBookingsByRange,
    checkAuth: checkAuth,
    checkAuthByToken: checkAuthByToken
};
