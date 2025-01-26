import { motion } from "motion/react";

const Home = () => {
	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative w-full max-w-4xl py-16 text-center backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-8 mt-10"
			>
				<h1 className="text-4xl font-bold mb-4">Explore Movies</h1>
				<div className="flex justify-center gap-4">
					<div>hallo</div>
					<div>World</div>
				</div>
			</motion.div>
			<div>Home</div>
		</div>
	);
};

export default Home;
