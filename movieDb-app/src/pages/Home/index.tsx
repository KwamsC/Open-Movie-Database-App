import { motion } from "motion/react";

const Home = () => {
  const ENV = import.meta.env.VITE_NODE_ENV;

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative w-full max-w-4xl py-16 text-center backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-8 mt-10"
			>
				<h1 className="text-4xl font-bold mb-4">Explore Movies</h1>
				<div className="flex justify-center gap-4">
					<div>{ENV}</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
