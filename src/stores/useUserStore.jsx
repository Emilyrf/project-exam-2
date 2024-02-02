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
    }),
    {
      name: 'user',
    },
  ),
);

export const useToken = () => useUserStore((state) => state.user?.accessToken);
export const useUser = () => useUserStore((state) => state.user);
export const useIsVenueManager = () => useUserStore((state) => state.isVenueManager);

export const useUserActions = () => {
  const { setUser,setIsVenueManager, clearUser } = useUserStore();
  return { setUser, setIsVenueManager,  clearUser };
};

export const useUserName = () => {
  const user = useUser();
  return user ? user.name : null;
};
