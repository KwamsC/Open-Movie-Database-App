import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import Sidebar from "./common/Sidebar";

const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
	return (
		<>
			<Sidebar />
			<main className="min-h-screen bg-gradient-to-br from-stone-900 to-stone-700 text-white flex flex-col items-center">
				<div className="p-4 sm:ml-64">
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="movies/:movieId" element={<MovieDetail />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</div>
			</main>
		</>
	);
}

export default App;
