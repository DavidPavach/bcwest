import { useEffect, useRef, useState } from "react";

type CounterProps = {
	end: string;
	duration: number;
	suffix?: string;
	prefix?: string;
};
export default function AnimatedCounter({
	end,
	duration = 2000,
	suffix = "",
	prefix = "",
}: CounterProps) {
	const [count, setCount] = useState<number>(0);
	const [started, setStarted] = useState<boolean>(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started) setStarted(true);
			},
			{ threshold: 0.5 },
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [started]);

	useEffect(() => {
		if (!started) return;
		const startTime = performance.now();
		const numericEnd = parseFloat(end);

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Ease out cubic
			const eased = 1 - (1 - progress) ** 3;
			const current = Math.round(eased * numericEnd * 10) / 10;
			setCount(current);
			if (progress < 1) requestAnimationFrame(animate);
		};

		requestAnimationFrame(animate);
	}, [started, end, duration]);

	const display = Number.isInteger(parseFloat(end))
		? Math.floor(count)
		: count.toFixed(1);

	return (
		<span ref={ref}>
			{prefix}
			{display}
			{suffix}
		</span>
	);
}
