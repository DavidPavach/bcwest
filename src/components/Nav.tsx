import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
// Icons
import { ArrowDown3, CloseSquare, Element3, Mobile } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const navLinks = [
	{ label: "About", href: "/about" },
	{
		label: "Services",
		href: "/services",
		children: [
			{
				label: "Freight Transportation",
				href: "/service/freight",
			},
			{ label: "Terminal Services", href: "/service/terminal" },
			{ label: "Warehousing & Storage", href: "/service/warehousing" },
			{
				label: "Logistics Coordination",
				href: "/service/logistics",
			},
			{
				label: "Cross-Border Shipping",
				href: "/service/cross",
			},
			{
				label: "Supply Chain Solutions",
				href: "/service/supply",
			},
			{ label: "Cargo Handling", href: "/service/cargo" },
			{ label: "Tank Farm Operations", href: "/service/tank" },
		],
	},
	{ label: "Industries", href: "/industries" },
	{ label: "Network", href: "/network" },
	{ label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState<boolean>(false);
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [showQuote, setShowQuote] = useState<boolean>(false);

	const location = useLocation();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		setMobileOpen(false);
		setActiveDropdown(null);
	}, [location]);

	// Functions and Constants
	const isActive = (href: string) =>
		location.pathname === href || location.pathname.startsWith(href + "/");

	const toggleQuote = () => setShowQuote((prev) => !prev);

	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className={`fixed top-0 left-0 right-0 z-10 transition-all duration-500 ${scrolled
					? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-ocean"
					: "bg-transparent"
					}`}
			>
				<div className="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
					<div className="flex justify-between items-center h-18 lg:h-20">
						{/* Logo */}
						<Link to="/" className="group flex items-center gap-x-3">
							<div className="flex flex-col leading-none">
								<div className="flex items-center gap-x-1">
									<img
										src="/logo.png"
										alt="logo"
										className="inline size-4 md:size-5 xl:size-6"
									/>
									<span
										className={`font-display font-black ${scrolled ? "text-foreground" : "text-ivory"} text-base md:text-lg xl:text-xl uppercase tracking-tight`}
									>
										BCWEST
									</span>
								</div>

								<span className="font-mono text-[10px] text-gold uppercase tracking-wider">
									Terminal Freight Services
								</span>
							</div>
							<div className="hidden sm:block bg-gold/40 mx-1 w-px h-9" />
							<span className="hidden sm:block font-mono text-[9px] text-fog/60 leading-tight tracking-wider">
								INC.
								<br />
								Est. 1997
							</span>
						</Link>

						{/* Desktop Nav */}
						<nav className="hidden lg:flex items-center gap-1">
							{navLinks.map((link) => (
								<button
									type="button"
									key={link.label}
									className="relative"
									onMouseEnter={() =>
										link.children && setActiveDropdown(link.label)
									}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<Link
										to={link.href}
										className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 ${isActive(link.href)
											? "text-gold"
											: `hover:text-gold ${scrolled ? "text-foreground" : "text-ivory"}`
											}`}
									>
										{link.label}
										{link.children && (
											<ArrowDown3
												className={`size-3.5 xl:size-4 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
											/>
										)}
									</Link>
									{isActive(link.href) && (
										<div className="right-4 bottom-0 left-4 absolute bg-gold h-px" />
									)}

									{/* Dropdown */}
									<AnimatePresence>
										{link.children && activeDropdown === link.label && (
											<motion.div
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 8 }}
												transition={{ duration: 0.18 }}
												className="top-full left-0 absolute bg-midnight shadow-card-dark mt-1 border border-border/60 w-64"
											>
												<div className="py-2">
													{link.children.map((child) => (
														<Link
															key={child.label}
															to={child.href}
															className={`flex items-center px-5 py-2.5 text-xs xl:text-sm transition-colors duration-150 border-l-2 ${isActive(child.href)
																? "border-gold text-gold bg-gold/5"
																: "border-transparent text-fog/70 hover:text-ivory hover:border-gold/50 hover:bg-border/30"
																}`}
														>
															{child.label}
														</Link>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</button>
							))}
						</nav>

						{/* Desktop CTA */}
						<div className="hidden lg:flex items-center gap-4">
							<a
								href="tel:2049585300"
								className="flex items-center gap-2 font-mono text-fog/70 hover:text-gold text-xs xl:text-sm transition-colors"
							>
								<Mobile className="size-3 md:size-3.5 xl:size-4" />
								204-958-5300
							</a>
							<button
								type="button"
								onClick={toggleQuote}
								className="bg-gold hover:bg-gold/90 hover:shadow-gold px-5 py-2.5 font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
							>
								Request Quote
							</button>
						</div>

						{/* Mobile menu toggle */}
						<button
							type="button"
							onClick={() => setMobileOpen(!mobileOpen)}
							className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-ivory"} transition-colors`}
							aria-label="Toggle navigation"
						>
							{mobileOpen ? (
								<CloseSquare className="size-5 text-gold cursor-pointer" />
							) : (
								<Element3 className="size-5 cursor-pointer" />
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ type: "tween", duration: 0.3 }}
						className="lg:hidden z-9 fixed inset-0 bg-background"
					>
						<div className="flex flex-col px-6 pt-20 pb-10 h-full overflow-y-auto">
							<div className="flex-1 space-y-1 py-8">
								{navLinks.map((link) => (
									<div key={link.label}>
										<Link
											to={link.href}
											className={`block py-4 font-heading text-xl md:text-2xl font-bold uppercase tracking-wide border-b border-border/30 transition-colors ${isActive(link.href)
												? "text-gold"
												: "hover:text-gold"
												}`}
										>
											{link.label}
										</Link>
										{link.children && (
											<div className="space-y-1 mt-2 mb-4 pl-4">
												{link.children.map((child) => (
													<Link
														key={child.label}
														to={child.href}
														className="block py-2 text-foreground/70 hover:text-gold text-sm transition-colors"
													>
														— {child.label}
													</Link>
												))}
											</div>
										)}
									</div>
								))}
							</div>
							<div className="space-y-4">
								<a
									href="tel:2049585300"
									className="flex items-center gap-2 font-mono text-foreground/70 text-xs md:text-sm"
								>
									<Mobile className="size-4" /> 204-958-5300
								</a>
								<button
									onClick={toggleQuote}
									type="button"
									className="block bg-gold py-4 w-full font-heading font-bold text-base md:text-lg text-center uppercase tracking-wider cursor-pointer"
								>
									Request a Quote
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
