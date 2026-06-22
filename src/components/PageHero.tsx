import { motion } from "framer-motion";

import { SectionLabel } from "#/pages/Home/Landing/AboutSection";

type PageProps = {
    label: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
    children?: React.ReactNode;
}

export default function PageHero({
    label,
    title,
    subtitle,
    backgroundImage,
    children,
}: PageProps) {
    return (
        <section className="relative flex items-end min-h-[50vh] md:min-h-[55vh] xl:min-h-[60vh] overflow-hidden">
            {/* Background */}
            {backgroundImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-50"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-midnight/95 via-midnight/80 to-midnight/60" />
                    <div className="absolute inset-0 bg-linear-to-t from-midnight via-transparent to-midnight/30" />
                </>
            )}
            {!backgroundImage && (
                <>
                    <div className="absolute inset-0 bg-gradient-dark" />
                    <div className="absolute inset-0 grid-overlay opacity-30" />
                </>
            )}

            {/* Content */}
            <div className="z-5 relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-20 md:py-24 xl:py-28 w-full max-w-screen-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <SectionLabel label={label} />
                    <h1 className="mb-4 max-w-4xl font-display font-black text-ivory text-5xl sm:text-6xl md:text-7xl xl:text-8xl uppercase">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="max-w-2xl text-fog/70 text-sm md:text-base xl:text-lg leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                    {children}
                </motion.div>
            </div>

            {/* Bottom rule */}
            <div className="right-0 bottom-0 left-0 absolute bg-gold/30 h-px" />
        </section>
    );
}
