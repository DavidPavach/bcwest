// UIs
import AboutSection from "./AboutSection";
import CTA from "./CTA";
import DataWall from "./DataWall";
import HeroSection from "./HeroSection";
import IndustriesSection from "./Industries";
import LeadershipSection from "./Leadership";
import NetworkSection from "./Network";
import ServicesSection from "./Services";
import TrustBar from "./TrustBar";

const index = () => {
	return (
		<>
			<HeroSection />
			<TrustBar />
			<AboutSection />
			<ServicesSection />
			<IndustriesSection />
			<DataWall />
			<NetworkSection />
			<LeadershipSection />
			<CTA />
		</>
	);
};

export default index;
