import { create } from "zustand";

const useUser = create((set, get) => ({
  user: { name: "", email: "", gender: null },
  reset: () => set({ user: { name: "", email: "", gender: null } }),

  update: (key, value) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        [key]: value,
      },
    }));
  },
  validate: () => {
    const { name, email, gender } = get().user;
    return name && email && gender;
  },
}));

export default useUser;
