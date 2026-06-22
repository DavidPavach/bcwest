import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight3 } from "iconsax-reactjs";

import PageHero from "#/components/PageHero";
import CTA from "../Landing/CTA";

const services = [
    {
        code: "01",
        title: "Freight Transportation",
        href: "/service/freight",
        image:
            "/services/1.jpg",
        summary:
            "Full-truckload, LTL, and specialized freight movement across Western Canada and cross-border corridors.",
        capabilities: [
            "Full Truckload (FTL)",
            "Less Than Truckload (LTL)",
            "Temperature-Controlled Freight",
            "Oversize & Overweight Loads",
            "Time-Critical Delivery",
            "Cross-Province Corridors",
        ],
    },
    {
        code: "02",
        title: "Terminal Services",
        href: "/service/terminal",
        image:
            "/services/2.jpg",
        summary:
            "Integrated terminal operations including staging, transfer, consolidation, and freight management.",
        capabilities: [
            "Freight Consolidation",
            "Cross-Dock Operations",
            "Staging & Transfer Zones",
            "Load Planning & Execution",
            "Terminal Management",
            "Gate Operations",
        ],
    },
    {
        code: "03",
        title: "Warehousing & Storage",
        href: "/service/warehousing",
        image:
            "/services/3.jpg",
        summary:
            "Secure, climate-capable warehousing with full inventory management and distribution services.",
        capabilities: [
            "Short & Long-Term Storage",
            "Climate-Controlled Facilities",
            "Inventory Management",
            "Pick, Pack & Ship",
            "Security & Surveillance",
            "RFID Tracking",
        ],
    },
    {
        code: "04",
        title: "Logistics Coordination",
        href: "/service/logistics",
        image:
            "/services/4.jpg",
        summary:
            "End-to-end supply chain orchestration with real-time visibility and proactive management.",
        capabilities: [
            "Supply Chain Design",
            "Route Optimization",
            "Carrier Management",
            "Real-Time Freight Tracking",
            "Documentation & Compliance",
            "Freight Cost Analysis",
        ],
    },
    {
        code: "05",
        title: "Cross-Border Shipping",
        href: "/service/cross",
        image:
            "/services/5.jpg",
        summary:
            "Canada–US freight movement with expert customs coordination, border compliance, and documentation.",
        capabilities: [
            "Canada–USA Corridors",
            "Customs Documentation",
            "Border Compliance",
            "Duty & Tariff Management",
            "CUSMA/USMCA Expertise",
            "Bond Management",
        ],
    },
    {
        code: "06",
        title: "Supply Chain Solutions",
        href: "/service/supply",
        image:
            "/services/7.jpg",
        summary:
            "Strategic supply chain design and managed services for enterprise clients with complex logistics requirements.",
        capabilities: [
            "Network Design",
            "Vendor Management",
            "Demand Planning Support",
            "Lead Time Optimization",
            "Multi-Modal Coordination",
            "Continuous Improvement",
        ],
    },
    {
        code: "07",
        title: "Cargo Handling",
        href: "/service/cargo",
        image:
            "/services/8.jpg",
        summary:
            "Professional cargo handling for general, bulk, oversized, and specialized freight at terminal facilities.",
        capabilities: [
            "General Cargo Handling",
            "Bulk Commodity Handling",
            "Oversized Load Management",
            "Fragile Cargo Protocols",
            "Hazardous Materials Handling",
            "Loading/Unloading Services",
        ],
    },
    {
        code: "08",
        title: "Tank Farm Operations",
        href: "/service/tank",
        image:
            "/services/6.jpg",
        summary:
            "Bulk liquid storage, transfer, and handling with full environmental compliance and safety management.",
        capabilities: [
            "Bulk Liquid Storage",
            "Transfer Operations",
            "Environmental Compliance",
            "Safety Management Systems",
            "Volume Monitoring & Reporting",
            "Spill Prevention Protocols",
        ],
    },
];

export default function Services() {
    return (
        <>
            <PageHero
                label="Our Services"
                title="Eight Integrated Service Platforms."
                subtitle="From terminal operations to cross-border shipping, BCWEST delivers end-to-end freight and logistics services under one accountable operation."
                backgroundImage="/services/6.jpg"
            />

            {/* Services Grid */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="gap-0 grid grid-cols-1 md:grid-cols-2 border border-steel/20">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
                                className={`group relative overflow-hidden ${i % 2 === 0 ? "border-r border-steel/20" : ""
                                    } border-b border-steel/20`}
                            >
                                <Link to={service.href} className="block">
                                    <div className="flex lg:flex-row flex-col h-full">
                                        {/* Image */}
                                        <div className="relative lg:w-56 aspect-video lg:aspect-auto overflow-hidden shrink-0">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-ocean/60" />
                                            <div className="top-3 left-3 absolute bg-midnight/50 px-2 py-1 font-mono text-[10px] text-gold/70 md:text-[11px] xl:text-xs">
                                                {service.code}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4 md:p-6 xl:p-8">
                                            <h2 className="mb-3 font-heading font-bold group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors duration-200">
                                                {service.title}
                                            </h2>
                                            <p className="mb-4 text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
                                                {service.summary}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {service.capabilities.slice(0, 3).map((cap) => (
                                                    <span
                                                        key={cap}
                                                        className="bg-steel/10 px-2 py-1 border border-steel/20 font-mono text-[9px] text-foreground/50 md:text-[10px] xl:text-[11px] uppercase tracking-wider"
                                                    >
                                                        {cap}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2 font-mono text-gold group-hover:text-gold/70 text-xs uppercase tracking-widest transition-colors">
                                                View Service{" "}
                                                <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
