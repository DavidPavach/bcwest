import { motion } from "framer-motion";

import { SectionLabel } from "./AboutSection";

const leaders = [
    {
        name: "ESTUNT RAIVO",
        title: "CEO",
        nationality: "Estonian",
        bio: "President & Chief Executive Officer (CEO).",
        image: "/staff/ceo.jpeg"
    },
    {
        name: "BOLANOS CASTRO SILVIA GRACIELA",
        title: "Vice President",
        nationality: "Czech",
        bio: "Group Executive Vice President – Global Operations.",
        image: "/staff/vice.jpeg"
    },
    {
        name: "SOPHIE LEBLANC",
        title: "CCO",
        nationality: "Canadian",
        bio: "Chief Commercial Officer (CCO)",
        image: "/staff/cco.jpeg"
    },
    {
        name: "DAVID RICHARDS",
        title: "Director",
        nationality: "British",
        bio: "Director – Shipping & Marine Logistics",
        image: "/staff/logistics.jpeg"
    },
    {
        name: "AHMED AL MANSOORI",
        title: "Director",
        nationality: "Emirati",
        bio: "Director – Compliance, HSE & Security",
        image: "/staff/security.jpeg"
    },
];

export default function LeadershipSection() {
    return (
        <section className="relative bg-ocean py-20 md:py-24 xl:py-28 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-10" />
            <div className="top-0 right-0 left-0 absolute bg-gold/20 h-px" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-6 mb-16">
                    <div>
                        <SectionLabel label="Board of Directors" />
                        <h2 className="font-display font-black text-ivory text-4xl md:text-5xl xl:text-6xl uppercase">
                            Governing with
                            <br />
                            <span className="text-gold">Purpose & Precision</span>
                        </h2>
                    </div>
                    <div className="max-w-xs">
                        <div className="pl-4 border-gold/30 border-l-2 font-mono text-[10px] text-fog/50 md:text-[11px] xl:text-xs leading-relaxed">
                            BCWEST is governed under the Canada Business Corporations Act with
                            a Board comprising Resident Canadian Directors.
                        </div>
                    </div>
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                    {leaders.map((leader, i) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.15,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group bg-midnight/30 border border-steel/30 hover:border-gold/40 transition-colors duration-300"
                        >
                            <div className="flex items-stretch">
                                {/* Avatar Panel */}
                                <div className="flex flex-col justify-center bg-gradient-ocean w-28 h-full shrink-0">
                                    <img src={leader.image} alt={`${leader.image}`} className="h-32 object-cover" />
                                    <div className="font-mono text-[9px] text-gold/50 md:text-[10px] xl:text-[11px] uppercase tracking-widest">
                                        {leader.nationality}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6">
                                    <div className="mb-2 font-mono text-[9px] text-gold/50 uppercase tracking-wider">
                                        {`${leader.title}`}
                                    </div>
                                    <h3 className="mb-0.5 font-heading font-bold text-ivory text-base md:text-lg xl:text-xl uppercase">
                                        {leader.name}
                                    </h3>
                                    <p className="text-[11px] text-fog/60 md:text-xs xl:text-sm leading-relaxed">
                                        {leader.bio}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Corporate info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="gap-6 grid grid-cols-2 lg:grid-cols-4 mt-10 p-4 md:p-5 xl:p-6 border border-steel/30"
                >
                    {[
                        { label: "Corporation No.", value: "341779-4" },
                        { label: "Business No.", value: "873609150RC0001" },
                        { label: "Status", value: "Active" },
                        { label: "Governing Act", value: "CBCA — 1997" },
                    ].map((item) => (
                        <div key={item.label}>
                            <div className="mb-1 font-mono text-[9px] text-gold/50 md:text-[10px] xl:text-[11px] uppercase tracking-widest">
                                {item.label}
                            </div>
                            <div className="font-medium text-[11px] text-fog/80 md:text-xs xl:text-sm">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
