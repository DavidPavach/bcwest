import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send2 } from "iconsax-reactjs";

import { SectionLabel } from "./AboutSection";

const industries = [
    {
        title: "Manufacturing",
        desc: "Raw material inbound and finished goods outbound — just-in-time at scale.",
        image:
            "/industries/1.jpg",
        code: "MFG",
    },
    {
        title: "Agriculture & Grain",
        desc: "Bulk commodity movement, seasonal volume, and prairie corridor expertise.",
        image:
            "/industries/2.jpg",
        code: "AGR",
    },
    {
        title: "Retail & Distribution",
        desc: "Store replenishment, DC-to-store, and e-commerce distribution logistics.",
        image:
            "/industries/3.jpg",
        code: "RTL",
    },
    {
        title: "Industrial & Construction",
        desc: "Heavy equipment, materials, and project freight for major builds.",
        image:
            "/industries/4.jpg",
        code: "IND",
    },
    {
        title: "Import & Export",
        desc: "Cross-border flow management, customs coordination, and international handoffs.",
        image:
            "/industries/5.jpg",
        code: "I/E",
    },
    {
        title: "Energy & Resources",
        desc: "Oilfield equipment, industrial supplies, and bulk liquid handling.",
        image:
            "/industries/6.jpg",
        code: "ENE",
    },
    {
        title: "Consumer Goods",
        desc: "High-volume SKU management, ambient and chilled product movement.",
        image:
            "/industries/7.jpg",
        code: "CPG",
    },
    {
        title: "Government & Institutional",
        desc: "Compliant logistics for municipal, provincial, and federal supply chains.",
        image:
            "/industries/8.jpg",
        code: "GOV",
    },
];

export default function IndustriesSection() {
    return (
        <section className="relative py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-6 mb-16">
                    <div>
                        <SectionLabel label="Industries Served" />
                        <h2 className="font-display font-black text-5xl md:text-6xl xl:text-7xl uppercase">
                            Every Sector.
                            <br />
                            <span className="text-gold">One Operator.</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-foreground/60 lg:text-right leading-relaxed">
                        From grain fields to construction sites, we move what matters most
                        to Western Canadian industry.
                    </p>
                </div>

                <div className="gap-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border border-steel/20">
                    {industries.map((industry, i) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                            className={`group relative overflow-hidden cursor-pointer aspect-square border-r border-b border-steel/20 ${(i + 1) % 4 === 0 ? "border-r-0" : ""
                                } ${i >= industries.length - 4 ? "border-b-0" : ""}`}
                        >
                            {/* Background image */}
                            <img
                                src={industry.image}
                                alt={industry.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-ocean/75 group-hover:bg-ocean/60 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 xl:p-6">
                                <div className="font-mono text-[9px] text-gold md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                                    {industry.code}
                                </div>
                                <div>
                                    <h3 className="mb-1 font-heading font-bold text-ivory group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors duration-200">
                                        {industry.title}
                                    </h3>
                                    <p className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden text-fog/80 leading-relaxed transition-opacity duration-300">
                                        {industry.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Send2 className="size-3 md:size-3.5 xl:size-4 text-gold" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/industries"
                        className="inline-flex items-center gap-2 pb-1 border-gold/30 border-b font-mono text-gold hover:text-gold/70 text-sm uppercase tracking-widest transition-colors"
                    >
                        View All Industries <Send2 className="size-3 md:size-3.5 xl:size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
