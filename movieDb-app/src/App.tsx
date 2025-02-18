import { Suspense, lazy } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./common/Navbar";

import Circle from "./common/Circle";
import Loader from "./common/Loader";
import Sidebar from "./common/Sidebar";
import SidebarToggleButton from "./common/Sidebar/components/SidebarToggleButton";

const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<>
			{/* Background Circles */}
			<Circle id="circle1" position="top-left" />
			<Circle
				id="circle2"
				position="bottom-right"
				animationDelay="animation-delay-2000"
			/>

			<div className="relative z-20 p-safe flex min-h-screen max-w-7xl self-center border border-white/40 bg-white/40 bg-clip-padding text-stone-800 backdrop-blur-xl backdrop-filter md:m-10 md:rounded-2xl lg:mx-auto dark:bg-white/10 dark:text-white">
				{/* Sidebar */}
				<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

				{/* Main Content */}
				<div className="flex flex-1 flex-col p-4">
					{/* Navbar */}
					<Navbar />
					<SidebarToggleButton
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>

					{/* Main Content */}
					<Suspense fallback={<Loader />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="movies/:movieId" element={<MovieDetail />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</div>
			</div>
		</>
	);
}

export default App;
