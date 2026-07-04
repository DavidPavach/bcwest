import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ToastContainer } from "react-fox-toast";

import { ThemeSync } from "#/hooks/ThemeSync";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const APP_NAME =
	"BCWest Terminal | Bulk Liquid Storage, Freight & Tank Farm Logistics";
export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},

			// Primary SEO
			{
				title: APP_NAME,
			},
			{
				name: "description",
				content:
					"BCWest Terminal provides reliable bulk liquid storage, freight logistics, marine terminal operations, tank farm services, and integrated supply chain solutions across British Columbia.",
			},
			{
				name: "keywords",
				content:
					"BCWest Terminal, freight, logistics, tank farms, marine terminal, bulk liquid storage, petroleum storage, chemical storage, rail logistics, truck logistics, vessel logistics, supply chain, British Columbia",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			{
				name: "author",
				content: "BCWest Terminal",
			},
			{
				name: "theme-color",
				content: "#0F172A",
			},

			// Open Graph
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "BCWest Terminal",
			},
			{
				property: "og:title",
				content: APP_NAME,
			},
			{
				property: "og:description",
				content:
					"Bulk liquid storage, freight logistics, tank farms, and marine terminal solutions serving customers across British Columbia.",
			},
			{
				property: "og:url",
				content: "https://www.bcwestterminal.ca",
			},
			{
				property: "og:image",
				content: "https://www.bcwestterminal.ca/logo.png",
			},

			// Twitter
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: APP_NAME,
			},
			{
				name: "twitter:description",
				content:
					"Reliable freight, tank farm, marine terminal and bulk liquid storage solutions.",
			},
			{
				name: "twitter:image",
				content: "https://www.bcwestterminal.ca/logo.png",
			},
		],

		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: "https://www.bcwestterminal.ca",
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
			},
		],
	}),
	shellComponent: RootDocument,
});
function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				<script suppressHydrationWarning>{`(function() {
                            const saved = localStorage.getItem('theme');
                            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            const theme = saved || (systemDark ? 'dark' : 'light');
                            document.documentElement.classList.toggle(
                                'dark',
                                theme === 'dark'
                            );
                        })();`}</script>
			</head>
			<body suppressHydrationWarning>
				{children}
				<ToastContainer
					position="top-center"
					isPausedOnHover={true}
					duration={5000}
				/>
				<ThemeSync />
				<Scripts />
			</body>
		</html>
	);
}
