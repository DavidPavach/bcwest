import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect } from "react";

type OverlayProps = {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	variant?: "center" | "bottom" | "fullscreen";
	showBackdrop?: boolean;
	closeOnOutsideClick?: boolean;
	classNames?: string;
};

// Variants
const getVariantClass = (variant: OverlayProps["variant"]) => {
	switch (variant) {
		case "bottom":
			return "absolute bottom-0 flex flex-col max-h-[90vh]";
		case "fullscreen":
			return "absolute inset-0 flex flex-col";
		default:
			return "relative flex flex-col max-h-[calc(100vh-4rem)]";
	}
};

const getInitial = (variant: OverlayProps["variant"]) => {
	switch (variant) {
		case "bottom":
			return { y: "100%", opacity: 0 };
		case "fullscreen":
			return { opacity: 0 };
		default:
			return { scale: 0.95, opacity: 0 };
	}
};

const getAnimate = () => ({
	y: 0,
	scale: 1,
	opacity: 1,
});

const getExit = (variant: OverlayProps["variant"]) => {
	switch (variant) {
		case "bottom":
			return { y: "100%", opacity: 0 };
		case "fullscreen":
			return { opacity: 0 };
		default:
			return { scale: 0.95, opacity: 0 };
	}
};

export const Overlay = ({
	open,
	onClose,
	children,
	variant = "center",
	showBackdrop = true,
	closeOnOutsideClick = true,
	classNames = "",
}: OverlayProps) => {
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (open) {
			window.addEventListener("keydown", handleKey);
			document.body.style.overflow = "hidden";
		}

		return () => {
			window.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "unset";
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="z-30 fixed inset-0 flex justify-center items-center p-2">
					{/* Backdrop */}
					{showBackdrop && (
						<motion.div
							className="absolute inset-0 bg-background/60 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closeOnOutsideClick ? onClose : undefined}
						/>
					)}

					{/* Content Wrapper */}
					<motion.div
						initial={getInitial(variant)}
						animate={getAnimate()}
						exit={getExit(variant)}
						transition={{ duration: 0.2 }}
						className={getVariantClass(variant)}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`overflow-y-auto hide-scrollbar ${classNames}`}
						>
							{children}
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};
