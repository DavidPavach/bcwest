import { Link } from "@tanstack/react-router";
import { ArrowUp3, Location, Mobile, Sms, Whatsapp } from "iconsax-reactjs";

import { ThemeToggle } from "./ThemeToggle";

const serviceLinks = [
	{ label: "Freight Transportation", href: "/service/freight" },
	{ label: "Terminal Services", href: "/service/terminal" },
	{ label: "Warehousing & Storage", href: "/service/warehousing" },
	{ label: "Logistics Coordination", href: "/service/logistics" },
	{ label: "Cross-Border Shipping", href: "/service/cross" },
	{
		label: "Supply Chain Solutions",
		href: "/service/supply",
	},
	{ label: "Tank Farm Operations", href: "/service/tank" },
];

const companyLinks = [
	{ label: "About BCWEST", href: "/about" },
	{ label: "Industries", href: "/industries" },
	{ label: "Network Coverage", href: "/network" },
	{ label: "Careers", href: "/careers" },
	{ label: "Contact Us", href: "/contact" },
];

export default function Footer() {

	const year = new Date().getFullYear();

	return (
		<footer className="border-border/40 border-t">
			{/* Main Footer */}
			<div className="mx-auto px-6 lg:px-8 xl:px-10 pt-20 pb-10 max-w-screen-2xl">
				<div className="gap-12 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Column */}
					<div className="lg:col-span-1">
						<div className="mb-6">
							<div className="flex items-center gap-x-1">
								<img
									src="/logo.png"
									alt="logo"
									className="inline size-5 md:size-6 xl:size-7"
								/>
								<p className="font-display font-black text-xl md:text-2xl xl:text-3xl uppercase tracking-tight">
									BCWEST
								</p>
							</div>

							<div className="mt-0.5 font-mono text-[10px] text-gold uppercase tracking-wider">
								Terminal Freight Services Inc.
							</div>
						</div>
						<p className="mb-6 text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
							Western Canada's trusted freight terminal and logistics partner.
							Operating since 1997, delivering operational excellence across
							regional and cross-border corridors.
						</p>
						<div className="space-y-2">
							<div className="flex items-start gap-3">
								<Location className="mt-0.5 size-3 md:size-3.5 xl:size-4 text-gold shrink-0" />
								<span className="font-mono text-[10px] text-foreground/60 md:text-[11px] xl:text-xs leading-relaxed">
									201 Portage Avenue
									<br />
									Winnipeg, Manitoba R3B 3K6
									<br />
									Canada
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Mobile className="size-3 md:size-3.5 xl:size-4 text-gold shrink-0" />
								<a
									href="tel:2049585300"
									className="font-mono text-[10px] text-foreground/60 md:text-[11px] hover:text-gold xl:text-xs transition-colors"
								>
									+1 (581) 662-9646
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Sms className="size-3 md:size-3.5 xl:size-4 text-gold shrink-0" />
								<a
									href="mailto:info@bcwestterminal.ca"
									className="font-mono text-[10px] text-foreground/60 md:text-[11px] hover:text-gold xl:text-xs transition-colors"
								>
									info@bcwestterminal.ca
								</a>
							</div>
							<div className="flex items-center gap-x-5 mt-4">
								<ThemeToggle />
								<div className="flex items-center gap-x-2 text-muted-foreground">
									<a href="https://wa.me/message/YSCNI74HRUYAN1" target="_blank" rel="noopener noreferrer">
										<Whatsapp className="size-4 md:size-4.5 xl:size-5 text-[#25D366]" variant="Bold" />
									</a>
									<p className="text-[10px] md:text-[11px] xl:text-xs">+1 (587) 882-9321</p>
								</div>
							</div>
						</div>
					</div>

					{/* Services Column */}
					<div>
						<div className="mb-5 section-label">Services</div>
						<ul className="space-y-2.5">
							{serviceLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.href}
										className="group flex items-center gap-2 text-[11px] text-foreground/60 hover:text-gold md:text-xs xl:text-sm transition-colors"
									>
										<span className="bg-gold/30 group-hover:bg-gold w-px h-3 transition-colors" />
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Column */}
					<div>
						<div className="mb-5 section-label">Company</div>
						<ul className="space-y-2.5">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.href}
										className="group flex items-center gap-2 text-[11px] text-foreground/60 hover:text-gold md:text-xs xl:text-sm transition-colors"
									>
										<span className="bg-gold/30 group-hover:bg-gold w-px h-3 transition-colors" />
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* CTA Column */}
					<div>
						<div className="mb-5 section-label">Get Started</div>
						<p className="mb-6 text-[11px] text-foreground/60 md:text-xs xl:text-sm leading-relaxed">
							Ready to move your freight? Our operations team is available to
							discuss your transportation and logistics requirements.
						</p>
						<Link
							to="/verification" search={{ verify: undefined, number: undefined }}
							className="group inline-flex justify-center items-center gap-2 bg-gold hover:bg-gold/90 px-5 py-3 w-full font-semibold text-[11px] md:text-xs xl:text-sm tracking-wide transition-all duration-200 cursor-pointer"
						>
							Request a Quote
							<ArrowUp3 className="size-3 md:size-3.5 xl:size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						</Link>
						<div className="mt-6 pt-6 border-border/30 border-t">
							<div className="mb-3 section-label">Corporation No.</div>
							<div className="font-mono text-[10px] text-foreground/40 md:text-[11px] xl:text-xs">
								341779-4 (CBCA)
							</div>
							<div className="mt-1 font-mono text-[10px] text-foreground/40 md:text-[11px] xl:text-xs">
								BN: 873609150RC0001
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-border/40 border-t">
				<div className="mx-auto px-6 lg:px-10 py-5 max-w-screen-2xl">
					<div className="flex md:flex-row flex-col justify-between items-center gap-4">
						<div className="flex flex-wrap items-center gap-4">
							<span className="font-mono text-[10px] text-foreground/40 md:text-[11px] xl:text-xs">
								© {year} BCWEST Terminal Freight Services Inc. All rights
								reserved.
							</span>
						</div>
						<div className="flex items-center gap-x-2 font-mono text-[10px] text-foreground/30 md:text-[11px] xl:text-xs">
							<Link to="/privacy">Privacy Policy</Link>
							<Link to="/terms">Terms & Conditions</Link>
							<span className="inline-block bg-teal rounded-full w-1.5 h-1.5 animate-pulse" />
							Active — Est. 1997
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
