// UIs
import Footer from "#/components/Footer";
import Navbar from "#/components/Nav";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex flex-col min-h-dvh">
			<Navbar />
			<section className="flex-1">
				{children}
			</section>
			<Footer />
		</main>
	);
};

export default HomeLayout;
