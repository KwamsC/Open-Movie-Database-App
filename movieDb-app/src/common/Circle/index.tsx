interface CircleProps {
	id: string;
	position: "top-left" | "bottom-right";
	color?: string;
	size?: string;
	margin?: string;
	animationDelay?: string;
}

const Circle = ({
	id,
	position,
	color = "dark:bg-stone-500/30 bg-stone-400/25",
	size = "size-[50vh] md:size-[75vh]",
	margin = "-m-[15vh]",
	animationDelay,
}: CircleProps) => {
	const positionClasses = {
		"top-left": "top-0 left-0",
		"bottom-right": "bottom-0 right-0",
	};

	return (
		<div
			id={id}
			className={`
				${size}
				${margin}
				fixed z-0 rounded-full blur-md 
				${color}
				${positionClasses[position]}
				animate-blob ${animationDelay}`}
		/>
	);
};

export default Circle;
