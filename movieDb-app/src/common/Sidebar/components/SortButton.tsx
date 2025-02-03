interface SortButtonProps {
	label: string;
	field: "title" | "year";
	currentField: string;
	direction: "asc" | "desc";
	onClick: () => void;
}

const SortButton = ({
	label,
	field,
	currentField,
	direction,
	onClick,
}: SortButtonProps) => (
	<button
		type="button"
		onClick={onClick}
		className={`rounded-lg px-3 py-1 text-xs transition-all ${
			currentField === field
				? "bg-black/20 dark:bg-white/20"
				: "bg-white/20 dark:bg-black/20"
		}`}
	>
		{label} {currentField === field && (direction === "asc" ? "↑" : "↓")}
	</button>
);

export default SortButton;
