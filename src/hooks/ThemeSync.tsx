import { useEffect } from "react";

// Store and Utils
import { useThemeStore } from "@/stores/theme.store";
import { applyTheme, getPreferredTheme, saveTheme } from "@/utils/theme";

export function ThemeSync() {
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

	useEffect(() => {
		const preferred = getPreferredTheme();
		setTheme(preferred);
	}, [setTheme]);

	useEffect(() => {
		if (!theme) return;
		applyTheme(theme);
		saveTheme(theme);
	}, [theme]);

	return null;
}
