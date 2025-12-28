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
        `rounded-md px-4 py-2 transition ${
          isActive ? "bg-muted" : "hover:bg-muted"
        } `
      }
    >
      {label}
    </NavLink>
  );
}
