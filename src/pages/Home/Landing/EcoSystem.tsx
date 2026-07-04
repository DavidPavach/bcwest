import { Drop, InfoCircle, ShieldSecurity, Ship } from "iconsax-reactjs";

import { SectionLabel } from "./AboutSection";

const INSPECTION = [
    "/ecosystem/sgs.jpeg", "/ecosystem/amspec.jpeg", "/ecosystem/intertek.jpeg", "/ecosystem/bureau.jpeg", "/ecosystem/cotecna.jpeg",
    "/ecosystem/sayBolt.jpeg", "/ecosystem/ahk.jpeg"
]

const GLOBAL = [
    "/ecosystem/shell.jpeg", "/ecosystem/bp.jpeg", "/ecosystem/mobil.jpeg", "/ecosystem/chevron.jpeg", "/ecosystem/total.jpeg",
    "/ecosystem/saudi.jpeg", "/ecosystem/sinopec.jpeg", "/ecosystem/petrochina.jpeg"
]

const SHIPPING = [
    "/ecosystem/maesrk.jpeg", "/ecosystem/bahri.jpeg", "/ecosystem/nyk.jpeg", "/ecosystem/mol.jpeg", "/ecosystem/hafnia.jpeg",
    "/ecosystem/stenaBulk.jpeg", "/ecosystem/teekay.jpeg"
]

const EcoSystem = () => {
    return (
        <main className="py-20 md:py-24 xl:py-28">
            <div className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                <header className="flex lg:flex-row flex-col justify-between lg:items-end gap-6 mb-16">
                    <div>
                        <SectionLabel label="Ecosystem" />
                        <h2 className="font-display font-black text-5xl md:text-6xl xl:text-7xl uppercase">
                            Industry
                            <br />
                            <span className="text-gold">Ecosystem</span>
                        </h2>
                    </div>
                    <div>
                        <p className="max-w-sm text-foreground/60 lg:text-right leading-relaxed">
                            Trusted Across the Global Energy, Storage & Marine Logistics
                            Network.
                        </p>
                    </div>
                </header>

                {/* Inspection Sub */}
                <Sub>
                    <div className="flex items-center gap-x-2">
                        <ShieldSecurity
                            variant="Bold"
                            className="size-5 md:size-5.5 xl:size-6 text-gold"
                        />
                        <h2 className="font-heading text-base md:text-lg xl:text-xl">
                            INSPECTION & CERTIFICATE PROVIDERS
                        </h2>
                    </div>
                </Sub>
                <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                    {INSPECTION.map((image) => (
                        <img key={image} src={image} alt={`company logo`} className="border border-border aspect-video" />
                    ))}
                </div>

                {/* Global Sub */}
                <Sub>
                    <div className="flex items-center gap-x-2">
                        <Drop
                            variant="Bold"
                            className="size-5 md:size-5.5 xl:size-6 text-green-500"
                        />
                        <h2 className="font-heading text-base md:text-lg xl:text-xl">
                            GLOBAL ENERGY COMPANIES
                        </h2>
                    </div>
                </Sub>
                <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                    {GLOBAL.map((image) => (
                        <img key={image} src={image} alt={`company logo`} className="border border-border aspect-video" />
                    ))}
                </div>

                {/* Shipping Sub */}
                <Sub>
                    <div className="flex items-center gap-x-2">
                        <Ship
                            variant="Bold"
                            className="size-5 md:size-5.5 xl:size-6 text-blue-500"
                        />
                        <h2 className="font-heading text-base md:text-lg xl:text-xl">
                            SHIPPING & MARING LOGISTICS
                        </h2>
                    </div>
                </Sub>
                <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                    {SHIPPING.map((image) => (
                        <img key={image} src={image} alt={`company logo`} className="border border-border aspect-video" />
                    ))}
                </div>

                <section className="flex gap-x-2 bg-muted p-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    <InfoCircle variant="Bold" className="size-4 md:size-4.5 xl:size-5 text-gold shrink-0" />
                    <p>
                        BCWEST Terminal Freight Service Inc. operates within the global petroleum storage, marine logistics, inspection, and shipping ecosystem. References to industry organizations above are intended to illustrate the broader operational environment in which our service are delivered and should not be interpreted as statements of endorsements, ownership or exclusive commercial relationships.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default EcoSystem;

const Sub = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex items-center gap-x-2">
            <div className="bg-border w-full h-0.5" />
            <div className="shrink-0">
                {children}
            </div>
            <div className="bg-border w-full h-0.5" />
        </main>
    );
};
