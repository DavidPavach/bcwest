import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight3 } from "iconsax-reactjs";

import { SectionLabel } from "./AboutSection";

const nodes = [
    {
        x: "48%",
        y: "52%",
        label: "Winnipeg, MB",
        primary: true,
        desc: "Registered HQ & Operations Hub",
    },
    {
        x: "35%",
        y: "48%",
        label: "Regina, SK",
        primary: false,
        desc: "Prairie Corridor Node",
    },
    {
        x: "25%",
        y: "42%",
        label: "Calgary, AB",
        primary: false,
        desc: "Western Terminal Access",
    },
    {
        x: "20%",
        y: "36%",
        label: "Edmonton, AB",
        primary: false,
        desc: "Northern AB Gateway",
    },
    {
        x: "60%",
        y: "56%",
        label: "Thunder Bay, ON",
        primary: false,
        desc: "Eastern Connection",
    },
    {
        x: "52%",
        y: "72%",
        label: "US Border",
        primary: false,
        desc: "Cross-Border Gateway",
    },
];

export default function NetworkSection() {
    return (
        <section className="relative py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <div className="items-start gap-12 grid grid-cols-1 lg:grid-cols-12">
                    {/* Left: Content */}
                    <div className="lg:col-span-4">
                        <SectionLabel label="Network Coverage" />
                        <h2 className="mb-6 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                            Connected Across
                            <br />
                            <span className="text-gold">The West</span>
                        </h2>
                        <p className="mb-8 text-foreground/60 leading-relaxed">
                            Operating from our Winnipeg hub, BCWEST's freight network extends
                            across the Prairie provinces and into cross-border corridors,
                            connecting shippers to destinations throughout Western Canada and
                            beyond.
                        </p>

                        {/* Network points list */}
                        <div className="space-y-3 mb-8">
                            {nodes.map((node) => (
                                <div key={node.label} className="flex items-center gap-3">
                                    <div
                                        className={`size-2 rounded-full shrink-0 ${node.primary ? "bg-gold" : "bg-steel"}`}
                                    />
                                    <div>
                                        <div
                                            className={` text-sm font-medium ${node.primary ? "text-gold" : "text-foreground/80"}`}
                                        >
                                            {node.label}
                                        </div>
                                        <div className="font-mono text-[10px] text-foreground/40">
                                            {node.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/network"
                            className="group inline-flex items-center gap-3 hover:bg-gold px-6 py-3 border border-gold font-medium text-[11px] text-gold hover:text-midnight md:text-xs xl:text-sm tracking-wide transition-all duration-200"
                        >
                            View Full Network
                            <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Right: Map Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-8"
                    >
                        <div
                            className="relative border border-steel/30 overflow-hidden"
                            style={{ paddingBottom: "65%" }}
                        >
                            {/* Map background */}
                            <img
                                src="/network.jpg"
                                alt="Western Canada network map"
                                className="absolute inset-0 opacity-30 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-br from-ocean/80 via-midnight/60 to-midnight/90" />
                            <div className="absolute inset-0 grid-overlay opacity-20" />

                            {/* SVG Route Lines */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                role="img"
                                aria-labelledby="network-map-title network-map-desc"
                            >
                                <title id="network-map-title">
                                    Western Canada network route connections
                                </title>
                                <desc id="network-map-desc">
                                    Visual representation of BCWEST route lines connecting
                                    Winnipeg to regional nodes.
                                </desc>
                                {/* Lines from Winnipeg to other nodes */}
                                {nodes.slice(1).map((node) => (
                                    <motion.line
                                        key={node.label}
                                        x1="48"
                                        y1="52"
                                        x2={node.x.replace("%", "")}
                                        y2={node.y.replace("%", "")}
                                        stroke="rgba(185,146,76,0.25)"
                                        strokeWidth="0.3"
                                        strokeDasharray="1 1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                ))}
                            </svg>

                            {/* Network Nodes */}
                            {nodes.map((node, i) => (
                                <motion.div
                                    key={node.label}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                                    className="group absolute"
                                    style={{
                                        left: node.x,
                                        top: node.y,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {/* Pulse ring */}
                                    {node.primary && (
                                        <div className="absolute inset-0 bg-gold/20 rounded-full scale-150 animate-pulse-ring" />
                                    )}

                                    {/* Dot */}
                                    <div
                                        className={`size-3 rounded-full border-2 ${node.primary
                                            ? "bg-gold border-gold shadow-gold"
                                            : "bg-steel border-steel/60"
                                            } cursor-pointer hover:scale-125 transition-transform`}
                                    />

                                    {/* Label tooltip */}
                                    <div className="top-1/2 left-full absolute opacity-0 group-hover:opacity-100 ml-2 whitespace-nowrap transition-opacity -translate-y-1/2 duration-200 pointer-events-none">
                                        <div className="bg-background/90 px-2.5 py-1.5 border border-steel/40">
                                            <div
                                                className={`text-[10px] md:text[11px] xl:text-xs font-medium ${node.primary ? "text-gold" : "text-foreground"}`}
                                            >
                                                {node.label}
                                            </div>
                                            <div className="font-mono text-[9px] text-foreground/50 md:text-[10px] xl:text-[11px">
                                                {node.desc}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Map Label */}
                            <div className="top-4 left-4 absolute">
                                <div className="font-mono text-[9px] text-gold/60 md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                                    BCWEST_NETWORK_MAP
                                </div>
                                <div className="mt-0.5 font-mono text-[9px] text-foreground/60 md:text-[10px] xl:text-[11px]">
                                    WESTERN CANADA OPERATIONS
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
