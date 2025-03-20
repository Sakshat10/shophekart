import Hero from "./components/Home/Hero";
import Partners from "./components/Home/Partners";
import { Presale } from "./components/Home/Presale";
import { Roadmap } from "./components/Home/Roadmap";
import { Tokenomics } from "./components/Home/Tokenomics";
import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";

function App() {
	return (
		<>
			<main className="bg-[#f1f4ff] relative w-full overflow-x-hidden">
				<Navbar />
				<Hero />
				<Presale />
				<Tokenomics />
				<Roadmap />
				<Partners />
				<Footer />
			</main>
		</>
	);
}

export default App;
