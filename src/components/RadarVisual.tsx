import { AnimatePresence, motion } from "framer-motion";
import { Check, QrCode } from "lucide-react";

export default function RadarVisual({ stage }: { stage: string }) {
    const isScanning = stage === "scanning";
    const isVerified = stage === "verified";

    return (
        <div className="relative flex justify-center items-center mx-auto mb-5 size-45">
            {/* Concentric rings */}
            <div className="absolute border border-border rounded-full size-45" />
            <div className="absolute border border-teal/18 rounded-full size-35" />
            <div className="absolute border border-teal/28 rounded-full size-25" />

            {/* Radar sweep — spinning conic gradient */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute rounded-full size-45 animate-spin"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, hsl(var(--teal) / 0.7) 360deg)",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Burst pulse on verify */}
            <AnimatePresence>
                {isVerified && (
                    <motion.div
                        initial={{ opacity: 0.9, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="absolute border border-teal rounded-full size-45 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Core circle */}
            <div
                className={`relative size-19.5 rounded-full flex items-center border justify-center z-5 ${isVerified ? "border-teal" : "border-border"}`}
                style={{
                    background:
                        "radial-gradient(circle at 35% 30%, hsl(225 20% 14%), hsl(230 25% 6%) 70%)",
                    boxShadow: isVerified
                        ? "0 0 30px hsl(var(--teal) / 0.45), inset 0 0 18px hsl(var(--teal) / 0.15)"
                        : "none",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                }}
            >
                <AnimatePresence mode="wait">
                    {isVerified ? (
                        <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.35 }}
                        >
                            <Check className="size-8 text-teal" strokeWidth={2.4} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="qr"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.35 }}
                        >
                            <QrCode
                                className="size-7 text-muted-foreground"
                                strokeWidth={1.6}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
