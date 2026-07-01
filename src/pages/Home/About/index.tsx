import { motion } from "framer-motion";

import PageHero from "#/components/PageHero";
import { SectionLabel } from "../Landing/AboutSection";
import AnimatedCounter from "../Landing/AnimatedCounter";
import CTA from "../Landing/CTA";
import LeadershipSection from "../Landing/Leadership";

const timeline = [
    {
        year: "1997",
        event: "Incorporated as 3417794 Canada Ltd.",
        detail:
            "Founded in Winnipeg, Manitoba under the Canada Business Corporations Act on September 26, 1997.",
    },
    {
        year: "2000",
        event: "Rebranded to BCWEST Terminal Freight Services Inc.",
        detail:
            "Corporate name changed to reflect the company's focus on Western Canadian terminal freight operations.",
    },
    {
        year: "2010s",
        event: "Network Expansion Across Prairie Provinces",
        detail:
            "Grew freight operations and terminal capacity across Manitoba, Saskatchewan, and Alberta corridors.",
    },
    {
        year: "2023",
        event: "New Board Governance Structure",
        detail:
            "Nelson R. Olfert appointed to the Board of Directors. James S. Reimer confirmed as significant controlling shareholder.",
    },
    {
        year: "2024",
        event: "Carrie-Lynn Harz Joins Board",
        detail:
            "New director appointment strengthens governance and executive oversight of operations.",
    },
    {
        year: "2025",
        event: "28 Years of Operational Excellence",
        detail:
            "Annual filings current. Active status maintained. Corporate profile current as of May 2025.",
    },
];

const values = [
    {
        code: "01",
        title: "Operational Integrity",
        body: "We do what we say we will do. Every shipment, every terminal operation, every client commitment is treated with the same level of accountability.",
    },
    {
        code: "02",
        title: "Safety Without Compromise",
        body: "Safety is built into every operational procedure. From terminal handling to road transport, our protocols exceed regulatory minimums.",
    },
    {
        code: "03",
        title: "Western Canadian Pride",
        body: "We are a Prairie company. We understand the pace, scale, and needs of Western Canadian industry — and we are built to serve it.",
    },
    {
        code: "04",
        title: "Long-Term Partnership",
        body: "Our clients do not hire us for a single shipment and move on. They build supply chain infrastructure with us over years and decades.",
    },
];

const index = () => {
    return (
        <>
            <PageHero
                label="About BCWEST"
                title="28 Years of Freight. One Name. One Standard."
                subtitle="From our 1997 incorporation in Winnipeg to our position as Western Canada's trusted freight and terminal operator, BCWEST has remained committed to operational excellence above all."
                backgroundImage="/about.jpg"
            />

            {/* Stats bar */}
            <section className="bg-ocean border-border border-y">
                <div className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                val: 28,
                                suf: "+",
                                label: "Years Operating",
                                code: "FOUNDED_1997",
                            },
                            {
                                val: 5,
                                suf: "+",
                                label: "Provinces Served",
                                code: "CDN_NETWORK",
                            },
                            { val: 2, suf: "", label: "Board Directors", code: "GOVERNANCE" },
                            {
                                val: 100,
                                suf: "K+",
                                label: "Annual Freight Moves",
                                code: "THROUGHPUT",
                            },
                        ].map((s, i) => (
                            <div
                                key={s.code}
                                className={`px-6 py-8 ${i < 3 ? "border-r border-steel/20" : ""}`}
                            >
                                <div className="mb-1 font-mono text-[9px] text-gold/50 uppercase tracking-widest">
                                    {s.code}
                                </div>
                                <div className="mb-1 font-display font-black text-ivory text-2xl md:text-3xl xl:text-4xl">
                                    <AnimatedCounter end={String(s.val)} suffix={s.suf} />
                                </div>
                                <div className="text-fog/60 text-xs">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="gap-12 lg:gap-20 grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <SectionLabel label="Our Story" />
                            <h2 className="mb-6 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                                Built from the Ground Up in Western Canada
                            </h2>
                            <div className="relative">
                                <img
                                    src="/industries/6.jpg"
                                    alt="BCWEST operations"
                                    className="w-full object-cover aspect-4/3"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-ocean/70 to-transparent" />
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="space-y-6 mb-10 text-foreground/70 leading-relaxed">
                                <p>
                                    BCWEST Terminal Freight Services Inc. was born in Winnipeg on
                                    September 26, 1997 — incorporated under the Canada Business
                                    Corporations Act with a simple mission: to build the most
                                    reliable freight and terminal operation in Western Canada.
                                </p>
                                <p>
                                    Originally registered as 3417794 Canada Ltd., the company
                                    underwent a strategic corporate rebrand in February 2000 to
                                    BCWEST Terminal Freight Services Inc., a name that better
                                    reflected our growing expertise in terminal operations,
                                    freight transportation, and logistics coordination across the
                                    western provinces.
                                </p>
                                <p>
                                    Over 28 years of operations, we have remained privately held,
                                    operationally focused, and deeply committed to the Western
                                    Canadian industries we serve. We have not chased scale for
                                    scale's sake. We have built depth — operational depth, network
                                    depth, and client relationship depth.
                                </p>
                                <p>
                                    Today, from our registered offices at 201 Portage Avenue in
                                    Winnipeg, we operate freight transportation, terminal
                                    services, warehousing, logistics coordination, cross-border
                                    shipping, and tank farm operations. We are one of Western
                                    Canada's most trusted freight partners — not because we say
                                    so, but because our clients have trusted us with their supply
                                    chains for decades.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="relative bg-ocean py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <SectionLabel label="Corporate History" />
                    <h2 className="mb-16 font-display font-black text-ivory text-4xl md:text-5xl xl:text-6xl uppercase">
                        Milestones of
                        <br />
                        <span className="text-gold">28 Years</span>
                    </h2>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="hidden lg:block top-0 bottom-0 left-16 absolute bg-gold/20 w-px" />

                        <div className="space-y-0">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="group gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-12 py-8 border-steel/20 border-b last:border-b-0"
                                >
                                    <div className="flex items-start gap-6 lg:col-span-2">
                                        <div className="hidden lg:block relative">
                                            <div className="z-5 relative bg-gold/20 group-hover:bg-gold border border-gold/50 rounded-full size-4 transition-colors duration-200" />
                                        </div>
                                        <div className="font-display font-black text-gold text-lg md:text-xl xl:text-2xl">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className="lg:col-span-10">
                                        <h3 className="mb-2 font-heading font-bold text-ivory group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors duration-200">
                                            {item.event}
                                        </h3>
                                        <p className="text-[11px] text-fog/60 md:text-xs xl:text-sm leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <SectionLabel label="Our Values" />
                    <h2 className="mb-16 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                        What We Stand For
                    </h2>
                    <div className="gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-steel/30">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`p-4 md:p-6 xl:p-8 group hover:bg-gold/5 transition-colors duration-300 ${i < values.length - 1 ? "border-r border-steel/30" : ""}`}
                            >
                                <div className="mb-4 font-mono text-[9px] text-gold/40 uppercase tracking-widest">
                                    {v.code}
                                </div>
                                <div className="bg-gold mb-5 w-8 h-0.5" />
                                <h3 className="mb-4 font-heading font-bold group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors">
                                    {v.title}
                                </h3>
                                <p className="text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
                                    {v.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <LeadershipSection />
            <CTA />
        </>
    );
};

export default index;
