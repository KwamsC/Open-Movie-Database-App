interface CircleProps {
	id: string;
	position: "top-left" | "bottom-right";
	color?: string;
	size?: string;
	margin?: string;
}

const Circle = ({
	id,
	position,
	color = "bg-stone-600",
	size = "size-[70vh]",
	margin = "-m-[20vh]",
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
