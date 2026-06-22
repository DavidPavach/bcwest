import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AddSquare, ArrowRight3, MinusSquare } from "iconsax-reactjs";
import { useState } from "react";

import { SectionLabel } from "./AboutSection";

const services = [
    {
        id: "freight",
        code: "01",
        title: "Freight Transportation",
        href: "/service/freight",
        image: "/services/1.jpg",
        summary:
            "Full-truckload, LTL, and specialized freight movement across Western Canada and beyond.",
        capabilities: [
            "FTL & LTL Services",
            "Temperature-Controlled Freight",
            "Oversize & Overweight Loads",
            "Time-Critical Delivery",
            "Cross-Province Corridors",
        ],
    },
    {
        id: "terminal",
        code: "02",
        title: "Terminal Services",
        href: "/service/terminal",
        image: "/services/2.jpg",
        summary:
            "Integrated terminal operations including staging, transfer, consolidation, and outbound freight management.",
        capabilities: [
            "Freight Consolidation",
            "Cross-Dock Operations",
            "Staging & Transfer",
            "Load Planning",
            "Terminal Management",
        ],
    },
    {
        id: "warehousing",
        code: "03",
        title: "Warehousing & Storage",
        href: "/service/warehousing",
        image: "/services/3.jpg",
        summary:
            "Secure, climate-capable warehousing with inventory management and distribution support.",
        capabilities: [
            "Short & Long-Term Storage",
            "Inventory Management",
            "Pick, Pack & Ship",
            "Climate-Controlled Facilities",
            "Security & Surveillance",
        ],
    },
    {
        id: "logistics",
        code: "04",
        title: "Logistics Coordination",
        href: "/service/logistics",
        image: "/services/4.jpg",
        summary:
            "End-to-end supply chain orchestration — from origin to delivery with full visibility.",
        capabilities: [
            "Supply Chain Design",
            "Route Optimization",
            "Carrier Management",
            "Real-Time Tracking",
            "Documentation & Compliance",
        ],
    },
    {
        id: "crossborder",
        code: "05",
        title: "Cross-Border Shipping",
        href: "/service/cross",
        image: "/services/5.jpg",
        summary:
            "Canada–US freight movement with full customs brokerage coordination and border compliance.",
        capabilities: [
            "Canada–USA Corridors",
            "Customs Documentation",
            "Border Compliance",
            "Duty & Tariff Management",
            "CUSMA/USMCA Expertise",
        ],
    },
    {
        id: "tank",
        code: "06",
        title: "Tank Farm Operations",
        href: "/service/tank",
        image: "/services/6.jpg",
        summary:
            "Bulk liquid storage and handling with full environmental compliance and safety protocols.",
        capabilities: [
            "Bulk Liquid Storage",
            "Transfer Operations",
            "Environmental Compliance",
            "Safety Management",
            "Volume Monitoring",
        ],
    },
];

