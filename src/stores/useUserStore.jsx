import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isVenueManager: false,
      userSubs: null,
      setUser: (user) => set({ user }),
      setIsVenueManager: (value) => set({ isVenueManager: value }),
      clearUser: () => set({ user: null }),
      clearUserSubs: () => set({ userSubs: null }),
      setUserSubs: (userSubs) => set({ userSubs }),
    }),
    {
      name: 'user',
    },
  ),
);
export default useUserStore;

export const useUserVenues = create((set) => ({
  venues: [],
  setVenues: () => set((state) => ({ venues: state.venues })),
}));

export const useToken = () => useUserStore.getState().user?.accessToken;
export const useUser = () => useUserStore.getState().user;
export const useIsVenueManager = () => useUserStore.getState().isVenueManager;

export const useUserActions = () => {
  const { clearUser, setUserSubs, clearUserSubs } = useUserStore();
  const setUser = (user) => useUserStore.setState({ user });
  const setUserAvatar = (avatarUrl) => setUser((prevUser) => ({ ...prevUser, avatar: avatarUrl }));
  const setIsVenueManager = (value) => useUserStore.setState({ isVenueManager: value });

  return { setUser, setUserAvatar,  setIsVenueManager, clearUser, clearUserSubs, setUserSubs };
};

export const useUserName = () => {
  const user = useUser();
  return user ? user.name : null;
};
