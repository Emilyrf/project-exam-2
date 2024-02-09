import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isVenueManager: false,
      userSubs: null, // Add userSubs here
      setUser: (user) => set({ user }),
      setIsVenueManager: (value) => set({ isVenueManager: value }),
      clearUser: () => set({ user: null }),
      clearUserSubs: () => set({ userSubs: null }), // Add this function
      setUserSubs: (userSubs) => set({ userSubs }),
    }),
    {
      name: 'user',
    }
  )
);
export default useUserStore;

export const useToken = () => useUserStore.getState().user?.accessToken;
export const useUser = () => useUserStore.getState().user;
export const useIsVenueManager = () => useUserStore.getState().isVenueManager;

export const useUserActions = () => {
  const { clearUser, setUserSubs, clearUserSubs } = useUserStore();

  // Use utility functions for setting state
  const setUser = (user) => useUserStore.setState({ user });
  const setIsVenueManager = (value) => useUserStore.setState({ isVenueManager: value });

  return { setUser, setIsVenueManager, clearUser, clearUserSubs, setUserSubs };
};

export const useUserName = () => {
  const user = useUser();
  return user ? user.name : null;
};
