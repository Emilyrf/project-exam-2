import axios from 'axios'

const http = axios.create({
    baseURL: 'https://nf-api.onrender.com/api/v1/holidaze',
})

export const login = (email, password) => {
    return http.post("/auth/login", {
        email: email,
        password: password,
    });
};

export const updateProfileMedia = (token, userName, newAvatarUrl) => {
    return http.put(`/profiles/${userName}/media`, {
        avatar: newAvatarUrl
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const fetchUserVenues = (token, user) => {
    return http.get(`/profiles/${user.name}/venues`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchBookings = (token, user) => {
    return http.get(`/profiles/${user.name}/bookings?_venue=true`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteBooking = (id, token) => {
    return http.delete(`/bookings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}