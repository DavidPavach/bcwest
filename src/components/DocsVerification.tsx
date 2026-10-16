import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen } from "iconsax-reactjs";
import { useCallback, useEffect, useState } from "react";

import Document from "./Document";
import { Button } from "./ui/button";

const VERIFICATION_STEPS = [
	{ label: "Reference lookup", delay: 680 },
	{ label: "Integrity assessment", delay: 680 },
	{ label: "Issuance authorization", delay: 680 },
	{ label: "Current status review", delay: 680 },
];

const wait = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

function MetaRow({
	label,
	value,
	accent = false,
}: {
	label: string;
	value: string;
	accent?: boolean;
}) {
	return (
		<div className="mb-2 flex justify-between gap-3 font-mono text-[9px] md:text-[10px] xl:text-[11px]">
			<span className="text-[#596b75]">{label}</span>
			<span
				className={`break-all text-right ${accent ? "text-[#267b63]" : "text-[#74818a]"}`}
			>
				{value}
			</span>
		</div>
	);
}

function ScanCorners() {
	return (
		<>
			<span className="absolute left-3 top-3 size-4 border-l-2 border-t-2 border-[#c6b38e]" />
			<span className="absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-[#c6b38e]" />
		</>
	);
}

const DocsVerification = ({ doc }: { doc: Documents }) => {
	const [stage, setStage] = useState<
		"idle" | "scanning" | "verifying" | "verified"
	>("idle");
	const [activeStep, setActiveStep] = useState(-1);
	const [completedSteps, setCompletedSteps] = useState(0);
	const [issuedDate, setIssuedDate] = useState("--");
	const [clock, setClock] = useState("--:--:--");
	const [view, setView] = useState(false);

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
		setActiveStep(-1);
		setCompletedSteps(0);
		setIssuedDate("--");

		for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
			setActiveStep(i);
			await wait(VERIFICATION_STEPS[i].delay);
			setCompletedSteps(i + 1);
			await wait(160);
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
		const timer = setTimeout(() => {
			void runFlow();
		}, 500);

		return () => clearTimeout(timer);
	}, [runFlow]);

	const isVerified = stage === "verified";
	const isScanning = stage === "scanning";
	const isProcessing = isScanning || stage === "verifying";

	const statusTitle = isVerified
		? "RECORD VERIFIED"
		: stage === "verifying"
			? "FINAL REVIEW"
			: isScanning
				? "AUTHENTICATING RECORD"
				: "READY FOR VERIFICATION";

	const statusSub = isVerified
		? "Document number matches the issuing record"
		: stage === "verifying"
			? "Completing the registry assessment…"
			: isScanning
				? "Checking the document against registry records…"
				: "The authentication sequence will begin shortly.";

	const scanText =
		stage === "verifying"
			? "FINALIZING ASSESSMENT"
			: activeStep >= 0
				? VERIFICATION_STEPS[activeStep].label.toUpperCase()
				: "INITIALIZING LOOKUP";

	const stageStatus = isVerified
		? "Assessment complete"
		: isProcessing
			? "Processing request"
			: "Awaiting reference";

	const toggleView = () => setView((prev) => !prev);

	return (
		<>
			{view ? (
				<Document doc={doc} />
			) : (
				<div className="relative flex items-center justify-center overflow-hidden px-5 py-12 min-w-96">
					<div className="relative z-5 w-full">
						{/* Registry header */}
						<div className="mb-3.5 flex items-center justify-between px-0.5">
							<span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wide text-[#74818a]">
								<span
									className="size-1.5 rounded-full bg-[#267b63]"
									style={{ boxShadow: "0 0 8px rgba(38, 123, 99, 0.45)" }}
								/>
								Secure verification
							</span>
							<span className="font-mono text-[10.5px] tracking-wide text-[#74818a]">
								{clock}
							</span>
						</div>

						{/* Verification workspace */}
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							className="flex min-h-107.5 flex-col overflow-hidden border border-[#e2e6e6] bg-white p-4 shadow-[0_12px_35px_rgba(20,43,52,0.025)] md:p-6 xl:p-8"
						>
							<div className="mb-5 text-center">
								<h3
									className={`font-display text-base font-bold tracking-wide transition-colors duration-300 ${isVerified ? "text-[#267b63]" : "text-[#122c3a]"}`}
								>
									{statusTitle}
								</h3>
								<p className="mt-1.5 min-h-4 font-mono text-[10px] leading-relaxed tracking-wide text-[#7d8c93] md:text-[10.5px]">
									{statusSub}
								</p>
							</div>

							{/* Initial state */}
							{!isProcessing && !isVerified && (
								<div className="flex min-h-56.25 flex-col items-center justify-center text-center">
									<div className="relative mb-5 h-17.5 w-14.5 border border-[#d4dfe0]">
										<span className="absolute right-0 top-0 border-l-16 border-t-16 border-l-transparent border-t-[#e9eeee]" />
										<span className="absolute left-4.25 top-6.25 text-lg text-[#9db0b7]">
											✓
										</span>
									</div>
									<h4 className="mb-2 text-[15px] font-semibold text-[#526773]">
										Ready for verification
									</h4>
									<p className="max-w-75 text-xs leading-relaxed text-[#97a2a7]">
										The document reference is ready for the authentication
										sequence.
									</p>
								</div>
							)}

							{/* Scanning animation adapted from the HTML prototype */}
							{isProcessing && (
								<div className="mb-6">
									<div
										className="relative mb-5.75 flex h-25 items-center justify-center overflow-hidden border border-[#edf0ef]"
										style={{
											backgroundImage:
												"linear-gradient(90deg, #f7f9f8 1px, transparent 1px), linear-gradient(#f7f9f8 1px, transparent 1px)",
											backgroundSize: "21px 21px",
										}}
									>
										<ScanCorners />
										<motion.div
											aria-hidden="true"
											initial={{ left: "-5%" }}
											animate={{ left: ["-5%", "105%"] }}
											transition={{
												duration: 1.7,
												ease: "easeInOut",
												repeat: Infinity,
												repeatType: "reverse",
											}}
											className="absolute bottom-0 top-0 w-0.5 bg-[#b9a47c]"
											style={{
												boxShadow: "0 0 19px 6px rgba(200, 180, 134, 0.2)",
											}}
										/>
										<span className="relative z-1 bg-white/85 px-3.75 py-2 font-mono text-xs tracking-[0.17em] text-[#6b7e84]">
											{scanText}
										</span>
									</div>

									<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
										{VERIFICATION_STEPS.map((step, i) => {
											const done = i < completedSteps;
											const active = i === activeStep && !done;
											const progress = done
												? "COMPLETE"
												: active
													? "CHECKING"
													: "PENDING";

											return (
												<div
													key={step.label}
													className={`min-h-17.5 border-t-2 pt-3 transition-colors duration-200 ${
														done
															? "border-[#287d63]"
															: active
																? "border-[#b9a47c]"
																: "border-[#e4e9e9]"
													}`}
												>
													<div className="mb-2 text-[10px] tracking-[0.14em] text-[#9aa7ad]">
														{`0${i + 1} / ${progress}`}
													</div>
													<div
														className={`text-[11px] leading-relaxed ${
															done
																? "font-medium text-[#287d63]"
																: active
																	? "font-bold text-[#263f4d]"
																	: "text-[#89979d]"
														}`}
													>
														{step.label}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}

							{isVerified && (
								<div className="flex min-h-56.25 flex-col items-center justify-center text-center">
									<div className="relative mb-5 h-17.5 w-14.5 border border-[#d4dfe0]">
										<span className="absolute right-0 top-0 border-l-16 border-t-16 border-l-transparent border-t-[#e9eeee]" />
										<span className="absolute left-4.25 top-6.25 text-lg text-green-500">
											✓
										</span>
									</div>
									<h4 className="mb-2 text-[15px] font-semibold text-[#526773]">
										Record verified
									</h4>
									<p className="max-w-75 text-xs leading-relaxed text-[#97a2a7]">
										Authenticated registry entry
									</p>
								</div>
							)}

							{/* Verified metadata and document-view action */}
							<AnimatePresence>
								{isVerified && (
									<motion.div
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.4, delay: 0.1 }}
										className="mt-auto"
									>
										<div className="border-t border-[#e7eaea] pt-3.5">
											<MetaRow
												label="Number of Documents"
												value={`${doc.images.length}`}
											/>
											<MetaRow
												label="Verification ID"
												value={verificationId}
												accent
											/>
											<MetaRow label="View Date" value={issuedDate} />
										</div>

										<motion.div
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4, delay: 0.2 }}
											className="mt-4 flex gap-2"
										>
											<Button
												onClick={toggleView}
												className="w-full text-[10px] md:text-[11px] xl:text-xs"
											>
												<FolderOpen className="size-3 md:size-3.5 xl:size-4" />
												View Documents
											</Button>
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>

						<div className="mt-3 flex justify-between gap-3 px-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#a1aaad]">
							<span>Document registry</span>
							<span>{stageStatus}</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DocsVerification;
