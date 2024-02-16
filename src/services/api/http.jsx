import axios from 'axios'

const http = axios.create({
    baseURL: 'https://nf-api.onrender.com/api/v1/holidaze',
})

// const http2 = axios.create({
//     baseURL: 'https://v2.api.noroff.dev/holidaze',
// })

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

//VENUES
export const fetchSingleVenue = async (id) => {
    try {
        const response = await http.get(`/venues/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error editing venue", error);
        throw error;
    }
};

export const fetchUserVenues = (token, user) => {
    return http.get(`/profiles/${user.name}/venues?_bookings=true`, {
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

export const createVenue = (token, venueData) => {
    return http.post(`/venues`, venueData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};
// export const createVenue = (token, venueData) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`, // Ensure token is correctly formatted
//             'Content-Type': 'application/json',
//         },
//     };

//     return http2.post(`/venues`, venueData, config) // Pass config object to include headers
//         .then(response => {
//             return response.data; // Return the response data if the request is successful
//         })
//         .catch(error => {
//             // Handle error
//             console.error('Error creating venue:', error);
//             throw error; // Rethrow the error to be handled by the caller
//         });
// };

// export const editVenue = (id, token, venueData) => {
//     return http.put(`/venues/${id}`, venueData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
// };

//BOOKINGS
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