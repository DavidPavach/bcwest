// UIs

import AboutSection from "./AboutSection";
import CTA from "./CTA";
import DataWall from "./DataWall";
import EcoSystem from "./EcoSystem";
import HeroSection from "./HeroSection";
import IndustriesSection from "./Industries";
import LeadershipSection from "./Leadership";
import ServicesSection from "./Services";
import TankTerminalNetwork from "./TankTerminalNetwork";
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
			<TankTerminalNetwork />
			<LeadershipSection />
			<EcoSystem />
			<CTA />
		</>
	);
};

export default index;
