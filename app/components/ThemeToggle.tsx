"use client";

import { useEffect, useState } from "react";
import { updateTheme } from "../actions/users";

type Theme = "LIGHT" | "DARK";

export default function ThemeToggle({
  currentTheme,
}: {
  currentTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  function applyTheme(newTheme: Theme) {
    const root = document.documentElement;

    if (newTheme === "DARK") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  async function handleToggle() {
    const newTheme = theme === "LIGHT" ? "DARK" : "LIGHT";

    setTheme(newTheme);
    applyTheme(newTheme);

    const formData = new FormData();
    formData.append("theme", newTheme);

    await updateTheme(formData);
  }

  return (
    <button 
      type="button"
      onClick={handleToggle}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      {theme === "LIGHT"
        ? "🌙 Cambiar a modo oscuro"
        : "☀️ Cambiar a modo claro"}
    </button>
  );
}