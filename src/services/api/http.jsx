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
export const deleteVenue = (id, token) => {
    return http.delete(`/venues/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

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
//fetch venues
//register
//make booking
export const createBooking = async (bookingData, token) => {
    try {
        const response = await http.post("/bookings", bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return the data from the response
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error; // re-throw the error for handling in the calling code
    }
};


//post venue