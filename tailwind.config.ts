import type { Config } from "tailwindcss";
import tailwind from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Design system colors (from dental-care-design)
				primary: {
					DEFAULT: '#0d9488', // Teal
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#FF8A65', // Coral
					foreground: '#111817'
				},
				accent: {
					yellow: '#FFD54F',
					purple: '#B39DDB',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				background: {
					DEFAULT: '#FFFAEB', // Warm Cream
					dark: '#102220'
				},
				foreground: {
					DEFAULT: '#111817',
					muted: '#6b7280'
				},
				surface: {
					DEFAULT: '#ffffff',
					dark: '#1e293b'
				},
				border: {
					DEFAULT: '#111817',
					light: '#e5e7eb'
				},
				'gray-light': '#f1f5f9',
				'gray-dark': '#334155',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				sans: ['Spline Sans', 'Inter', 'system-ui', 'sans-serif'],
				display: ['Spline Sans', 'Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				DEFAULT: '1rem',
				lg: '2rem',
				xl: '3rem',
				'2xl': '1rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				// Pop/sticker style shadows
				'pop': '4px 4px 0px 0px rgba(17, 24, 23, 1)',
				'pop-hover': '2px 2px 0px 0px rgba(17, 24, 23, 1)',
				'pop-sm': '2px 2px 0px 0px rgba(17, 24, 23, 1)',
				'card': '6px 6px 0px 0px rgba(13, 148, 136, 0.15)',
				'card-hover': '4px 4px 0px 0px rgba(17, 24, 23, 1)',
				'glow': '0 0 20px rgba(56, 189, 248, 0.15)',
				'soft': '0 20px 40px -15px rgba(19, 127, 236, 0.15)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				float: {
					'0%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					},
					'100%': {
						transform: 'translateY(0px)'
					}
				},
				'float-delayed': {
					'0%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					},
					'100%': {
						transform: 'translateY(0px)'
					}
				},
				draw: {
					from: {
						strokeDashoffset: '1000'
					},
					to: {
						strokeDashoffset: '0'
					}
				},
				slide: {
					'0%': {
						transform: 'translateX(0%)'
					},
					'100%': {
						transform: 'translateX(-100%)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				float: 'float 6s ease-in-out infinite',
				'float-delayed': 'float 6s ease-in-out infinite 3s',
				draw: 'draw 3s ease-out forwards'
			}
		}
	},
	plugins: [tailwind, require("tailwindcss-animate")],
};
export default config;
