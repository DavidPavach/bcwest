import { motion } from "framer-motion";

import { SectionLabel } from "./AboutSection";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
    {
        value: 28,
        suffix: "+",
        label: "Years of Uninterrupted Operations",
        code: "STAT_01",
    },
    {
        value: 100,
        suffix: "K+",
        label: "Freight Movements Annually",
        code: "STAT_02",
    },
    { value: 5, suffix: "+", label: "Provinces in Our Network", code: "STAT_03" },
    { value: 24, suffix: "/7", label: "Operational Coverage", code: "STAT_04" },
];

const pillars = [
    {
        title: "Safety First",
        code: "PILLAR_01",
        body: "Every movement operates under strict safety protocols aligned with Transport Canada standards and provincial regulations. Safety is not a metric — it is our operating principle.",
    },
    {
        title: "Regulatory Compliance",
        code: "PILLAR_02",
        body: "Federally incorporated under the Canada Business Corporations Act. Fully compliant with cross-border trade regulations, customs requirements, and environmental standards.",
    },
    {
        title: "Operational Reliability",
        code: "PILLAR_03",
        body: "Twenty-eight years without interruption. Our clients depend on us because we have demonstrated that we show up — on time, on spec, on budget.",
    },
    {
        title: "Enterprise Accountability",
        code: "PILLAR_04",
        body: "No layers. No middlemen. Direct operational control from terminal to delivery. When something requires action, our team acts — not a third party.",
    },
];

export default function DataWall() {
    return (
        <section className="relative bg-ocean py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />

            {/* Gold horizontal rule at top */}
            <div className="top-0 right-0 left-0 absolute bg-gold/30 h-px" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <SectionLabel label="Operational Excellence" />

                {/* Large Stats Row */}
                <div className="gap-0 grid grid-cols-2 lg:grid-cols-4 mb-20 border border-steel/30">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.code}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`px-8 py-10 ${i < stats.length - 1 ? "border-r border-steel/30" : ""} ${i >= 2 ? "border-t border-steel/30 lg:border-t-0" : ""}`}
                        >
                            <div className="mb-3 font-mono text-[9px] text-gold/80 md:text-[10px] xl:text-[11px] uppercase tracking-wider">
                                {stat.code}
                            </div>
                            <div
                                className="mb-2 font-display font-black text-ivory"
                                style={{
                                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                    lineHeight: 1,
                                }}
                            >
                                <AnimatedCounter
                                    end={String(stat.value)}
                                    suffix={stat.suffix}
                                    duration={2200}
                                />
                            </div>
                            <div className="max-w-40 text-[11px] text-fog/60 md:text-xs xl:text-sm leading-relaxed">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pillars of Excellence */}
                <div>
                    <h2 className="mb-12 max-w-2xl font-display font-black text-ivory text-4xl md:text-5xl xl:text-6xl uppercase">
                        The Standards We
                        <br />
                        <span className="text-gold">Hold Ourselves To</span>
                    </h2>

                    <div className="gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-steel/30">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`p-8 ${i < pillars.length - 1 ? "border-r border-steel/30" : ""} ${i >= 2 ? "border-t border-steel/30 md:border-t-0" : ""} ${i >= 1 ? "md:border-t border-t-0" : ""} group hover:bg-gold/5 transition-colors duration-300`}
                            >
                                <div className="mb-4 font-mono text-[9px] text-gold/40 md:text-[10px] xl:text-[11px] uppercase tracking-[0.2em]">
                                    {pillar.code}
                                </div>
                                <div className="bg-gold mb-5 w-8 group-hover:w-12 h-0.5 transition-all duration-300" />
                                <h3 className="mb-4 font-heading font-bold text-ivory group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors duration-200">
                                    {pillar.title}
                                </h3>
                                <p className="text-[11px] text-fog/60 md:text-xs xl:text-sm leading-relaxed">
                                    {pillar.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
