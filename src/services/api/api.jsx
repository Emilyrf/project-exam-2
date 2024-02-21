import http from './http';
import * as endpoints from './endpoints';

// Authentication
export const registerUser = async (profile) => {
  try {
    const response = http.post(endpoints.AUTH_REGISTER_ENDPOINT, profile);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors[0].message;
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error('User registration failed. Please try again.');
    }
  }
};

export const login = (email, password) => {
  return http.post(endpoints.AUTH_LOGIN_ENDPOINT, {
    email: email,
    password: password,
  });
};

// Profile
export const updateProfileMedia = (token, userName, newAvatarUrl) => {
  return http.put(
    endpoints.UPDATE_PROFILE_MEDIA_ENDPOINT(userName),
    {
      avatar: newAvatarUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

// Venues
export const fetchVenues = async () => {
  try {
    const response = await http.get(endpoints.VENUES_ENDPOINT);
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      const errorMessage = error.response.data.errors[0].message;
      throw new Error(`Error fetching venues: ${errorMessage}`);
    } else {
      throw new Error(`Error fetching venues`);
    }
  }
};

export const fetchSingleVenue = async (id) => {
  try {
    const response = await http.get(endpoints.SINGLE_VENUE_ENDPOINT(id));
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const fetchUserVenues = (token, user) => {
  return http.get(endpoints.USER_VENUES_ENDPOINT(user.name), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVenue = (id, token) => {
  return http.delete(endpoints.DELETE_VENUE_ENDPOINT(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createVenue = (token, venueData) => {
  return http.post(endpoints.CREATE_VENUE_ENDPOINT, venueData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const updateVenue = async (id, token, venueData) => {
  try {
    const response = await http.put(endpoints.UPDATE_VENUE_ENDPOINT(id), venueData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      const errorMessage = error.response.data.errors[0].message;
      throw new Error(`Update venue failed: ${errorMessage}`);
    } else {
      throw new Error(`Update venue failed`);
    }
  }
};

// Bookings
export const fetchBookings = (token, user) => {
  return http.get(endpoints.USER_BOOKINGS_ENDPOINT(user.name), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBooking = (id, token) => {
  return http.delete(endpoints.DELETE_BOOKING_ENDPOINT(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBooking = async (bookingData, token) => {
  try {
    const response = await http.post(endpoints.CREATE_BOOKING_ENDPOINT, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
