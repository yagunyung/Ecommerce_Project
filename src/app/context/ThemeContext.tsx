"use client";

import { createContext, useEffect, useState } from "react";

type ThemeType = {
  theme: "lightTheme" | "darkTheme";
  handleToggle: () => void;
};

export const ThemeContext = createContext<ThemeType>({
    theme: "lightTheme",
    handleToggle: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"lightTheme" | "darkTheme">("lightTheme");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
    if (localTheme) {
        if (localTheme === "lightTheme") {
            setTheme("lightTheme")
            document.querySelector("html")?.setAttribute("data-theme", localTheme)
        } else {
            setTheme("darkTheme")
            document.querySelector("html")?.setAttribute("data-theme", localTheme)
        }
    }
  }, [theme])

  const handleToggle = () => {
    setTheme(theme === "lightTheme" ? "darkTheme" : "lightTheme")
    localStorage.setItem("theme", theme === "lightTheme" ? "darkTheme" : "lightTheme")
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
