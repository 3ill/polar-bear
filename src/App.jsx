import Footer from "./sections/footer";
import Gallery from "./sections/gallery";
import Hero from "./sections/hero";
import Navbar from "./sections/navbar";

const App = () => {
	return (
		<main className="  overflow-x-hidden overflow-y-hidden">
			<div className="max-w-7xl mx-auto">
				<Navbar />
				<Hero />
			</div>
			<Gallery />
			<Footer />
		</main>
	);
};

export default App;
