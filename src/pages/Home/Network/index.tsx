import { motion } from "framer-motion";

import PageHero from "#/components/PageHero";
import { SectionLabel } from "../Landing/AboutSection";
import CTA from "../Landing/CTA";
import TankTerminalNetwork from "../Landing/TankTerminalNetwork";

const corridors = [
    {
        route: "Winnipeg → Regina",
        distance: "580 km",
        type: "Full Corridor",
        frequency: "Daily",
        code: "CORR_01",
    },
    {
        route: "Winnipeg → Calgary",
        distance: "1,340 km",
        type: "Full Corridor",
        frequency: "Weekly",
        code: "CORR_02",
    },
    {
        route: "Winnipeg → Thunder Bay",
        distance: "700 km",
        type: "Eastern Reach",
        frequency: "Weekly",
        code: "CORR_03",
    },
    {
        route: "Winnipeg → Edmonton",
        distance: "1,550 km",
        type: "Full Corridor",
        frequency: "Weekly",
        code: "CORR_04",
    },
    {
        route: "Manitoba → US Border",
        distance: "Variable",
        type: "Cross-Border",
        frequency: "As Required",
        code: "CORR_05",
    },
    {
        route: "Calgary → Edmonton",
        distance: "300 km",
        type: "AB Corridor",
        frequency: "Weekly",
        code: "CORR_06",
    },
];

export default function Network() {
    return (
        <>
            <PageHero
                label="Network & Coverage"
                title="Connected Across Western Canada."
                subtitle="From our Winnipeg hub, BCWEST's freight network connects Prairie industry to markets and supply chains across Western Canada and the US border."
                backgroundImage="/network.jpg"
            />

            <TankTerminalNetwork />

            {/* Corridors Table */}
            <section className="relative bg-ocean py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <SectionLabel label="Active Corridors" />
                    <h2 className="mb-12 font-display font-black text-ivory text-4xl md:text-5xl xl:text-6xl uppercase">
                        Known Routes.
                        <br />
                        <span className="text-gold">Proven Performance.</span>
                    </h2>

                    <div className="border border-steel/30">
                        <div className="grid grid-cols-5 bg-midnight/40 px-6 py-3 border-steel/30 border-b">
                            {["Route", "Distance", "Type", "Frequency", "Code"].map((h) => (
                                <div
                                    key={h}
                                    className="font-mono text-[10px] text-fog/40 uppercase tracking-widest"
                                >
                                    {h}
                                </div>
                            ))}
                        </div>
                        {corridors.map((c, i) => (
                            <motion.div
                                key={c.code}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className={`grid grid-cols-5 px-6 py-4 ${i < corridors.length - 1 ? "border-b border-steel/20" : ""} hover:bg-fog/5 transition-colors group`}
                            >
                                <div className="font-medium text-[11px] text-ivory group-hover:text-gold md:text-xs xl:text-sm transition-colors">
                                    {c.route}
                                </div>
                                <div className="font-mono text-[11px] text-fog/60 md:text-xs xl:text-sm">
                                    {c.distance}
                                </div>
                                <div className="font-mono text-[10px] text-fog/60 md:text-[11px] xl:text-xs">
                                    {c.type}
                                </div>
                                <div className="font-mono text-[10px] md:text-[11px] xl:text-xs">
                                    <span className="bg-teal/10 px-2 py-0.5 text-teal">
                                        {c.frequency}
                                    </span>
                                </div>
                                <div className="font-mono text-[10px] text-gold/40 uppercase">
                                    {c.code}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
