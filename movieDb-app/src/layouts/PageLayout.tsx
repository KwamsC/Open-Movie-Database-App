import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface PageLayoutProps {
	children: ReactNode;
	showBackButton?: boolean;
	className?: string;
	isError?: boolean;
}

const PageLayout = ({
	children,
	showBackButton = false,
	className = "",
	isError = false,
}: PageLayoutProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`mx-auto min-h-[70vh] max-w-screen-xl rounded-2xl bg-white/60 px-4 py-8 md:m-6 md:px-6 dark:bg-black/20 ${className}`}
		>
			{showBackButton && !isError && (
				<NavLink
					to=".."
					className="my-4 inline-flex rounded-4xl bg-white shadow-lg px-4 py-3 text-xl hover:bg-white/60 dark:bg-black/20 dark:hover:bg-stone-600"
				>
					← back
				</NavLink>
			)}
			<div
				className={`mx-auto my-10 ${isError ? "max-w-screen-sm text-center" : "max-w-4xl"}`}
			>
				{children}
			</div>
		</motion.div>
	);
};

export default PageLayout;
