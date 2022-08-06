import create from 'zustand';

interface IStore {
  user: { name: string } | null;
  setUser: (name: string | null) => void;
}

const useStore = create<IStore>((set) => ({
  user: null,
  setUser: (name: string | null) => {
    if (name) {
      set((state) => ({
        ...state,
        user: { name },
      }));
    } else {
      set((state) => ({
        ...state,
        user: null,
      }));
    }
  },
}));

export default useStore;
