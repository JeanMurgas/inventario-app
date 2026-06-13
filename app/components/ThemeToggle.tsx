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
    console.log("toggle clicked");

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
      style={{
        padding: "8px 12px",
        marginBottom: "12px",
        cursor: "pointer",
        border: "1px solid gray",
        borderRadius: "6px",
      }}
    >
      {theme === "LIGHT" ? "Modo oscuro" : "Modo claro"}
    </button>
  );
}