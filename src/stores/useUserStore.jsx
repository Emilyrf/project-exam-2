import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isVenueManager: false,
      setUser: (user) => set({ user }),
      setIsVenueManager: (value) => set({ isVenueManager: value }),
      clearUser: () => set({ user: null }),
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
  const { setState } = useUserStore();

  // Use utility functions for setting state
  const setUser = (user) => setState({ user });
  const setIsVenueManager = (value) => setState({ isVenueManager: value });
  const clearUser = () => setState({ user: null });

  return { setUser, setIsVenueManager, clearUser };
};

export const useUserName = () => {
  const user = useUser();
  return user ? user.name : null;
};
