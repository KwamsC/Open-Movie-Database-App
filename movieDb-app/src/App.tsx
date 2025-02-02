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
			<Circle id="circle1" position="top-left" color="bg-stone-600" />
			<Circle id="circle2" position="bottom-right" color="bg-stone-500" />

			<div className="min-h-screen max-w-7xl z-20 md:m-10 self-center bg-white/10 backdrop-blur-2xl bg-clip-padding backdrop-filter border border-white/40 md:rounded-2xl text-white flex lg:mx-auto relative">
				{/* Sidebar */}
				<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

				{/* Main Content */}
				<div className="flex-1 flex flex-col p-4">
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
