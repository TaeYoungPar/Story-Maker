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
      className={`rounded-md border px-4 py-2 text-sm transition ${
        selected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}
