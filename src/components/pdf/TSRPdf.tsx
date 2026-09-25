import { QRCodeSVG } from "qrcode.react";

import {
	formatCurrency,
	formatOnlyDate,
	toCurrencyWords,
} from "#/utils/format";
import KeyValueBlock from "../KeyValueBlock";
import LineItems from "../LineItems";
import TankDetails from "../TankDetails";

const TSRPdf = ({ tsr }: { tsr: TSR }) => {
	const totalAmount = (tsr.lineItems || []).reduce(
		(s, item) => s + (Number(item.amount) || 0),
		0,
	);

	const url = `https://www.bcwestterminal.ca/verification?verify=tsr&value=${tsr.tsrNumber}`;

	return (
		<main className="bg-background p-8 border border-border">
			{/* Header */}
			<header className="flex justify-between items-start pb-3 border-border border-b-2">
				<div className="flex gap-x-2">
					<img
						src="/logo_light.png"
						alt="logo"
						className="dark:hidden size-11"
					/>
					<img
						src="/logo_dark.png"
						alt="logo"
						className="hidden dark:block size-10"
					/>

					<div>
						<div className="font-bold text-base tracking-wide">
							BCWEST TERMINAL FREIGHT SERVICES INC.
						</div>

						<div className="text-muted-foreground text-xs">
							Tank Storage & Logistics Services
						</div>
					</div>
				</div>

				<div className="text-[11px] text-muted-foreground text-right leading-relaxed">
					<div>2900 - 201 Portage Avenue</div>
					<div>Winnipeg MB R3B 3K6</div>
					<div>Tel: 204-958-5315</div>
					<div>Email: finance@bcwestterminals.ca</div>
					<div>Co. Reg. No.(Numéro de la société): 341779-4</div>
				</div>
			</header>

			{/* Title + Metadata */}
			<section className="flex justify-between items-end mt-4 mb-4">
				<h1 className="font-bold text-[22px] uppercase tracking-wide">
					Tank Storage Receipt
				</h1>

				<div className="text-muted-foreground text-xs text-right leading-relaxed">
					<div>
						<span className="font-semibold">Receipt No.:</span> {tsr.tsrNumber}
					</div>

					<div>
						<span className="font-semibold">Issue Date:</span>{" "}
						{formatOnlyDate(tsr.issuedDate)}
					</div>
					<div>
						<span className="font-semibold">Issue Time:</span> {tsr.issuedTime}{" "}
						UTC
					</div>
				</div>
			</section>

			{/* Depositor + Terminal Details */}
			<div className="gap-5 grid grid-cols-2 mb-3">
				<KeyValueBlock
					title="Depositor / Product Owner"
					data={tsr.depositor}
					nonResponsive
				/>

				<KeyValueBlock
					title="Terminal Details"
					data={tsr.terminalDetails}
					nonResponsive
				/>
			</div>

			{/* Product Info + Inventory Position */}
			<div className="gap-5 grid grid-cols-2 mb-3">
				<KeyValueBlock
					title="Product Information"
					data={tsr.productInfo}
					nonResponsive
				/>

				<KeyValueBlock
					title="Inventory Position"
					data={tsr.inventoryPosition}
					nonResponsive
				/>
			</div>

			{/* Storage Validity + Storage Summary */}
			<div className="gap-5 grid grid-cols-2 mb-4">
				<KeyValueBlock
					title="Storage Validity"
					data={tsr.storageValidity}
					nonResponsive
				/>

				<KeyValueBlock
					title="Receipt / Payment Details"
					data={tsr.storageSummary}
					nonResponsive
				/>
			</div>

			{/* Tank Details */}
			{tsr.tankDetails && tsr.tankDetails.length > 0 && (
				<div className="mb-4 pdf-keep-together">
					<TankDetails tanks={tsr.tankDetails} nonResponsive />
				</div>
			)}

			{/* Line Items / Charges */}
			<div className="mb-4 pdf-keep-together">
				<div className="mb-1.5 font-bold text-sm uppercase tracking-wide">
					Charges Summary
				</div>

				<LineItems
					items={tsr.lineItems || []}
					currency={tsr.currency}
					nonResponsive
				/>
			</div>

			{/* Total Row */}
			<div className="flex justify-end mb-4 pdf-keep-together">
				<div className="flex items-center border border-border">
					<div className="bg-muted/10 px-4 py-2 font-bold text-muted-foreground text-sm uppercase tracking-wide">
						Total Amount Paid ({tsr.currency})
					</div>

					<div className="px-4 py-2 font-bold text-[14px]">
						{formatCurrency(totalAmount)}
					</div>
				</div>
			</div>

			{/* Amount in Words + Paid Badge */}
			<section className="gap-3 grid grid-cols-2 mb-4 pdf-keep-together">
				<div className="border border-border">
					<div className="bg-green-100 dark:bg-green-900 px-3 py-1.5 font-bold text-green-600 dark:text-green-300 text-sm uppercase tracking-wide">
						Paid In Full
					</div>

					<div className="px-3 py-2 text-muted-foreground text-xs leading-relaxed">
						This is to confirm that we have received full payment for the above
						storage services as per invoice referenced above. Thank you for your
						business.
					</div>
				</div>

				<div className="border border-border">
					<div className="bg-muted px-3 py-1.5 font-bold text-sm uppercase tracking-wide">
						Amount in Words
					</div>

					<div className="px-3 py-2 font-medium text-muted-foreground text-xs capitalize">
						{toCurrencyWords(totalAmount)}
					</div>
				</div>
			</section>

			{/* Signature */}
			<section className="flex flex-col items-end mb-4 text-[11px] text-muted-foreground">
				<p>Authorized Signatories</p>

				<main className="flex items-center gap-x-5">
					<div className="max-w-full">
						<img
							src="/signature_original.png"
							alt="Signature"
							className="mt-2 mb-1 h-12"
						/>

						<div className="space-y-0.5 pt-1 border-border border-t">
							<p>
								<span className="font-semibold text-foreground">Name:</span>{" "}
								Bolanos Castro Silva Graciela
							</p>

							<p>
								<span className="font-semibold text-foreground">Title:</span>{" "}
								Group Executive Vice President - Global Operations.
							</p>
						</div>
					</div>

					<div className="text-right">
						{tsr.signatureUrl.trim() && (
							<img
								src={tsr.signatureUrl}
								alt="Signature"
								className="mt-2 mb-1 ml-auto h-12"
								style={{
									objectFit: "contain",
								}}
							/>
						)}

						<div className="space-y-0.5 pt-1 border-border border-t">
							<p>
								<span className="font-semibold text-foreground">Name:</span>{" "}
								{tsr.signatureName || ""}
							</p>

							<p>
								<span className="font-semibold text-foreground">Title:</span>{" "}
								{tsr.signatureTitle || ""}
							</p>
						</div>
					</div>
				</main>
			</section>

			{/* Verification + System Info */}
			<section className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4 mb-3 pt-3 border-border border-t">
				<div className="min-w-0">
					<header className="mb-2 font-bold text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
						Verification
					</header>

					<div className="flex items-start gap-x-3">
						<div className="shrink-0">
							<QRCodeSVG
								id="invite-qr-svg"
								value={url}
								size={148}
								bgColor="#ffffff"
								fgColor="#1e1b4b"
								level="H"
								marginSize={1}
							/>
						</div>

						<div className="min-w-0 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] leading-relaxed">
							<div className="mb-1">
								Scan the QR code or visit the link below to verify this receipt.
							</div>

							<div className="font-semibold text-blue-600 dark:text-blue-400 break-all">
								{url}
							</div>

							<div className="mt-1">Receipt No.: {tsr.tsrNumber}</div>
						</div>
					</div>
				</div>

				<div className="min-w-0">
					<header className="mb-2 font-bold text-[10px] md:text-[11px] xl:text-xs uppercase tracking-wide">
						System Information
					</header>

					<div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] leading-relaxed">
						<span className="font-semibold text-foreground">Generated By:</span>
						<span className="wrap-break-word">
							BCWEST TERMINAL FREIGHT SERVICES INC.
						</span>

						<span className="font-semibold text-foreground">
							Generation Time:
						</span>
						<span>
							{formatOnlyDate(tsr.issuedDate)} {tsr.issuedTime} UTC
						</span>

						<span className="font-semibold text-foreground">
							Document Type:
						</span>
						<span>TSR</span>

						<span className="font-semibold text-foreground">
							System Reference:
						</span>
						<span className="break-all">{tsr.tsrNumber}</span>
					</div>
				</div>
			</section>

			{/* Declaration */}
			<section className="mb-3 pt-3 border-border border-t text-xs">
				<header className="mb-1 font-bold uppercase tracking-wide">
					Storage Declaration
				</header>

				<p className="my-2">
					This Tank Storage Receipt (TSR) certifies that the above-described
					product has been recorded under the contracted storage allocation of
					BCWEST Terminal Freight Services Inc. at the designated terminal and
					is maintained in accordance with the applicable storage arrangements.
				</p>

				<p>
					The quantity stated herein reflects the recorded storage inventory as
					of the date and time of issuance of this receipt. All cargo handling,
					transfer, release, and other operational activities shall be subject
					to authorized instructions, terminal scheduling, applicable
					contractual obligations, regulatory requirements, and the terms of the
					applicable Storage Agreement.
				</p>
			</section>

			{/* Remarks */}
			<section className="mb-3 pt-3 border-border border-t text-xs">
				<header className="mb-1 font-bold uppercase tracking-wide">
					Remarks
				</header>

				<ul className="pl-8 list-disc">
					<li>
						This Tank Storage Receipt is issued for inventory, storage and
						operational reference purposes and is subject to the applicable
						Storage Agreement and terminal operational procedures.
					</li>

					<li>
						Product release, transfer or cargo nomination shall be subject to
						authorized instructions, terminal scheduling and operational
						availability.
					</li>

					<li>
						The QR code provided on this receipt is intended for document
						verification. If this receipt cannot be successfully verified, the
						holder should contact BCWEST Terminal Freight Services Inc. before
						relying upon or acting on its contents.
					</li>

					<li>
						BCWEST Terminal Freight Services Inc. shall not be responsible for
						any loss, damage, claim, or liability arising from the unauthorized
						alteration, misuse, duplication, or reliance upon an unverified or
						fraudulent copy of this Tank Storage Receipt.
					</li>
				</ul>
			</section>

			{/* Disclaimer */}
			<div className="pt-2 border-border border-t text-[10px] text-muted-foreground text-center leading-relaxed">
				This is a computer-generated document. Electronic signatures are applied
				and are valid. Thank you for your payment, for any enquiries please
				contact our billing department
			</div>
		</main>
	);
};

export default TSRPdf;
