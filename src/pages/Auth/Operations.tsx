import { useNavigate } from "@tanstack/react-router";
import { Lock, LoginCurve, Sms } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

import FormField, { InputBase } from "#/components/FormField";
import { cn } from "#/lib/utils";
import { cookie, setCookie } from "#/utils/cookie";

const Index = () => {
	const [showPw, setShowPw] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
	});

	const navigate = useNavigate();

	const update = (field: string, value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = () => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			const email = formData.identifier.trim().toLowerCase();
			const password = formData.password.trim();

			setTimeout(() => {
				if (email === "super@admin.com" && password === "super123456") {
					toast.success("Login successful! Redirecting to dashboard...");

					// Save login cookie for 1 day
					setCookie("coretuim", cookie, 1);

					// Navigate to dashboard
					return navigate({ to: "/dashboard" });
				}
				setIsSubmitting(false);
				toast.error("Invalid email or password");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<main className="mt-10">
			<section className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="flex items-center gap-3 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 md:px-8 py-5 border-border border-b">
					<p className="font-semibold text-foreground text-sm md:text-base xl:text-lg">
						Operations Authentication
					</p>
				</div>

				<form
					className="gap-5 grid grid-cols-1 px-6 md:px-8 py-7"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<FormField label="Email Address or Username" required>
						<InputBase
							icon={
								<Sms
									variant="Bold"
									className={`size-4.5 ${formData.identifier.trim() ? "text-primary" : ""
										}`}
								/>
							}
							type="email"
							placeholder="your.email@example.com"
							value={formData.identifier}
							onChange={(e) => update("identifier", e.target.value)}
						/>
					</FormField>

					<FormField label="Password" required>
						<div className="relative">
							<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
								<Lock
									variant="Bold"
									className={`size-4.5 ${formData.password.trim() ? "text-primary" : ""
										}`}
								/>
							</span>

							<input
								autoComplete="current-password"
								type={showPw ? "text" : "password"}
								placeholder="Enter password"
								value={formData.password}
								onChange={(e) => update("password", e.target.value)}
								className={cn(
									"bg-muted/40 py-2.5 md:py-3 pr-12 pl-10 border border-border rounded-xl focus:outline-none focus:ring-0",
									"focus:border-accent w-full placeholder:text-muted-foreground text-xs md:text-sm transition-all",
									"py-2.5 md:py-3 pr-4 placeholder:text-[11px] placeholder:md:text-xs placeholder:xl:text-xs",
								)}
							/>

							<button
								type="button"
								onClick={() => setShowPw((v) => !v)}
								className="top-1/2 right-3 absolute text-[10px] text-muted-foreground md:text-[11px] hover:text-foreground xl:text-xs transition-colors -translate-y-1/2 cursor-pointer"
							>
								{showPw ? "Hide" : "Show"}
							</button>
						</div>
					</FormField>

					<button
						type="submit"
						disabled={isSubmitting}
						className="flex justify-center items-center gap-2 bg-primary disabled:bg-muted hover:opacity-80 shadow-lg shadow-primary/20 px-6 md:px-7 py-3 rounded-xl w-full font-semibold text-primary-foreground disabled:text-muted-foreground transition-all cursor-pointer disabled:cursor-not-allowed"
					>
						Access Dashboard
						{isSubmitting ? (
							<Loader className="inline ml-0.5 size-4 animate-spin" />
						) : (
							<LoginCurve className="inline ml-0.5 size-5" />
						)}
					</button>
				</form>
			</section>
		</main>
	);
};
export default Index;