export default function ServicesSection() {
    const [activeService, setActiveService] = useState(services[0]);
    const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

    return (
        <section className="relative bg-ocean py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                {/* Header */}
                <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-6 mb-16">
                    <div>
                        <SectionLabel label="Core Services" />
                        <h2 className="font-display font-black text-ivory text-5xl md:text-6xl xl:text-7xl uppercase">
                            What We
                            <br />
                            <span className="text-gold">Operate</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-fog/60 lg:text-right leading-relaxed">
                        Six integrated service platforms. One accountable freight partner.
                    </p>
                </div>

                {/* Desktop: Expansion Dock */}
                <div className="hidden gap-0 lg:grid grid-cols-12 border border-steel/30">
                    {/* Service List */}
                    <div className="col-span-5 border-steel/30 border-r">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setActiveService(service)}
                                className={`group flex items-center justify-between px-6 py-5 border-b border-steel/20 cursor-pointer transition-all duration-200 ${activeService.id === service.id
                                    ? "bg-gold/10 border-l-2 border-l-gold"
                                    : "hover:bg-fog/5 border-l-2 border-l-transparent"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] text-gold/40 tracking-widest">
                                        {service.code}
                                    </span>
                                    <span
                                        className={`font-heading text-lg font-bold uppercase tracking-wide transition-colors ${activeService.id === service.id
                                            ? "text-gold"
                                            : "text-fog/80 group-hover:text-ivory"
                                            }`}
                                    >
                                        {service.title}
                                    </span>
                                </div>
                                <ArrowRight3
                                    className={`size-3 md:size-3.5 xl:size-4 transition-all ${activeService.id === service.id
                                        ? "text-gold translate-x-1"
                                        : "text-fog/30 group-hover:text-fog/60"
                                        }`}
                                />
                            </motion.div>
                        ))}
                        <div className="p-4 md:p-5 xl:p-6">
                            <Link
                                to="/services"
                                className="flex items-center gap-2 font-mono text-gold hover:text-gold/80 text-xs uppercase tracking-widest transition-colors"
                            >
                                View All Services <ArrowRight3 className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Service Detail Panel */}
                    <div className="relative col-span-7">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative h-full min-h-120 overflow-hidden"
                            >
                                <img
                                    src={activeService.image}
                                    alt={activeService.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-ocean/90 via-ocean/60 to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-t from-ocean/80 to-transparent" />

                                <div className="z-5 relative flex flex-col justify-between p-4 md:p-6 xl:p-8 h-full">
                                    <div>
                                        <div className="mb-3 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                                            SERVICE_{activeService.code}
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl xl:}text-4xl font-black text-ivory uppercase mb-4">
                                            {activeService.title}
                                        </h3>
                                        <p className="mb-6 max-w-sm text-fog/70 text-sm leading-relaxed">
                                            {activeService.summary}
                                        </p>

                                        {/* Capabilities table */}
                                        <div className="border border-fog/15">
                                            <div className="bg-midnight/30 px-4 py-2 border-fog/15 border-b">
                                                <span className="font-mono text-[10px] text-fog/50 uppercase tracking-widest">
                                                    Capabilities
                                                </span>
                                            </div>
                                            {activeService.capabilities.map((cap, i) => (
                                                <div
                                                    key={cap}
                                                    className={`px-4 py-2.5 flex items-center gap-3 ${i < activeService.capabilities.length - 1 ? "border-b border-fog/10" : ""}`}
                                                >
                                                    <div className="bg-gold rounded-full w-1 h-1 shrink-0" />
                                                    <span className="text-fog/70 text-sm">{cap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to={activeService.href}
                                        className="group inline-flex items-center self-start gap-2 hover:bg-gold mt-6 px-5 py-2.5 border border-gold font-medium text-[11px] text-gold hover:text-ocean md:text-xs xl:text-sm tracking-wide transition-all duration-200"
                                    >
                                        Learn More{" "}
                                        <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile: Accordion */}
                <div className="lg:hidden space-y-0 border border-steel/30">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`border-b border-steel/20 last:border-b-0`}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setExpandedMobile(
                                        expandedMobile === service.id ? null : service.id,
                                    )
                                }
                                className="flex justify-between items-center px-5 py-4 w-full text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] text-gold/60 md:text-[11px] xl:text-xs">
                                        {service.code}
                                    </span>
                                    <span className="font-heading font-bold text-fog/80 uppercase">
                                        {service.title}
                                    </span>
                                </div>
                                {expandedMobile === service.id ? (
                                    <MinusSquare className="size-4 md:size-4.5 xl:size-5 text-gold shrink-0" />
                                ) : (
                                    <AddSquare className="size-4 md:size-4.5 xl:size-5 text-fog/40 shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {expandedMobile === service.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5">
                                            <p className="mb-4 text-[11px] text-fog/60 md:text-xs xl:text-sm">
                                                {service.summary}
                                            </p>
                                            <ul className="space-y-1.5 mb-4">
                                                {service.capabilities.map((cap) => (
                                                    <li
                                                        key={cap}
                                                        className="flex items-center gap-2 text-[10px] text-fog/50 md:text-[11px] xl:text-xs"
                                                    >
                                                        <div className="bg-gold rounded-full size-1 shrink-0" />{" "}
                                                        {cap}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link
                                                to={service.href}
                                                className="font-mono text-[11px] text-gold hover:text-gold/70 md:text-xs xl:text-sm uppercase tracking-widest transition-colors"
                                            >
                                                Learn More →
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
