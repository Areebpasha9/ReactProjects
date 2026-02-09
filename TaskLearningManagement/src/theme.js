export const setTheme = (theme) => {
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(theme);
  localStorage.setItem("theme", theme);
};

export const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
};

export const initTheme = () => {
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
};
