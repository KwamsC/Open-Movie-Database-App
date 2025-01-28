interface CircleProps {
	position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	size?: string;
	color?: string;
	margin?: string;
}

const Circle = ({
	position,
	size = "60vh",
	color = "bg-stone-600",
	margin = "-20vh",
}: CircleProps) => {
	const positionClasses = {
		"top-left": "top-0 left-0",
		"top-right": "top-0 right-0",
		"bottom-left": "bottom-0 left-0",
		"bottom-right": "bottom-0 right-0",
	};

	return (
		<div
			className={`
        h-[${size}] 
        w-[${size}] 
        -m-[${margin}] 
        rounded-full 
        fixed 
        z-0 
        ${color}
        ${positionClasses[position]}
      `}
		/>
	);
};

export default Circle;
