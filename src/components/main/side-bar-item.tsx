import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center rounded-2xl px-6 py-4 transition-all duration-300 ${
          isActive
            ? "bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-200 dark:bg-indigo-600 dark:shadow-indigo-900/40"
            : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-200"
        }`
      }
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {label}
      </span>
    </NavLink>
  );
}
