import { ArrowRight3, Mobile } from "iconsax-reactjs";
import { useState } from "react";

export default function CTA() {
    const [showQuote, setShowQuote] = useState<boolean>(false);

    // Functions
    const toggleQuote = () => setShowQuote((prev) => !prev);

    return (
        <section className="relative bg-ocean overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/cta.jpg"
                    alt=""
                    className="opacity-15 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-ocean via-ocean/95 to-ocean/80" />
                <div className="absolute inset-0 grid-overlay opacity-10" />
            </div>

            <div className="top-0 right-0 left-0 absolute bg-gold/40 h-px" />
            <div className="right-0 bottom-0 left-0 absolute bg-gold/20 h-px" />

            <div className="relative mx-auto px-6 lg:px-10 py-20 lg:py-28 max-w-screen-2xl">
                <div className="items-center gap-10 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <div className="mb-4 font-mono text-[10px] text-gold uppercase tracking-wider">
                            READY TO MOVE?
                        </div>
                        <h2 className="mb-4 font-display font-black text-ivory text-4xl sm:text-5xl md:text-6xl xl:text-7xl uppercase">
                            Let's Build Your
                            <br />
                            <span className="text-gold">Logistics Solution</span>
                        </h2>
                        <p className="max-w-xl text-fog/70 leading-relaxed">
                            Whether you need a single freight move or a complete supply chain
                            partnership, our operations team is ready to discuss your
                            requirements. No automated forms. No call centres. Real operators.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 lg:col-span-4">
                        <button
                            type="button"
                            onClick={toggleQuote}
                            className="group flex justify-between items-center bg-gold hover:bg-gold/90 hover:shadow-gold px-6 py-4 font-semibold text-midnight tracking-wide transition-all duration-200 cursor-pointer"
                        >
                            <span>Request a Quote</span>
                            <ArrowRight3 className="size-4 md:size-4.5 xl:size-5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <a
                            href="tel:2049585300"
                            className="group flex justify-between items-center px-6 py-4 border border-fog/30 hover:border-gold font-medium text-fog hover:text-gold tracking-wide transition-all duration-200"
                        >
                            <span className="flex items-center gap-3">
                                <Mobile className="size-4 md:size-4.5 xl:size-5" />
                                204-958-5300
                            </span>
                            <span className="font-mono text-[10px] text-fog/40 md:text-[11px] group-hover:text-gold/60 xl:text-xs">
                                Call Direct
                            </span>
                        </a>
                        <div className="pt-2 border-fog/10 border-t">
                            <div className="font-mono text-[9px] text-fog/40 md:text-[10px] xl:text-[11px] leading-relaxed">
                                Suite 2900 – 201 Portage Avenue
                                <br />
                                Winnipeg, Manitoba R3B 3K6
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
