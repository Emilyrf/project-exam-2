import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export const useStore = create(
    persist((set) => ({
        token: null,
        setToken: (token) => set(() => ({ token: token })),
        user: {
            name: null,
            email: null,
            avatar: null,
            venueManager: false
        },
        setUser: (user) => set(() => ({ user: user })),
        venues: [],
        setVenues: (venues) => set(() => ({ venues: venues })),
        bookings: [],
        setBookings: (bookings) => set(() => ({ bookings: bookings })),
        selectedDateRange: {},
        setSelectedDateRange: (dateRange) => set(() => ({ selectedDateRange: dateRange })),
        clearStore: () => set(() => ({ 
            token: null, 
            user: null, 
            selectedDateRange: {}, 
            venues: [], 
            bookings: [] 
        }))
    }),
        {
            name: 'store'
        },
    )
);


