import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontSize: {
				lmsBase: "0.75rem",
			},
			boxShadow: {
				"custom-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
				"custom-dark": "0 1px 13px rgba(0, 0, 0, 0.3)",
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				lmsAccent: "#115DB8",
				lmsSuccess: "#24A148",
				lmsError: "#C92710",
				lmsPrimary: "#092F5C",
				lmsSecondary: "#3A597D",
				lms: {
					50: "#F3F5F7",
					100: "#E6EAEF",
					200: "#CED5DE",
					300: "#9DACBE",
					400: "#8496ad",
					500: "#8497AD",
					600: "#536c8b",
					700: "#536D8D",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fingerTap: {
					"0%, 100%": { transform: "translateY(0)" },
					"20%": { transform: "translateY(-12px)" },
				},
				fingerTap2: {
					"0%, 100%": { transform: "translateY(0)" },
					"30%": { transform: "translateY(-14px)" },
				},
				fingerTap3: {
					"0%, 100%": { transform: "translateY(0)" },
					"40%": { transform: "translateY(-16px)" },
				},
				fingerTap4: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-14px)" },
				},
				fingerTap5: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-12px)" },
				},
				bounce: {
					"0%, 100%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "none",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fingerTap: "fingerTap 1s infinite",
				fingerTap2: "fingerTap2 1s infinite",
				fingerTap3: "fingerTap3 1s infinite",
				fingerTap4: "fingerTap4 1s infinite",
				fingerTap5: "fingerTap5 1s infinite",
				bounce: "bounce 1s infinite",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
