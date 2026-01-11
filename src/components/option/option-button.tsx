export default function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 rounded-xl border px-5 py-3 text-sm font-bold transition-all duration-200 hover:cursor-pointer active:scale-95 ${
        selected
          ? "border-transparent bg-indigo-500/90 text-white shadow-md shadow-indigo-100 dark:shadow-none"
          : "border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-gray-700 dark:bg-[#25282c] dark:text-gray-400 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10"
      }`}
    >
      {label}
    </button>
  );
}
