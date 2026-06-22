import { motion } from "framer-motion";

import PageHero from "#/components/PageHero";
import CTA from "../Landing/CTA";

const industries = [
    {
        code: "MFG_01",
        title: "Manufacturing",
        image: "/industries/1.jpg",
        challenge:
            "Production lines cannot stop. Inbound components must arrive on schedule. Finished goods must ship to market without delay.",
        solution:
            "BCWEST provides just-in-time freight delivery, terminal staging, and vendor-managed inbound logistics for manufacturing clients across Western Canada.",
        services: [
            "JIT Freight Delivery",
            "Inbound Logistics",
            "Finished Goods Distribution",
            "Terminal Staging",
        ],
    },
    {
        code: "AGR_02",
        title: "Agriculture & Grain",
        image: "/industries/2.jpg",
        challenge:
            "Harvest windows are narrow. Commodity volumes are massive. Prairie corridors demand operators with real grain and bulk experience.",
        solution:
            "With deep Prairie roots, BCWEST operates bulk commodity freight corridors across Manitoba, Saskatchewan, and Alberta — understanding the seasonal intensity of agricultural logistics.",
        services: [
            "Bulk Commodity Transport",
            "Seasonal Volume Management",
            "Prairie Corridor Freight",
            "Grain Terminal Access",
        ],
    },
    {
        code: "RTL_03",
        title: "Retail & Distribution",
        image: "/industries/3.jpg",
        challenge:
            "Retail supply chains demand velocity, SKU accuracy, and consistent replenishment. Out-of-stocks are unacceptable.",
        solution:
            "BCWEST delivers high-frequency retail replenishment freight with full pick-and-pack warehousing support, DC-to-store execution, and inventory management.",
        services: [
            "Retail Replenishment",
            "DC-to-Store Delivery",
            "Pick, Pack & Ship",
            "Inventory Management",
        ],
    },
    {
        code: "IND_04",
        title: "Industrial & Construction",
        image: "/industries/4.jpg",
        challenge:
            "Heavy equipment, steel, precast, and construction materials require specialized freight management and oversized load expertise.",
        solution:
            "Our fleet and terminal capabilities handle oversized, overweight, and project freight for construction sites and industrial facilities across the region.",
        services: [
            "Oversized Load Transport",
            "Heavy Equipment Freight",
            "Project Freight Management",
            "Flatdeck Services",
        ],
    },
    {
        code: "IME_05",
        title: "Import & Export",
        image: "/industries/5.jpg",
        challenge:
            "International trade requires precise documentation, border compliance, and seamless handoffs between modes and jurisdictions.",
        solution:
            "BCWEST coordinates cross-border freight with customs expertise, documentation management, and established US-Canada corridor operations.",
        services: [
            "Cross-Border Freight",
            "Customs Coordination",
            "Documentation Management",
            "Port Drayage Support",
        ],
    },
    {
        code: "ENE_06",
        title: "Energy & Resources",
        image: "/industries/6.jpg",
        challenge:
            "Oilfield equipment, bulk liquids, and industrial supplies operate in remote conditions with zero tolerance for operational delay.",
        solution:
            "Our tank farm operations, bulk freight capabilities, and specialized handling protocols serve the Western Canadian energy sector directly.",
        services: [
            "Tank Farm Operations",
            "Oilfield Equipment Freight",
            "Bulk Liquid Handling",
            "Remote Site Delivery",
        ],
    },
    {
        code: "CPG_07",
        title: "Consumer Goods",
        image: "/industries/7.jpg",
        challenge:
            "Consumer goods supply chains require ambient, chilled, and ambient-chilled product integrity, high SKU volumes, and promotion-driven peaks.",
        solution:
            "BCWEST warehousing, distribution, and freight services support consumer packaged goods companies moving product across Western Canadian markets.",
        services: [
            "Ambient & Chilled Freight",
            "High-SKU Warehousing",
            "Promotional Freight Peaks",
            "Retail Distribution",
        ],
    },
    {
        code: "GOV_08",
        title: "Government & Institutional",
        image: "/industries/8.jpg",
        challenge:
            "Government procurement requires strict compliance, documentation, and accountable chain-of-custody freight management.",
        solution:
            "As a federally incorporated Canadian corporation under the CBCA, BCWEST meets the compliance and accountability standards demanded by government supply chains.",
        services: [
            "Government Freight",
            "Compliance Management",
            "Institutional Supply Chain",
            "Documented Chain of Custody",
        ],
    },
];

export default function Industries() {
    return (
        <>
            <PageHero
                label="Industries Served"
                title="Every Western Canadian Industry. One Freight Partner."
                subtitle="From grain fields to government institutions, BCWEST provides the freight, terminal, and logistics infrastructure that Western Canadian industry depends upon."
                backgroundImage="/industries/5.jpg"
            />

            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="space-y-0 border border-steel/20">
                        {industries.map((ind) => (
                            <motion.div
                                key={ind.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="group grid grid-cols-1 lg:grid-cols-12 hover:bg-ocean/20 border-steel/20 border-b last:border-b-0 transition-colors duration-300"
                            >
                                {/* Image */}
                                <div className="relative lg:col-span-3 aspect-video lg:aspect-auto overflow-hidden">
                                    <img
                                        src={ind.image}
                                        alt={ind.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-ocean/60 group-hover:bg-ocean/40 transition-colors duration-300" />
                                    <div className="top-4 left-4 absolute bg-midnight/60 px-2 py-1 font-mono text-[9px] text-gold/70">
                                        {ind.code}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="lg:col-span-9 p-4 md:p-6 xl:p-8 border-steel/20 lg:border-l">
                                    <h2 className="mb-1 font-heading font-bold group-hover:text-gold text-lg md:text-xl xl:text-2xl uppercase transition-colors duration-200">
                                        {ind.title}
                                    </h2>
                                    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mt-5">
                                        <div>
                                            <div className="mb-2 font-mono text-[9px] text-foreground/40 md:text-[10px] xl:text-[11px] uppercase tracking-widest">
                                                The Challenge
                                            </div>
                                            <p className="text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
                                                {ind.challenge}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="mb-2 font-mono text-[9px] text-foreground/40 md:text-[10px] xl:text-[11px] uppercase tracking-widest">
                                                BCWEST Solution
                                            </div>
                                            <p className="text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
                                                {ind.solution}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {ind.services.map((s) => (
                                            <span
                                                key={s}
                                                className="px-2.5 py-1 border border-gold/20 font-mono text-[9px] text-gold/60 uppercase tracking-wider"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
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
