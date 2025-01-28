interface SidebarToggleButtonProps {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
}
const SidebarToggleButton = ({
	isSidebarOpen,
	setIsSidebarOpen,
}: SidebarToggleButtonProps) => {
	return (
		<button
			type="button"
			onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			className="fixed top-6 left-4 z-70 p-2 rounded-lg md:hidden"
			aria-label="Toggle Sidebar"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<title>Toggle bar</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
				/>
			</svg>
		</button>
	);
};

export default SidebarToggleButton;
