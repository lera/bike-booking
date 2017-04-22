const apiUrl = 'http://localhost:3000/api';

const hal = {
    bike: function (bike) {
        return {
            _links: {
                self: {href: `${apiUrl}/bikes/${bike.id}`},
                user: {href: `${apiUrl}/users/${bike.user_id}`}
            },
            id: bike.id,
            name: bike.name
        };
    },

    user: function (user) {
        return {
            _links: {
                self: {href: `${apiUrl}/users/${user.id}`},
                bikes: {href: `${apiUrl}/users/${user.id}/bikes/`},
                bookings: {href: `${apiUrl}/users/${user.id}/bookings/`}
            },
            id: user.id,
            name: user.name,
            surname: user.surname,
            address: user.address
        };
    },

    booking: function (booking){
        return {
            _links: {
                self: {href: `${apiUrl}/bookings/${booking.id}`},
                user: {href: `${apiUrl}/users/${booking.user_id}`},
                bike: {href: `${apiUrl}/bikes/${booking.bike_id}`}
            },
            id: booking.id,
            time_range_from: booking.time_range_from,
            time_range_to: booking.time_range_to
        };
    },
    
    embed: function (resource, name, embed) {
        if (!resource._embedded) {
            resource._embedded = {};
        }
        
        resource._embedded[name] = embed;
    },

    list: function (path, type, items) {
        return {
            _links: {
                self: {href: `${apiUrl}${path}`}
            },
            _embedded: {
                items: items.map(item => hal[type](item))
            }
        };
    }
};

module.exports = hal;
