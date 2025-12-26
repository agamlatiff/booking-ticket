"use client";

export default function DashboardThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      onClick={toggleTheme}
    >
      <span className="material-symbols-outlined text-gray-500 block dark:hidden">dark_mode</span>
      <span className="material-symbols-outlined text-gray-500 hidden dark:block">light_mode</span>
    </button>
  );
}
