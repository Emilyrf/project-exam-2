import axios from 'axios';
import { useToken, useUserName } from '../../stores/useUserStore';
import useUserStore from '../../stores/useUserStore';
import { useUserVenues } from '../../stores/useUserStore';

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/holidaze/venues/';
// const { setVenues } = useUserVenues();

export const fetchVenues = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const fetchSingleVenue = async (venueId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${venueId}?_owner=true&_bookings=true`);
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const registerUser = async (profile) => {
  try {
    const response = await axios.post(
      `https://nf-api.onrender.com/api/v1/holidaze/auth/register`,
      profile,
    );
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

export const loginUser = async (profile) => {
  try {
    const response = await axios.post(
      `https://nf-api.onrender.com/api/v1/holidaze/auth/login`,
      profile,
    );

    var resposta = ''

    if (response.data.venueManager) {
      resposta = await UsersVenues(response.data.name, response.data.accessToken);
      // useUserVenues.setVenues(resposta)
    } else {
      resposta = await UsersBookings(response.data.name, response.data.accessToken);
    }
    console.log(resposta);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors[0].message;
      throw new Error(`${errorMessage}`);
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

export const UsersVenues = async (name, token) => {
  // const token = token;

  try {
    const response = await axios.get(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/venues`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const UsersBookings = async (name, token) => {
  // const token = useToken();


  try {
    const response = await axios.get(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

export const updateProfileMedia = async (newAvatarUrl) => {
  const token = useToken();
  const userName = useUserName();
  const setUserSubs = useUserStore.getState().setUserSubs;

  try {
    const response = await axios.put(
      `https://nf-api.onrender.com/api/v1/holidaze/profiles/${userName}/media`,
      { avatar: newAvatarUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUserSubs(response.data);

    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};



// export const API_MANAGER_ENDPOINT = `?_bookings=true&_venues=true`;

// export const API_CUSTOMER_ENDPOINT = `?_bookings=true`;

// export const API_PROFILES = `https://nf-api.onrender.com/api/v1/holidaze/profiles/`;

// export const API_VENUES = `https://nf-api.onrender.com/api/v1/holidaze/venues?_owner=true&_bookings=true`;

// export const API_VENUES_PGN = `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=10&sort=rating&sortOrder=desc&_owner=true&offset=`; //sort=rating&sortOrder=desc&

// export const API_VENUES_SRT = (limit, offset, sort, sortOrder) =>
//   `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=${limit}&offset=${offset}&sort=${sort}&sortOrder=${sortOrder}&_owner=true`;

// export const API_CREATE = `https://nf-api.onrender.com/api/v1/holidaze/venues`;

// export const API_FETCH_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

// export const API_VENUE_PARAMS = `?_owner=true&_bookings=true`;

// export const API_EDIT_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

// export const API_DELETE_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

// export const API_ALL_BOOKINGS = `https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true`;

// export const API_CREATE_BOOKING = `https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true`;

// export const API_BOOKING_ID = `https://nf-api.onrender.com/api/v1/holidaze/bookings/?_customer=true&_venue=true`;

// export const API_DELETE_BOOKING = `https://nf-api.onrender.com/api/v1/holidaze/bookings/`;

// export const API_BOOKINGS_TRUE = "/venues?_owner=true&_bookings=true";
