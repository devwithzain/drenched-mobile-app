/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#0891b2",
				primaryDark: "#0e7490",
				primaryLight: "#cffafe",
				textDark: "#1e293b",
				textMedium: "#64748b",
				textLight: "#94a3b8",
				border: "#e2e8f0",
				danger: "#ef4444",
				success: "#10b981",
			},
		},
	},
	plugins: [],
};
