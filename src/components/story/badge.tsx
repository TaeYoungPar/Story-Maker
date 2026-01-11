export default function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "red" | "gray";
}) {
  const styles = {
    green:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    gray: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  };
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${styles[color]}`}
    >
      {children}
    </span>
  );
}
