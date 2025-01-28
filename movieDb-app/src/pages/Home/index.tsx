import { motion } from "motion/react";

const Home = () => {
	// const featuredMovies = ['tt9362722', 'tt4154796', 'tt15398776', 'tt13622970', 'tt9603212']
	// const ENV = import.meta.env.MODE;

	return (
		<main className="md:p-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative bg-white/20 rounded-2xl overflow-hidden shadow-lg mb-8"
			>
				<img
					src=""
					alt="Top Featured Movie"
					className="w-full h-96 object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-black/40 p-6 flex flex-col justify-end">
					<h2 className="text-3xl font-bold text-white">
						Spider-Man: Across the Spider-Verse
					</h2>
					<p className="mt-2 text-sm text-gray-300">
						Miles Morales catapults across the Multiverse, where he encounters a
						team of Spider-People charged with protecting its existence.
					</p>
				</div>
			</motion.div>

			{/* You Might Like Section */}
			<section>
				<h3 className="text-xl font-bold mb-4">You Might Like</h3>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
				>
					{["Movie1", "Movie2", "Movie3", "Movie4"].map((movie) => (
						<div
							key={movie}
							className="bg-white/20 rounded-lg min-h-60 shadow-md p-4"
						>
							<img
								src={`https://via.placeholder.com/200x300?text=${movie}`}
								alt={movie}
								className="rounded-lg mb-4"
							/>
							<h4 className="text-sm font-bold">{movie}</h4>
							<p className="text-xs text-gray-500">Some description here...</p>
						</div>
					))}
				</motion.div>
			</section>
		</main>
	);
};

export default Home;
