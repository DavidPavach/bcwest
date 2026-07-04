import { motion } from "framer-motion";
import { ArrowRight3, Clock, Location, Mobile, Sms, Whatsapp } from "iconsax-reactjs";
import { type SubmitEvent, useState } from "react";
import { toast } from "react-fox-toast";

import PageHero from "#/components/PageHero";
import { useCreateContact } from "#/services/mutations";
import { SectionLabel } from "../Landing/AboutSection";

type ContactForm = {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
};

const defaultValues = {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
};

export default function Contact() {


    const [form, setForm] = useState<ContactForm>(defaultValues);

    // Functions
    const reset = () => {
        setForm(defaultValues);
    };

    const newContact = useCreateContact();
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        newContact.mutate(
            { data: form },
            {
                onSuccess: () => {
                    toast.success("Your Contact Request was sent successfully.");
                    reset();
                },
                onError: ({ message }) => {
                    toast.error(message || "Failed to send request. Please try again.");
                },
            },
        );
    };

    return (
        <>
            <PageHero
                label="Contact"
                title="Let's Talk Operations."
                subtitle="Reach our team directly. No automated forms routed to an inbox. Real operators who understand freight."
                backgroundImage="/contact.jpg"
            />

            <section className="relative py-20 md:py-24 xl:py-28 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />

                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-4">
                            <SectionLabel index="12" label="Contact BCWEST" />
                            <h2 className="mb-8 font-display font-black text-display-md text-ivory uppercase">
                                Registered
                                <br />
                                <span className="text-gold">Office</span>
                            </h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gold/10 mt-0.5 p-2.5 border border-gold/20 shrink-0">
                                        <Location className="size-3 md:size-3.5 xl:size-4 text-gold" />
                                    </div>
                                    <div>
                                        <div className="mb-1 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                                            Registered Address
                                        </div>
                                        <div className="text-[11px] text-foreground/80 md:text-xs xl:text-sm leading-relaxed">
                                            201 Portage Avenue
                                            <br />
                                            Winnipeg, Manitoba R3B 3K6
                                            <br />
                                            Canada
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gold/10 p-2.5 border border-gold/20 shrink-0">
                                        <Mobile className="size-3 md:size-3.5 xl:size-4 text-gold" />
                                    </div>
                                    <div>
                                        <div className="mb-1 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                                            Direct Line
                                        </div>
                                        <a
                                            href="tel:+1 (581) 662-9646"
                                            className="text-[11px] text-foreground/80 hover:text-gold md:text-xs xl:text-sm transition-colors"
                                        >
                                            +1 (581) 662-9646
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gold/10 p-2.5 border border-gold/20 shrink-0">
                                        <Sms className="size-3 md:size-3.5 xl:size-4 text-gold" />
                                    </div>
                                    <div>
                                        <div className="mb-1 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                                            Email
                                        </div>
                                        <a
                                            href="mailto:info@bcwestterminal.ca"
                                            className="text-[11px] text-foreground/80 hover:text-gold md:text-xs xl:text-sm transition-colors"
                                        >
                                            info@bcwestterminal.ca
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gold/10 p-2.5 border border-gold/20 shrink-0">
                                        <Clock className="size-3 md:size-3.5 xl:size-4 text-gold" />
                                    </div>
                                    <div>
                                        <div className="mb-1 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                                            Operations
                                        </div>
                                        <div className="text-[11px] text-foreground/80 md:text-xs xl:text-sm">
                                            24/7 Operational Coverage
                                        </div>
                                        <div className="mt-0.5 font-mono text-[10px] text-foreground/40">
                                            Office: Mon–Fri, 8AM–5PM CST
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#25D366]/10 p-2.5 border border-[#25D366]/20 shrink-0">
                                        <Whatsapp className="size-3 md:size-3.5 xl:size-4 text-[#25D366]" />
                                    </div>
                                    <div>
                                        <div className="mb-1 font-mono text-[#25D366]/60 text-[10px] uppercase tracking-widest">
                                            WhatsApp
                                        </div>
                                        <a
                                            href="https://wa.me/message/YSCNI74HRUYAN1" target="_blank" rel="noopener noreferrer"
                                            className="text-[11px] text-foreground/80 hover:text-[#25D366] md:text-xs xl:text-sm transition-colors"
                                        >
                                            +1 (587) 882-9321
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Corporate details */}
                            <div className="space-y-3 p-5 border border-steel/30">
                                <div className="mb-3 font-mono text-[10px] text-gold uppercase tracking-widest">
                                    Corporate Information
                                </div>
                                {[
                                    { label: "Corporation No.", val: "341779-4" },
                                    { label: "Business No.", val: "873609150RC0001" },
                                    { label: "Status", val: "Active" },
                                    {
                                        label: "Governing Act",
                                        val: "Canada Business Corporations Act",
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex justify-between items-center py-1.5 border-steel/15 last:border-0 border-b"
                                    >
                                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                                            {row.label}
                                        </span>
                                        <span className="text-[10px] text-foreground/70 md:text-[11px] xl:text-xs">
                                            {row.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-8">
                            {newContact.isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gold/5 p-8 md:p-10 xl:p-12 border border-gold/30 text-center"
                                >
                                    <div className="mb-4 font-mono text-[10px] text-gold uppercase tracking-widest">
                                        Transmission Received
                                    </div>
                                    <h3 className="mb-4 font-display font-black text-xl md:text-2xl xl:text-3xl uppercase">
                                        Message Sent
                                    </h3>
                                    <p className="mx-auto max-w-md text-foreground/60">
                                        Our operations team will review your inquiry and respond
                                        within one business day.
                                    </p>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="border border-steel/30"
                                >
                                    <div className="bg-ocean/30 px-6 py-4 border-steel/30 border-b">
                                        <div className="font-mono text-[10px] text-gold uppercase tracking-widest">
                                            {"INQUIRY FORM // BCWEST_CONTACT"}
                                        </div>
                                    </div>
                                    <div className="space-y-6 p-4 md:p-6 xl:p-8">
                                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                            {[
                                                {
                                                    id: "fullName",
                                                    label: "Full Name",
                                                    type: "text",
                                                    required: true,
                                                },
                                                {
                                                    id: "company",
                                                    label: "Company / Organization",
                                                    type: "text",
                                                    required: true,
                                                },
                                                {
                                                    id: "email",
                                                    label: "Email Address",
                                                    type: "email",
                                                    required: true,
                                                },
                                                {
                                                    id: "phone",
                                                    label: "Phone Number",
                                                    type: "tel",
                                                    required: false,
                                                },
                                            ].map((field) => (
                                                <div key={field.id}>
                                                    <label
                                                        htmlFor={field.id}
                                                        className="block mb-2 font-mono text-[9px] text-foreground/50 md:text-[10px] xl:text-[11px] uppercase tracking-widest"
                                                    >
                                                        {field.label}{" "}
                                                        {field.required && (
                                                            <span className="text-gold">*</span>
                                                        )}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        required={field.required}
                                                        value={form[field.id as keyof ContactForm]}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                [field.id as keyof ContactForm]: e.target.value,
                                                            })
                                                        }
                                                        className="bg-midnight/50 px-4 py-3 border border-steel/30 focus:border-gold/60 focus:outline-none w-full text-[11px] text-ivory placeholder:text-fog/30 md:text-xs xl:text-sm transition-colors"
                                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="service"
                                                className="block mb-2 font-mono text-[10px] text-foreground/50 uppercase tracking-widest"
                                            >
                                                Service Required <span className="text-gold">*</span>
                                            </label>
                                            <select
                                                id="service"
                                                required
                                                value={form.service}
                                                onChange={(e) =>
                                                    setForm({ ...form, service: e.target.value })
                                                }
                                                className="bg-midnight/50 px-4 py-3 border border-steel/30 focus:border-gold/60 focus:outline-none w-full text-[11px] text-ivory md:text-xs xl:text-sm transition-colors"
                                            >
                                                <option value="" className="bg-midnight text-fog/50">
                                                    Select a service...
                                                </option>
                                                <option value="freight" className="bg-midnight">
                                                    Freight Transportation
                                                </option>
                                                <option value="terminal" className="bg-midnight">
                                                    Terminal Services
                                                </option>
                                                <option value="warehousing" className="bg-midnight">
                                                    Warehousing & Storage
                                                </option>
                                                <option value="logistics" className="bg-midnight">
                                                    Logistics Coordination
                                                </option>
                                                <option value="crossborder" className="bg-midnight">
                                                    Cross-Border Shipping
                                                </option>
                                                <option value="supplychain" className="bg-midnight">
                                                    Supply Chain Solutions
                                                </option>
                                                <option value="cargo" className="bg-midnight">
                                                    Cargo Handling
                                                </option>
                                                <option value="tank" className="bg-midnight">
                                                    Tank Farm Operations
                                                </option>
                                                <option value="other" className="bg-midnight">
                                                    General Inquiry
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block mb-2 font-mono text-[10px] text-foreground/50 uppercase tracking-widest"
                                            >
                                                Message <span className="text-gold">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={(e) =>
                                                    setForm({ ...form, message: e.target.value })
                                                }
                                                className="bg-midnight/50 px-4 py-3 border border-steel/30 focus:border-gold/60 focus:outline-none w-full text-[11px] text-ivory placeholder:text-fog/30 md:text-xs xl:text-sm transition-colors resize-none"
                                                placeholder="Describe your freight or logistics requirements..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="group flex justify-between items-center bg-gold hover:bg-gold/90 hover:shadow-gold px-6 py-4 w-full font-semibold text-[11px] text-ocean md:text-xs xl:text-sm tracking-wide transition-all duration-200 cursor-pointer"
                                        >
                                            <span>Submit Inquiry</span>
                                            <ArrowRight3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
