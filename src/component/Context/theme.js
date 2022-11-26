import { createContext } from "react";

export const THEMES = {
  light: {
    name: "light",
    sideBar: "bg-white",
    background: "bg-blue-50",
    inputs: "bg-white",
    formHead: "bg-sky-400",
    formRow1: "bg-gray-200",
    formRow2: "bg-white",
  },
  dark: {
    name: "dark",
    background: "bg-slate-700",
    sideBar: "bg-slate-800",
    inputs: "bg-slate-800",
    font: "text-gray-200",
    formHead: "bg-sky-900",
    formRow1: "bg-stone-800",
    formRow2: "bg-stone-700",
  },
};

const themeContext = createContext({
  theme: THEMES.dark,
});

export default themeContext;
