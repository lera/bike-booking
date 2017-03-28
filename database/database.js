const Q = require('q');
const mysql = require('mysql');
const uuidV4 = require('uuid/v4');
var SHA512 = require("crypto-js/sha512");

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
    return query(`SELECT token FROM ${settings.table_auth} WHERE email = ? AND password = ?`, [email, SHA512(password).toString()]).then(single);
};

const checkAuthByToken = function (token){
    return query(`SELECT user_id FROM ${settings.table_auth} WHERE token = ?`, [token]).then(single);
};

const postUser = function (name, surname, address, email, password){
    return query(`INSERT INTO ${settings.table_users} (name, surname, address) VALUES (?, ?, ?)`, [name, surname, address])
        .then(() => query(`INSERT INTO ${settings.table_auth} (user_id, email, password, token) VALUES (LAST_INSERT_ID(), ?, ?, ?)`, [email, SHA512(password).toString(), uuidV4()]));
};

const postBike = function (id, name){
    return query(`INSERT INTO ${settings.table_bikes} (user_id, name) VALUES (?, ?)`, [id, name]);
};

const postBooking = function (user_id, name, dateFrom, dateTill){    
    return query(`SELECT id FROM ${settings.table_bikes} WHERE name = ?`, [name]).then(single)
        .then((result) => query(`INSERT INTO ${settings.table_bookings} (user_id, bike_id, time_range_from, time_range_to) VALUES (?, ?, ?, ?)`, [user_id, result.id, dateFrom, dateTill]));
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
    checkAuthByToken: checkAuthByToken,
    postUser: postUser,
    postBike: postBike,
    postBooking: postBooking
};
	