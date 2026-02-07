import { create } from "zustand";
import arr from "../constants/Questions.js";

const useStore = create((set, get) => ({
  completed: false,
  data: Array.from({ length: arr.length }, () => ({
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  })),

  update: (num, type, val) => {
    console.log(num, type, val);
    set((state) => {
      const data = [...state.data];
      const row = { ...data[num] };

      for (const [key, value] of Object.entries(row))
        if (value === val) row[key] = 0;

      ((row[type] = val), (data[num] = row));
      return { data };
    });
  },

  getData: () => {
    const res = {
      D: [0, 0],
      I: [0, 0],
      S: [0, 0],
      C: [0, 0],
    };

    const curr = get().data;
    for (let i = 0; i < arr.length; i++) {
      for (const [key, value] of Object.entries(curr[i])) {
        if (value === 1) res[key][0]++;
        if (value === -1) res[key][1]++;
      }
    }

    return res;
  },

  getCompleted: () => {
    let completed = get().completed;
    if (completed) return true;

    const data = get().data;
    completed = true;

    for (let i = 0; i < arr.length; i++) {
      let x = false,
        y = false;
      for (const [key, value] of Object.entries(data[i])) {
        x = x || value == 1;
        y = y || value == -1;
      }

      if (!(x && y)) {
        completed = false;
        break;
      }
    }

    set({ completed });
    return completed;
  },

  storeReset: () => {
    set({
      completed: false,
      data: Array.from({ length: arr.length }, () => ({
        D: 0,
        I: 0,
        S: 0,
        C: 0,
      })),
    });
  },
}));

export default useStore;
