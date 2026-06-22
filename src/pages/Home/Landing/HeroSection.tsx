import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown3, ArrowRight3 } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";

import AnimatedCounter from "./AnimatedCounter";

const metrics = [
  { value: 28, suffix: "+", label: "Years Operating", mono: "EST_1997" },
  { value: 5, suffix: "+", label: "Provinces Served", mono: "CDN_NETWORK" },
  { value: 24, suffix: "/7", label: "Operations", mono: "ALWAYS_ON" },
  { value: 100, suffix: "K+", label: "Freight Moves", mono: "ANNUAL_OPS" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [showQuote, setShowQuote] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  // Functions
  const toggleQuote = () => setShowQuote((prev) => !prev);

  return (
    <section className="relative bg-midnight w-full min-h-175 overflow-hidden">
      {/* Video Background */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          poster="/hero.jpg"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-freight-train-6197/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Fallback image */}
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: 'url("/hero.jpg")',
            }}
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-linear-to-t from-midnight/90 via-midnight/20 to-midnight/40" />
      <div className="absolute inset-0 grid-overlay" />

      {/* Gold accent line */}
      <div className="top-0 right-0 left-0 absolute bg-linear-to-r from-transparent via-gold to-transparent h-0.5" />

      {/* Content */}
      <div className="z-5 relative flex flex-col justify-between mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-0 max-w-screen-2xl h-full">
        {/* Top — Technical label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-4 pt-28"
        >
          <div className="hidden lg:block flex-1 bg-fog/10 h-px" />
          <span className="hidden lg:block font-mono text-[10px] text-fog/40">
            CORP_NO: 341779-4 — CBCA REGISTERED
          </span>
        </motion.div>

        {/* Middle — Main headline */}
        <div className="flex flex-1 items-center">
          <div className="w-full">
            {/* Top-left: WE MOVE */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-0"
            >
              <h1
                className="font-black text-ivory leading-none tracking-tighter display-text"
                style={{ fontSize: "clamp(4.5rem, 12vw, 11rem)" }}
              >
                WE
                <br />
                MOVE
              </h1>
            </motion.div>

            {/* Bottom-right: COMMERCE */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-end lg:justify-end md:-mt-2 lg:-mt-4 xl:-mt-6"
            >
              <h1
                className="text-gold leading-none tracking-tighter display-text"
                style={{ fontSize: "clamp(4.5rem, 12vw, 11rem)" }}
              >
                COMMERCE
              </h1>
            </motion.div>

            {/* SubHeadline + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 my-8"
            >
              <div className="max-w-xl">
                <p className="text-fog/75 text-sm md:text-base xl:text-lg leading-relaxed">
                  Western Canada's freight terminal and logistics authority.
                  Operating since 1997 across Manitoba and beyond — delivering
                  cargo, operating terminals, and building supply chain
                  infrastructure.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={toggleQuote}
                  className="group flex items-center gap-3 bg-gold hover:bg-gold/90 hover:shadow-gold px-6 py-3.5 font-semibold text-background tracking-wide transition-all duration-200 cursor-pointer"
                >
                  Request a Quote
                  <ArrowRight3 className="size-4 md:size-4.5 xl:size-5 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  to="/services"
                  className="flex items-center gap-3 px-6 py-3.5 border border-fog/30 hover:border-gold font-medium text-fog hover:text-gold tracking-wide transition-all duration-200"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom — Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="pb-8"
        >
          <div className="gap-0 grid grid-cols-2 lg:grid-cols-4 border border-fog/10">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`px-6 py-5 ${i < metrics.length - 1 ? "border-r border-fog/10" : ""} ${i >= 2 ? "border-t border-fog/10 lg:border-t-0" : ""}`}
              >
                <div className="mb-1.5 font-mono text-[8px] text-gold/80 md:text-[9px] xl:text-[10px] uppercase tracking-[0.2em]">
                  {m.mono}
                </div>
                <div className="font-display font-black text-ivory text-3xl lg:text-4xl tracking-tight">
                  <AnimatedCounter
                    end={String(m.value)}
                    suffix={m.suffix}
                    duration={2000}
                  />
                </div>
                <div className="mt-0.5 text-[11px] text-fog/60 md:text-xs xl:text-sm tracking-wide">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="bottom-8 left-1/2 z-5 absolute flex flex-col items-center gap-2 -translate-x-1/2"
      >
        <span className="font-mono text-[9px] text-fog/40 md:text-[10px] xl:text-[11px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown3 className="size-3 md:size-3.5 xl:size-4 text-fog/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
