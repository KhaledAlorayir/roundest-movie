import type { Movie } from "@prisma/client";
import { create } from "zustand";

interface MoviesStore {
  movies: Movie[];
  appeared: string[];
  setMovies: (movies: Movie[]) => void;
  setAppeared: (ids: string[]) => void;
}

export const useMovies = create<MoviesStore>((set) => ({
  movies: [],
  appeared: [],
  setAppeared: (ids) => {
    set((store) => ({ appeared: [...store.appeared, ...ids] }));
  },
  setMovies: (movies) => {
    set({ movies });
  },
}));
