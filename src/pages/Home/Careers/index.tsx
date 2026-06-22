import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight3 } from "iconsax-reactjs";

import PageHero from "#/components/PageHero";
import { SectionLabel } from "../Landing/AboutSection";
import CTA from "../Landing/CTA";

const openings = [
    {
        title: "Senior Freight Coordinator",
        dept: "Operations",
        type: "Full-Time",
        location: "Winnipeg, MB",
        code: "JOB_01",
    },
    {
        title: "Terminal Operations Supervisor",
        dept: "Terminal Services",
        type: "Full-Time",
        location: "Winnipeg, MB",
        code: "JOB_02",
    },
    {
        title: "Cross-Border Logistics Specialist",
        dept: "Logistics",
        type: "Full-Time",
        location: "Winnipeg, MB",
        code: "JOB_03",
    },
    {
        title: "Warehouse Operations Lead",
        dept: "Warehousing",
        type: "Full-Time",
        location: "Winnipeg, MB",
        code: "JOB_04",
    },
    {
        title: "Driver — FTL Long-Haul",
        dept: "Transportation",
        type: "Full-Time",
        location: "Western Canada",
        code: "JOB_05",
    },
];

const benefits = [
    {
        title: "Competitive Compensation",
        desc: "Market-leading wages and performance incentives for operational excellence.",
    },
    {
        title: "Western Canadian Roots",
        desc: "Work for a company that has been part of Western Canada's freight infrastructure for 28 years.",
    },
    {
        title: "Operational Growth",
        desc: "BCWEST invests in the professional development of every team member.",
    },
    {
        title: "Stable Employment",
        desc: "A federally incorporated corporation with decades of operational continuity — not a startup.",
    },
];

export default function Careers() {
    return (
        <>
            <PageHero
                label="Careers"
                title="Build Your Career in Freight & Logistics."
                subtitle="BCWEST is Western Canada's operational freight partner — and we're always looking for people who take the work seriously."
                backgroundImage="/cta.jpg"
            />

            {/* Culture */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <SectionLabel label="Our Culture" />
                            <h2 className="mb-6 font-display font-black xl:text-6xlx text-4xl md:text-5xl uppercase">
                                Where Operators
                                <br />
                                <span className="text-gold">Are Valued</span>
                            </h2>
                            <div className="space-y-4 text-foreground/70 leading-relaxed">
                                <p>
                                    At BCWEST, we don't hire people to sit in meetings. We hire
                                    people who know how to move freight, manage terminals,
                                    coordinate logistics, and solve operational problems under
                                    pressure.
                                </p>
                                <p>
                                    We are a 28-year-old company with the operational depth and
                                    stability that comes from genuine experience — not a pitch
                                    deck. When you join BCWEST, you join a team that has built
                                    Western Canada's freight infrastructure one shipment at a
                                    time.
                                </p>
                            </div>
                            <div className="gap-4 grid grid-cols-2 mt-8">
                                {benefits.map((b) => (
                                    <div key={b.title} className="pl-4 border-gold/40 border-l-2">
                                        <div className="mb-1 font-semibold text-[11px] md:text-xs xl:text-sm">
                                            {b.title}
                                        </div>
                                        <div className="text-[10px] text-foreground/50 md:text-[11px] xl:text-xs leading-relaxed">
                                            {b.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <img
                                src="/services/3.jpg"
                                alt="BCWEST team"
                                className="w-full object-cover aspect-4/3"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="relative bg-ocean py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl text-ivory">
                    <SectionLabel label="Open Positions" />
                    <h2 className="mb-12 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                        Current Openings
                    </h2>
                    <div className="space-y-0 border border-steel/30">
                        {openings.map((job, i) => (
                            <motion.div
                                key={job.code}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className={`group flex flex-col lg:flex-row lg:items-center justify-between px-4 md:px-5 xl:px-6 py-5 gap-4 ${i < openings.length - 1 ? "border-b border-steel/30" : ""} hover:bg-fog/5 transition-colors cursor-pointer`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className="hidden lg:block font-mono text-[9px] text-gold/60">
                                        {job.code}
                                    </span>
                                    <div>
                                        <div className="font-heading font-bold group-hover:text-gold text-base md:text-lg xl:text-xl uppercase transition-colors duration-200">
                                            {job.title}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="font-mono text-[10px] text-fog/50">
                                                {job.dept}
                                            </span>
                                            <span className="bg-steel/30 w-px h-3" />
                                            <span className="font-mono text-[10px] text-fog/50">
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="bg-teal/10 px-3 py-1 font-mono text-[9px] text-teal md:text-[10px] xl:text-[11px] uppercase">
                                        {job.type}
                                    </span>
                                    <Link
                                        to="/contact"
                                        className="flex items-center gap-2 font-mono text-[10px] text-gold md:text-[11px] hover:text-gold/70 xl:text-xs uppercase tracking-widest transition-colors"
                                    >
                                        Apply <ArrowRight3 className="w-3 h-3" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-6 text-[11px] text-fog/50 md:text-xs xl:text-sm">
                        Don't see a match? Send your resume to{" "}
                        <a
                            href="mailto:careers@bcwestterminal.ca"
                            className="text-gold hover:text-gold/80 transition-colors"
                        >
                            careers@bcwestterminal.ca
                        </a>
                    </p>
                </div>
            </section>

            <CTA />
        </>
    );
}
