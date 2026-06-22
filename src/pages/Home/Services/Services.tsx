import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight3, TickCircle } from "iconsax-reactjs";

import PageHero from "#/components/PageHero";
import { SectionLabel } from "../Landing/AboutSection";
import CTA from "../Landing/CTA";

type ServiceBody = {
    code: string;
    title: string;
    subtitle: string;
    image: string;
    overview: string;
    capabilities: string[];
    process: Array<{
        step: string;
        title: string;
        desc: string;
    }>;
    faqs: Array<{
        q: string;
        a: string;
    }>;
};

const serviceData: Record<string, ServiceBody> = {
    "freight": {
        code: "01",
        title: "Freight Transportation",
        subtitle:
            "Full-truckload, LTL, and specialized freight movement across Western Canada and cross-border corridors — with direct operational accountability.",
        image: "/services/1.jpg",
        overview: `BCWEST's freight transportation services form the backbone of Western Canadian supply chains. Operating since 1997, we have built deep carrier relationships, route expertise, and operational discipline across Manitoba, Saskatchewan, Alberta, and into US cross-border corridors.

We are not a freight broker. We are an operational freight company with direct accountability for every load we move. When your freight is under BCWEST's management, you deal with operators — not intermediaries.`,
        capabilities: [
            "Full Truckload (FTL) — Dry van, flatdeck, temperature-controlled",
            "Less Than Truckload (LTL) — Consolidated loads with reliable transit times",
            "Oversized & Overweight Freight — Permitted loads with route planning",
            "Time-Critical Delivery — Expedited services for urgent freight",
            "Cross-Province Corridors — MB, SK, AB, ON routing",
            "Cross-Border Canada–USA — Documented, compliant, coordinated",
        ],
        process: [
            {
                step: "01",
                title: "Inquiry & Quote",
                desc: "Provide your freight details and receive a direct operational quote — no automated forms.",
            },
            {
                step: "02",
                title: "Booking & Documentation",
                desc: "Load documentation, BOL preparation, and pre-movement compliance review.",
            },
            {
                step: "03",
                title: "Pickup & Terminal Processing",
                desc: "Pickup coordination, terminal check-in, and load confirmation.",
            },
            {
                step: "04",
                title: "In-Transit Management",
                desc: "Active load monitoring with direct operator contact available throughout transit.",
            },
            {
                step: "05",
                title: "Delivery & POD",
                desc: "Confirmed delivery with proof-of-delivery documentation and client notification.",
            },
        ],
        faqs: [
            {
                q: "Do you handle both FTL and LTL?",
                a: "Yes. BCWEST manages both full truckload and less-than-truckload freight across Western Canadian corridors.",
            },
            {
                q: "Can you handle temperature-sensitive freight?",
                a: "Yes. We coordinate temperature-controlled freight solutions for perishable and pharmaceutical cargo.",
            },
            {
                q: "Do you provide cross-border shipping?",
                a: "Yes. We manage Canada–US freight with full customs documentation and border compliance coordination.",
            },
        ],
    },
    "terminal": {
        code: "02",
        title: "Terminal Services",
        subtitle:
            "Integrated terminal operations including staging, transfer, consolidation, and freight management — the operational core of Western Canadian logistics.",
        image: "/services/2.jpg",
        overview: `Terminal operations are the heartbeat of freight logistics — and BCWEST has been running terminal facilities with operational precision since our incorporation in 1997. Our terminal capabilities form the strategic hub of our integrated freight network.

From freight consolidation and cross-docking to staging, transfer, and load planning, our terminal operations are engineered for throughput, accuracy, and speed.`,
        capabilities: [
            "Freight Consolidation — Multiple shipments combined for efficiency",
            "Cross-Dock Operations — Direct transfer without extended storage",
            "Staging Zones — Pre-staged loads for rapid departure",
            "Load Planning & Optimization — Maximize cube and weight utilization",
            "Gate Operations — Controlled inbound and outbound vehicle management",
            "Terminal Management Systems — Real-time freight visibility",
        ],
        process: [
            {
                step: "01",
                title: "Inbound Receipt",
                desc: "Freight received, verified against documentation, and entered into terminal management system.",
            },
            {
                step: "02",
                title: "Sort & Stage",
                desc: "Freight sorted by destination and staged in designated zones for efficient outbound loading.",
            },
            {
                step: "03",
                title: "Consolidation",
                desc: "Outbound loads consolidated by route for maximum efficiency and cost control.",
            },
            {
                step: "04",
                title: "Load & Dispatch",
                desc: "Loads confirmed, sealed, and dispatched with all required documentation.",
            },
            {
                step: "05",
                title: "Reporting",
                desc: "Terminal throughput and exception reporting provided to clients.",
            },
        ],
        faqs: [
            {
                q: "What is cross-docking?",
                a: "Cross-docking is the direct transfer of freight from inbound to outbound vehicles with minimal storage time — maximizing speed and reducing handling costs.",
            },
            {
                q: "Can you handle mixed freight at your terminal?",
                a: "Yes. Our terminal handles general cargo, temperature-sensitive freight, oversized items, and industrial goods.",
            },
        ],
    },
    "warehousing": {
        code: "03",
        title: "Warehousing & Storage",
        subtitle:
            "Secure, climate-capable warehousing with full inventory management and distribution support.",
        image: "/services/3.jpg",
        overview: `BCWEST warehousing operations provide Western Canadian businesses with professional storage, inventory management, and distribution services in Winnipeg — the geographic center of Canada and a natural hub for Prairie logistics.

Our facilities offer flexible short and long-term storage, pick-and-pack services, and seamless integration with our freight transportation network.`,
        capabilities: [
            "Short & Long-Term Storage — Flexible terms to match your operational rhythm",
            "Climate-Controlled Facilities — Temperature and humidity managed environments",
            "Inventory Management — Accurate real-time inventory tracking",
            "Pick, Pack & Ship — Order fulfilment and preparation services",
            "Security & Surveillance — 24/7 monitored facility",
            "RFID & Barcode Tracking — Precision inventory control",
        ],
        process: [
            {
                step: "01",
                title: "Intake",
                desc: "Goods received, inspected, and entered into inventory management system.",
            },
            {
                step: "02",
                title: "Storage Assignment",
                desc: "Assigned to appropriate storage zone based on product requirements.",
            },
            {
                step: "03",
                title: "Inventory Management",
                desc: "Continuous cycle counting and inventory accuracy maintenance.",
            },
            {
                step: "04",
                title: "Order Processing",
                desc: "Pick and pack operations executed against client orders.",
            },
            {
                step: "05",
                title: "Outbound Shipping",
                desc: "Prepared orders handed off to BCWEST freight or client-designated carrier.",
            },
        ],
        faqs: [
            {
                q: "What storage durations do you offer?",
                a: "We offer flexible short-term, long-term, and ongoing storage arrangements to match operational and seasonal requirements.",
            },
            {
                q: "Do you offer pick-and-pack services?",
                a: "Yes. Our warehousing team provides order picking, packing, and preparation for outbound shipment.",
            },
        ],
    },
    "logistics": {
        code: "04",
        title: "Logistics Coordination",
        subtitle:
            "End-to-end supply chain orchestration with real-time visibility, carrier management, and proactive exception handling.",
        image: "/services/4.jpg",
        overview: `BCWEST Logistics Coordination transforms the complexity of multi-leg supply chains into seamless, managed operations. Our logistics team provides end-to-end coordination — from origin pickup to final delivery — with full visibility and proactive management at every step.

We don't just book freight. We manage it. When issues arise — and in freight, they do — our team responds, re-routes, and resolves.`,
        capabilities: [
            "Supply Chain Design — Network mapping and optimization",
            "Route Planning & Optimization — Lowest cost, fastest time",
            "Multi-Modal Coordination — Road, rail, intermodal",
            "Carrier Management — Vetted carrier network management",
            "Real-Time Freight Visibility — Track status at every leg",
            "Documentation & Compliance — BOL, POD, customs, regulatory",
        ],
        process: [
            {
                step: "01",
                title: "Supply Chain Assessment",
                desc: "Analysis of your current logistics structure, costs, and performance gaps.",
            },
            {
                step: "02",
                title: "Solution Design",
                desc: "Tailored logistics plan aligned to your operational and financial requirements.",
            },
            {
                step: "03",
                title: "Implementation",
                desc: "Carrier engagement, system setup, and process deployment.",
            },
            {
                step: "04",
                title: "Active Management",
                desc: "Ongoing shipment monitoring, exception management, and proactive communication.",
            },
            {
                step: "05",
                title: "Performance Reporting",
                desc: "Regular KPI reporting and continuous improvement reviews.",
            },
        ],
        faqs: [
            {
                q: "Do you manage third-party carriers?",
                a: "Yes. BCWEST coordinates a vetted carrier network as part of managed logistics services.",
            },
            {
                q: "Can you handle multi-modal freight?",
                a: "Yes. We coordinate road, rail, and intermodal freight movements as part of comprehensive logistics solutions.",
            },
        ],
    },
    "cross": {
        code: "05",
        title: "Cross-Border Shipping",
        subtitle:
            "Canada–US freight movement with expert customs coordination, border compliance documentation, and established cross-border corridors.",
        image: "/services/5.jpg",
        overview: `Cross-border freight is a discipline unto itself. Canada–US trade under CUSMA/USMCA demands precise documentation, regulatory compliance, and border expertise that generalist carriers cannot reliably provide.

BCWEST has built dedicated cross-border freight capabilities for Manitoba-based exporters and importers, managing the full documentation lifecycle from origin to cleared delivery.`,
        capabilities: [
            "Canada–USA Freight Corridors — Established Manitoba border crossings",
            "Customs Documentation — Complete C/B 3 & B3 preparation",
            "CUSMA/USMCA Certificate of Origin Management",
            "Duty & Tariff Analysis — Classification and compliance",
            "Bond Management — Customs bond coordination",
            "C-TPAT & PIP Compliance Awareness",
        ],
        process: [
            {
                step: "01",
                title: "Pre-Shipment Documentation",
                desc: "All export documentation prepared, verified, and filed before freight moves.",
            },
            {
                step: "02",
                title: "Border Coordination",
                desc: "Advance border notification and customs broker coordination.",
            },
            {
                step: "03",
                title: "Crossing & Clearance",
                desc: "Freight presented at border with complete documentation package.",
            },
            {
                step: "04",
                title: "Onward Delivery",
                desc: "US-side delivery coordinated with vetted American carrier partners.",
            },
            {
                step: "05",
                title: "Documentation Archive",
                desc: "Full trade document retention for audit and compliance requirements.",
            },
        ],
        faqs: [
            {
                q: "Do you handle CUSMA certificates of origin?",
                a: "Yes. We manage CUSMA/USMCA certificate of origin preparation as part of our cross-border documentation service.",
            },
            {
                q: "Which border crossings do you use?",
                a: "We primarily operate through Manitoba border crossings including Emerson/Pembina and Boissevain/Dunseith.",
            },
        ],
    },
    "supply": {
        code: "06",
        title: "Supply Chain Solutions",
        subtitle:
            "Strategic supply chain design and managed logistics services for enterprise clients with complex, multi-lane operational requirements.",
        image: "/services/7.jpg",
        overview: `Enterprise supply chains require more than a carrier — they require a strategic partner who understands the full picture. BCWEST Supply Chain Solutions provides Western Canadian businesses with integrated logistics strategy, network design, and managed execution.

From vendor management to multi-modal network optimization, our supply chain team brings 28 years of Prairie logistics experience to every engagement.`,
        capabilities: [
            "Network Design & Optimization — Flow analysis and node planning",
            "Vendor Managed Inbound — Supplier pickup and consolidation",
            "Demand Planning Support — Freight volume forecasting",
            "Lead Time Optimization — Transit time compression strategies",
            "Continuous Improvement Programs — Quarterly performance reviews",
            "Technology Integration — TMS and ERP connectivity",
        ],
        process: [
            {
                step: "01",
                title: "Discovery & Analysis",
                desc: "Deep-dive assessment of your supply chain structure, cost base, and performance.",
            },
            {
                step: "02",
                title: "Strategy Development",
                desc: "Recommendations for network optimization, cost reduction, and service improvement.",
            },
            {
                step: "03",
                title: "Implementation Planning",
                desc: "Phased implementation roadmap with clear milestones.",
            },
            {
                step: "04",
                title: "Execution",
                desc: "BCWEST operational team executes the agreed logistics model.",
            },
            {
                step: "05",
                title: "Governance & Review",
                desc: "Regular performance reviews and continuous optimization.",
            },
        ],
        faqs: [
            {
                q: "Is this suitable for smaller businesses?",
                a: "Our supply chain solutions scale from mid-market businesses to large enterprise clients depending on the complexity and volume involved.",
            },
            {
                q: "Do you integrate with our existing TMS?",
                a: "Yes. We can work with client TMS systems or provide reporting through our own operational visibility tools.",
            },
        ],
    },
    "cargo": {
        code: "07",
        title: "Cargo Handling",
        subtitle:
            "Professional cargo handling for general, bulk, oversized, and specialized freight at BCWEST terminal facilities.",
        image: "/services/8.jpg",
        overview: `Cargo handling is the physical interface between freight and facility — and every error at this stage has downstream consequences. BCWEST cargo handling teams are trained, equipped, and held to operational standards that protect your freight from receipt to dispatch.

We handle general cargo, bulk commodities, oversized items, fragile goods, and hazardous materials in accordance with all applicable regulatory requirements.`,
        capabilities: [
            "General Cargo Handling — Safe, documented, efficient",
            "Bulk Commodity Loading/Unloading — Volume-efficient operations",
            "Oversized Load Management — Specialized equipment and protocols",
            "Fragile & High-Value Cargo — Enhanced care protocols",
            "Hazardous Materials Handling — TDG compliant procedures",
            "Mechanical Handling Equipment — Forklift, crane, conveyor operations",
        ],
        process: [
            {
                step: "01",
                title: "Pre-Handling Assessment",
                desc: "Cargo evaluated for handling requirements, weight, dimensions, and special conditions.",
            },
            {
                step: "02",
                title: "Equipment Preparation",
                desc: "Appropriate mechanical handling equipment staged and prepared.",
            },
            {
                step: "03",
                title: "Handling Execution",
                desc: "Cargo handled in accordance with documented protocols and client specifications.",
            },
            {
                step: "04",
                title: "Inspection & Documentation",
                desc: "Post-handling inspection with condition documentation before onward movement.",
            },
            {
                step: "05",
                title: "Placement & Securing",
                desc: "Freight correctly placed and secured in vehicle or storage location.",
            },
        ],
        faqs: [
            {
                q: "Do you handle hazardous materials?",
                a: "Yes. We handle TDG-classified hazardous materials under strict compliance with Transportation of Dangerous Goods regulations.",
            },
            {
                q: "Can you handle cargo that requires special equipment?",
                a: "Yes. Our terminal is equipped with various mechanical handling equipment for general, bulk, and oversized cargo.",
            },
        ],
    },
    "tank": {
        code: "08",
        title: "Tank Farm Operations",
        subtitle:
            "Bulk liquid storage and handling with environmental compliance, safety management systems, and volume monitoring.",
        image: "/services/6.jpg",
        overview: `Tank farm operations demand the highest level of environmental accountability, safety management, and operational discipline. BCWEST operates bulk liquid storage and transfer facilities with comprehensive environmental compliance programs and safety systems.

Our tank farm capabilities serve the Western Canadian energy, industrial, and agricultural sectors — providing secure bulk liquid storage with full regulatory compliance.`,
        capabilities: [
            "Bulk Liquid Storage — Multi-product storage capabilities",
            "Transfer Operations — Truck, rail, and pipeline interfacing",
            "Environmental Compliance — Full regulatory program",
            "Safety Management Systems — Formal SMS in operation",
            "Volume Monitoring & Reporting — Precision measurement systems",
            "Spill Prevention & Response — Emergency response protocols",
        ],
        process: [
            {
                step: "01",
                title: "Product Receipt",
                desc: "Incoming product measured, tested, and documented upon receipt.",
            },
            {
                step: "02",
                title: "Storage Management",
                desc: "Product stored in appropriate tanks with ongoing monitoring.",
            },
            {
                step: "03",
                title: "Environmental Monitoring",
                desc: "Continuous environmental compliance monitoring and reporting.",
            },
            {
                step: "04",
                title: "Transfer Operations",
                desc: "Outbound transfers executed with measurement verification and documentation.",
            },
            {
                step: "05",
                title: "Reporting & Compliance",
                desc: "Full volume and compliance reporting to clients and regulatory bodies.",
            },
        ],
        faqs: [
            {
                q: "What environmental regulations govern your tank farm?",
                a: "Our tank farm operations comply with applicable Manitoba and federal environmental regulations including spill prevention, containment, and reporting requirements.",
            },
            {
                q: "What products can you store?",
                a: "We store a range of bulk liquid products. Contact our operations team to discuss your specific product requirements and compatibility.",
            },
        ],
    },
};

