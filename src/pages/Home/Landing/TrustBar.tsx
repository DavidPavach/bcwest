import { motion } from "framer-motion";
import { Award, Global, ShieldSecurity, TruckFast } from "iconsax-reactjs";

const items = [
    {
        icon: ShieldSecurity,
        label: "CBCA Federally Registered",
        sub: "Corporation No. 341779-4",
    },
    {
        icon: Award,
        label: "Operating Since 1997",
        sub: "28+ Years of Excellence",
    },
    {
        icon: TruckFast,
        label: "Full-Service Freight",
        sub: "Terminal to Destination",
    },
    { icon: Global, label: "Western Canadian Network", sub: "Manitoba & Beyond" },
];

export default function TrustBar() {
    return (
        <section className="relative bg-ocean border-steel/30 border-y overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-15" />
            <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`flex gap-4 p-2 md:p-4 xl:p-6 py-6 ${i < items.length - 1 ? "border-r border-steel/20" : ""
                                    } ${i >= 2 ? "border-t border-steel/20 lg:border-t-0" : ""}`}
                            >
                                <div className="bg-gold/10 p-2 border border-gold/20 h-fit shrink-0">
                                    <Icon className="size-4 md:size-4.5 xl:size-5 text-gold" />
                                </div>
                                <div>
                                    <div className="font-semibold text-[11px] text-ivory md:text-xs xl:text-sm tracking-wide">
                                        {item.label}
                                    </div>
                                    <div className="mt-0.5 font-mono text-[10px] text-fog/50 md:text-[11px] xl:text-xs tracking-wider">
                                        {item.sub}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
