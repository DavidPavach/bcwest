import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, TickCircle } from "iconsax-reactjs";
import { useCallback, useEffect, useState } from "react";

import Document from "./Document";
import RadarVisual from "./RadarVisual";
import { Button } from "./ui/button";

const VERIFICATION_STEPS = [
    { label: "Reading QR payload", delay: 300 },
    { label: "Connecting to registry", delay: 650 },
    { label: "Matching certificate hash", delay: 650 },
    { label: "Confirming issuer signature", delay: 600 },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function MetaRow({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="flex justify-between mb-1.25 font-mono text-[9px] md:text-[10px] xl:text-[11px]">
            <span style={{ color: "hsl(215 12% 35%)" }}>{label}</span>
            <span style={{ color: accent ? "var(--teal)" : "hsl(215 12% 55%)" }}>
                {value}
            </span>
        </div>
    );
}

function CornerTicks() {
    return (
        <>
            <span
                className="top-2 left-2 absolute border-green-500 border-t-2 border-l-2 rounded-tl size-3 md:size-3.5 xl:size-4"
            />
            <span
                className="top-2 right-2 absolute border-green-500 border-t-2 border-r-2 rounded-tr size-3 md:size-3.5 xl:size-4"
            />
            <span
                className="bottom-2 left-2 absolute border-green-500 border-b-2 border-l-2 rounded-bl size-3 md:size-3.5 xl:size-4"
            />
            <span
                className="right-2 bottom-2 absolute border-green-500 border-r-2 border-b-2 rounded-br size-3 md:size-3.5 xl:size-4"
            />
        </>
    );
}

const DocsVerification = ({ doc }: { doc: Documents }) => {
    const [stage, setStage] = useState<string>("idle");
    const [visibleSteps, setVisibleSteps] = useState<number>(0);
    const [completedSteps, setCompletedSteps] = useState<number>(0);
    const [issuedDate, setIssuedDate] = useState("--");
    const [clock, setClock] = useState("--:--:--");
    const [view, setView] = useState<boolean>(false);

    const verificationId = doc.documentNumber;

    // Live clock
    useEffect(() => {
        const update = () => setClock(new Date().toTimeString().slice(0, 8));
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    const runFlow = useCallback(async () => {
        setStage("scanning");
        setVisibleSteps(0);
        setCompletedSteps(0);
        setIssuedDate("--");

        for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
            await wait(VERIFICATION_STEPS[i].delay);
            setVisibleSteps(i + 1);
            await wait(120);
            setCompletedSteps(i + 1);
        }

        setStage("verifying");
        await wait(550);

        setStage("verified");
        setIssuedDate(
            new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        );
    }, []);

    // Auto-run on mount
    useEffect(() => {
        const timer = setTimeout(runFlow, 500);
        return () => clearTimeout(timer);
    }, [runFlow]);

    const isVerified = stage === "verified";
    const isScanning = stage === "scanning";

    const statusTitle = isVerified
        ? "VERIFIED AUTHENTIC"
        : stage === "verifying"
            ? "VERIFYING"
            : isScanning
                ? "SCANNING"
                : "INITIALIZING";

    const statusSub = isVerified
        ? "Document Number matches issuing record"
        : stage === "verifying"
            ? "Cross-checking issuing authority…"
            : "Reading secure tag…";

    const toggleView = () => setView((prev) => !prev);

    return (
        <>
            {view ?
                <Document doc={doc} /> :
                <div className="relative flex justify-center items-center px-5 py-12 xl:w-120 md:w-md min-w-96 overflow-hidden">

                    <div className="z-5 relative w-full">
                        {/* Eyebrow */}
                        <div className="flex justify-between items-center mb-3.5 px-0.5">
                            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted-foreground uppercase tracking-wide">
                                <span
                                    className="bg-teal rounded-full size-1 md:size-1.5 xl:size-2 animate-pulse-dot"
                                    style={{ boxShadow: "0 0 8px var(--teal)" }}
                                />
                                SECURE VERIFICATION
                            </span>
                            <span className="font-mono text-[10.5px] text-muted-foreground tracking-wide">
                                {clock}
                            </span>
                        </div>

                        {/* Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative flex flex-col p-4 md:p-6 xl:p-8 border border-border min-h-107.5 overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(180deg, hsl(225 20% 11%) 0%, hsl(220 18% 9%) 100%)",
                                boxShadow:
                                    "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 80px -20px hsl(var(--teal) / 0.08)",
                            }}
                        >
                            <CornerTicks />
                            <div className="absolute inset-2.5 border border-teal/12 rounded-[14px] pointer-events-none" />

                            <RadarVisual stage={stage} />

                            {/* Status */}
                            <div className="mb-4 min-h-13.5 text-center">
                                <h3
                                    className={`${isVerified ? "text-teal" : "text-muted-foreground"} font-display font-bold text-base tracking-wide transition-colors duration-300`}
                                >
                                    {statusTitle}
                                </h3>
                                <p
                                    className={`font-mono text-[10.5px] tracking-wide mt-1.5 h-3.5`}
                                    style={{ color: "hsl(215 12% 35%)" }}
                                >
                                    {statusSub}
                                </p>
                            </div>

                            {/* Log lines */}
                            <div className="flex flex-col flex-1 gap-1.75 mb-2 min-h-19.5">
                                {VERIFICATION_STEPS.map((step, i) => {
                                    const visible = i < visibleSteps;
                                    const done = i < completedSteps;
                                    return (
                                        <div
                                            key={step.label}
                                            className="flex items-center gap-x-2 font-mono text-[10.5px] transition-all duration-300"
                                            style={{
                                                color: "hsl(215 12% 55%)",
                                                opacity: visible ? 1 : 0,
                                                transform: visible ? "translateY(0)" : "translateY(4px)",
                                            }}
                                        >
                                            <TickCircle variant="Bold" className={`${done ? "text-green-500" : ""} left-0.75 size-4`} />
                                            <p>{step.label}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Meta + Actions (revealed on verified) */}
                            <AnimatePresence>
                                {isVerified && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.15 }}
                                        className="mt-auto"
                                    >
                                        <div className="pt-3.5 border-border border-t">
                                            <MetaRow label="Number of Documents" value={`${doc.images.length}`} />
                                            <MetaRow
                                                label="Verification ID"
                                                value={verificationId}
                                                accent
                                            />
                                            <MetaRow label="View Date" value={issuedDate} />
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.35 }}
                                            className="flex gap-2 mt-4"
                                        >
                                            <Button onClick={toggleView} className="w-full text-[10px] md:text-[11px] xl:text-xs">
                                                <FolderOpen className="size-3 md:size-3.5 xl:size-4" />
                                                View Documents
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            }
        </>
    );
};

export default DocsVerification;
