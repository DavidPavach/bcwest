import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight3 } from "iconsax-reactjs";

export default function AboutSection() {
    return (
        <section className="relative py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <div className="items-center gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-12">
                    {/* Left: Image block */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative lg:col-span-5"
                    >
                        <div className="relative aspect-4/5 overflow-hidden">
                            <img
                                src="/about.jpg"
                                alt="BCWEST freight operations"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-ocean/80 via-ocean/20 to-transparent" />

                            {/* Overlay badge */}
                            <div className="right-6 bottom-6 left-6 absolute bg-midnight/80 backdrop-blur-sm p-4 border border-gold/30">
                                <div className="mb-1 font-mono text-[10px] text-gold uppercase tracking-[0.2em]">
                                    FEDERALLY INCORPORATED
                                </div>
                                <div className="font-display font-black text-ivory text-base md:text-lg xl:text-xl uppercase">
                                    Since 1997
                                </div>
                                <div className="mt-1 text-fog/60 text-xs">
                                    Canada Business Corporations Act
                                </div>
                            </div>
                        </div>

                        {/* Accent lines */}
                        <div className="-top-4 -left-4 absolute border-gold/40 border-t-2 border-l-2 w-16 h-16" />
                        <div className="-right-4 -bottom-4 absolute border-gold/40 border-r-2 border-b-2 w-16 h-16" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7"
                    >
                        <SectionLabel label="About BCWEST" />

                        <h2 className="mb-6 font-display font-black text-5xl md:text-6xl xl:text-7xl uppercase">
                            Built on a Foundation
                            <br />
                            <span className="text-gold">of Operational Trust</span>
                        </h2>

                        <div className="space-y-5 mb-8 text-foreground/70 leading-relaxed">
                            <p>
                                BCWEST Terminal Freight Services Inc. was incorporated on
                                September 26, 1997 under the Canada Business Corporations Act —
                                establishing itself as a privately held, Western Canadian
                                freight and terminal operator built for the long haul.
                            </p>
                            <p>
                                From our registered offices in Winnipeg, Manitoba, we have spent
                                over 28 years building deep expertise in freight transportation,
                                terminal services, warehousing, and cross-border logistics. Our
                                operations are structured around one principle: the goods
                                entrusted to us move with precision, care, and accountability.
                            </p>
                            <p>
                                We are not a brokerage. We are not a middleman. We are an active
                                operational company that manages freight, terminal facilities,
                                and supply chain infrastructure directly — giving our clients a
                                level of service accountability that others cannot match.
                            </p>
                        </div>

                        {/* Values grid */}
                        <div className="gap-4 grid grid-cols-2 mb-8">
                            {[
                                {
                                    label: "Operational Precision",
                                    desc: "Every load tracked, documented, and delivered to specification.",
                                },
                                {
                                    label: "Regulatory Compliance",
                                    desc: "Fully compliant with CBCA and federal transportation standards.",
                                },
                                {
                                    label: "Enterprise Reliability",
                                    desc: "28 years of uninterrupted operations serving Western Canada.",
                                },
                                {
                                    label: "Client Accountability",
                                    desc: "Direct operations — not brokered. Your freight, our responsibility.",
                                },
                            ].map((v) => (
                                <div
                                    key={v.label}
                                    className="py-1 pl-4 border-gold/40 border-l-2"
                                >
                                    <div className="mb-1 font-semibold text-[11px] md:text-xs xl:text-sm">
                                        {v.label}
                                    </div>
                                    <div className="text-[10px] text-foreground/50 md:text-[11px] xl:text-xs leading-relaxed">
                                        {v.desc}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="group inline-flex items-center gap-3 bg-gold hover:bg-gold/90 px-6 py-3 font-semibold text-[11px] md:text-xs xl:text-sm tracking-wide transition-all duration-200"
                        >
                            Our Full Story
                            <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

type SectionProps = {
    index?: number | string;
    label: string;
    light?: boolean;
};
export function SectionLabel({ index, label, light = false }: SectionProps) {
    return (
        <div
            className={`flex items-center gap-3 mb-4 ${light ? "text-gold" : "text-gold"}`}
        >
            {index && (
                <span className="font-mono text-[10px] text-gold/60 uppercase tracking-wider">
                    SECTION_{String(index).padStart(2, "0")}
                </span>
            )}
            {index && (
                <span className="font-mono text-[10px] text-gold/30">{"//"}</span>
            )}
            <span className="font-mono text-[10px] text-gold uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}