export default function ServicePage({ slug }: { slug: string }) {
    const service = serviceData[slug];

    if (!service) {
        return (
            <div className="flex justify-center items-center bg-midnight min-h-screen">
                <div className="text-center">
                    <div className="mb-4 font-mono text-gold text-sm">
                        SERVICE_NOT_FOUND
                    </div>
                    <Link
                        to="/services"
                        className="text-fog/60 hover:text-ivory transition-colors"
                    >
                        ← Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHero
                label={service.title}
                title={service.title}
                subtitle={service.subtitle}
                backgroundImage={service.image}
            />

            {/* Overview */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="gap-12 grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <SectionLabel label="Service Overview" />
                            <h2 className="mb-6 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                                What We <span className="text-gold">Deliver</span>
                            </h2>
                            <div className="text-foreground/70 leading-relaxed whitespace-pre-line">
                                {service.overview}
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="border border-steel/30 overflow-hidden">
                                <div className="px-5 py-3 border-steel/30 border-b">
                                    <div className="font-mono text-[10px] text-gold/80 uppercase tracking-widest">
                                        {"CAPABILITIES // SERVICE"}_{service.code}
                                    </div>
                                </div>
                                {service.capabilities.map((cap, i) => (
                                    <div
                                        key={cap}
                                        className={`flex items-start gap-3 px-5 py-3.5 ${i < service.capabilities.length - 1 ? "border-b border-steel/15" : ""}`}
                                    >
                                        <TickCircle className="mt-0.5 size-4 md:size-4.5 xl:size-5 text-teal shrink-0" />
                                        <span className="text-[11px] text-foreground/70 md:text-xs xl:text-sm">
                                            {cap}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="relative bg-ocean py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <SectionLabel label="Our Process" />
                    <h2 className="mb-12 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                        How It <span className="text-gold">Works</span>
                    </h2>
                    <div className="gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border border-steel/30">
                        {service.process.map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`p-4 md:p-5 xl:p-6 ${i < service.process.length - 1 ? "border-r border-steel/30" : ""} group hover:bg-fog/5 transition-colors`}
                            >
                                <div className="mb-3 font-mono text-[9px] text-gold/40 uppercase tracking-widest">
                                    STEP_{step.step}
                                </div>
                                <div className="mb-3 font-display font-black text-gold/20 text-xl md:text-2xl xl:text-3xl">
                                    {step.step}
                                </div>
                                <h3 className="mb-2 font-heading font-bold text-ivory group-hover:text-gold uppercase transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-[10px] text-fog/60 md:text-[11px] xl:text-xs leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <SectionLabel label="FAQ" />
                    <h2 className="mb-12 font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase">
                        Common <span className="text-gold">Questions</span>
                    </h2>
                    <div className="space-y-0 border border-steel/30 max-w-3xl">
                        {service.faqs.map((faq, i) => (
                            <div
                                key={faq.a}
                                className={`p-4 md:p-5 xl:p-6 ${i < service.faqs.length - 1 ? "border-b border-steel/30" : ""}`}
                            >
                                <h3 className="mb-3 font-heading font-bold text-sm md:text-base xl:text-lg uppercase">
                                    {faq.q}
                                </h3>
                                <p className="text-[11px] text-foreground/60 text-sm leading-relaxed md:">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Link
                            to="/contact"
                            className="group inline-flex items-center gap-3 bg-gold hover:bg-gold/90 px-6 py-3 font-semibold text-[11px] text-midnight md:text-xs xl:text-sm tracking-wide transition-all duration-200"
                        >
                            Get a Quote for This Service
                            <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
