import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
    Box,
    Building,
    CloseCircle,
    DocumentText,
    Element3,
    Element4,
    Gallery,
    Home3,
    type Icon,
    Logout,
    Notepad2,
    Receipt21,
    ReceiptItem,
    ReceiptText,
    UserSquare,
    UserTag,
} from "iconsax-reactjs";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";

type NavLink = { href: string; icon: Icon; label: string; subText?: string };
export type NavSection = {
    id: string;
    title: string;
    icon: Icon;
    links: NavLink[];
};

const NAV_SECTIONS: NavSection[] = [
    {
        id: "overview",
        title: "Overview",
        icon: Element4,
        links: [
            { href: "/dashboard", icon: Home3, label: "Dashboard" },
            { href: "/products", icon: Box, label: "Products" },
            { href: "/terminals", icon: Building, label: "Terminals" },
            { href: "/vault", icon: Gallery, label: "Vault" },
        ],
    },
    {
        id: "quotes",
        title: "Quotes",
        icon: ReceiptText,
        links: [
            { href: "/quotes", icon: Receipt21, label: "Quotes" },
            { href: "/tsr", icon: ReceiptItem, label: "TSR" },
            { href: "/documents", icon: DocumentText, label: "Document" },
            { href: "/invoice", icon: Notepad2, label: "Invoice" },
        ],
    },
    {
        id: "contacts",
        title: "Contacts",
        icon: UserSquare,
        links: [{ href: "/contacts", icon: UserTag, label: "Contacts" }],
    },
];

export const SideNav = () => {
    const [open, setOpen] = useState(false);

    const SidebarContent = () => (
        <>
            <div className="hidden lg:block mt-3 px-4 py-3 font-heading font-black text-accent text-2xl">
                BCWest
            </div>

            <div className="flex flex-col flex-1 gap-y-5 mt-5 p-4 overflow-y-auto">
                {NAV_SECTIONS.map((section) => {
                    const SectionIcon = section.icon;

                    return (
                        <div key={section.id} className="flex flex-col gap-y-3">
                            <div className="flex items-center gap-x-2 font-semibold text-muted-foreground text-xs uppercase">
                                <SectionIcon className="size-4" variant="Bold" />
                                {section.title}
                            </div>

                            <div className="flex flex-col gap-y-2 p-1 text-xs">
                                {section.links.map((link) => {
                                    const LinkIcon = link.icon;

                                    return (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            onClick={() => setOpen(false)}
                                            activeProps={{
                                                className: "bg-accent/70 font-semibold",
                                            }}
                                        >
                                            <motion.button className="flex items-center gap-x-2 hover:bg-accent/30 px-4 py-2.5 w-full transition-all duration-300 cursor-pointer">
                                                <LinkIcon className="size-4" variant="Bold" />
                                                <p>{link.label}</p>
                                            </motion.button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-border border-t text-xs">
                <div className="flex items-center gap-x-2 mb-4 px-4 py-2.5">
                    <ThemeToggle />
                    <p>Theme</p>
                </div>
                <Link to="/logout">
                    <motion.button className="flex items-center gap-x-2 hover:bg-accent/30 px-4 py-2.5 w-full transition-all duration-300 cursor-pointer">
                        <Logout className="size-5" />
                        <p>Logout</p>
                    </motion.button>
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden top-0 left-0 z-20 fixed lg:flex flex-col border-border border-r w-[18rem] h-dvh">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden top-0 z-30 sticky flex justify-between items-center px-4 border-border border-b h-16 font-heading">
                <p className="font-black text-accent text-lg">BCWest</p>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <Element3 className="size-5" />
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden z-30 fixed inset-0 bg-black/50 backdrop-blur-md"
                            onClick={() => setOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 450 }}
                            className="lg:hidden top-0 left-0 z-40 fixed flex flex-col bg-background border-border border-r w-[18rem] h-dvh"
                        >
                            <div className="flex justify-between items-center p-4 border-border border-b">
                                <span className="font-semibold">Menu</span>
                                <button
                                    type="button"
                                    className="hover:text-destructive cursor-pointer"
                                    onClick={() => setOpen(false)}
                                >
                                    <CloseCircle className="size-5" />
                                </button>
                            </div>

                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
