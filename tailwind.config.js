/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  theme: {
		extend: {
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "1.875rem",
				"4xl": "2.25rem",
				"5xl": "3rem",
			},
			fontFamily: {
				black: ["Fontspring-black", "sans-serif"],
				light: ["Fontspring-light", "sans-serif"],
				medium: ["Fontspring-medium", "sans-serif"],
				regular: ["Fontspring-regular", "sans-serif"],
				semibold: ["Fontspring-semibold", "sans-serif"],
			},
			screens: {
				small: "376px",
			},
			keyframes: {
				// Define fade-in upwards animation
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
			},
			animation: {
        fadeUpFast: 'fadeUp 0.5s ease-out',
        fadeUp: 'fadeUp 0.8s ease-out',
        fadeUpLater: 'fadeUp 1.5s ease-out',
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      colors: {
        white: {
          100: "rgba(255, 255, 255, 1)",
          200: "rgba(249, 251, 253, 1)",
          // 300: "rgb(242 253 253)",
          400: "rgb(249, 251, 253)",
          500: "rgb(230 227 227)",
          600: "rgb(240, 240, 240)",
          700: "rgba(247, 249, 251, 1)",
          800: "rgba(247, 248, 249, 1)",
        },
        black: {
          100: "rgb(0, 0, 0)",
          200: "rgba(0, 0, 0, 1)",
          300: "rgba(0, 0, 0, 0.5)",
          400: "rgba(0, 0, 0, 0.7)",
          500: "rgba(27, 28, 30, 1)",
        },
        blue: {
          50: "rgb(247, 250, 253)",
          100: "rgb(215, 230, 246)",
          200: "rgb(172, 203, 236)",
          300: "rgb(130, 177, 227)",
          400: "rgb(88, 151, 218)",
          500: "rgb(47, 125, 208)",
          600: "rgb(37, 100, 167)",
          700: "rgb(28, 75, 125)",
          800: "rgb(19, 50, 83)",
          900: "rgb(9, 25, 42)",
          950: "rgb(5, 12, 21)",
        },
        yellow: {
          50: "rgb(255, 249, 230)",
          100: "rgb(254, 243, 205)",
          200: "rgb(253, 230, 155)",
          300: "rgb(252, 218, 105)",
          400: "rgb(251, 205, 55)",
          500: "rgb(253, 227, 142)",
          600: "rgb(200, 154, 4)",
          700: "rgb(150, 116, 3)",
          800: "rgb(100, 77, 2)",
          900: "rgb(50, 39, 1)",
          950: "rgb(25, 19, 0)",
        },
        purple: {
          50: "rgb(246, 237, 248)",
          100: "rgb(237, 219, 240)",
          200: "rgb(219, 183, 225)",
          300: "rgb(202, 147, 210)",
          400: "rgb(184, 111, 195)",
          500: "rgb(229, 202, 233)",
          600: "rgb(133, 60, 144)",
          700: "rgb(100, 45, 108)",
          800: "rgb(66, 30, 72)",
          900: "rgb(33, 15, 36)",
          950: "rgb(17, 8, 18)",
        },
        amber: {
          50: "rgb(252, 239, 233)",
          100: "rgb(249, 223, 210)",
          200: "rgb(242, 191, 166)",
          300: "rgb(236, 159, 121)",
          400: "rgb(230, 127, 76)",
          500: "rgb(239, 174, 142)",
          600: "rgb(179, 76, 25)",
          700: "rgb(134, 57, 19)",
          800: "rgb(89, 38, 13)",
          900: "rgb(45, 19, 6)",
          950: "rgb(22, 10, 3)",
        },
        green: {
          50: "rgb(240, 249, 236)",
          100: "rgb(226, 242, 217)",
          200: "rgb(196, 230, 179)",
          300: "rgb(167, 217, 140)",
          400: "rgb(138, 204, 102)",
          500: "rgb(186, 225, 165)",
          600: "rgb(87, 153, 51)",
          700: "rgb(65, 115, 38)",
          800: "rgb(43, 77, 25)",
          900: "rgb(22, 38, 13)",
          950: "rgb(11, 19, 6)",
        },
        success: {
          50: "rgb(231, 246, 236)",
          75: "rgb(181, 227, 196)",
          100: "rgb(145, 214, 168)",
          200: "rgb(95, 195, 129)",
          300: "rgb(64, 184, 105)",
          400: "rgb(15, 151, 61)",
          500: "rgb(9, 145, 55)",
          600: "rgb(4, 128, 46)",
          700: "rgb(3, 107, 38)",
          800: "rgb(1, 91, 32)",
          900: "rgb(0, 70, 23)",
        },
        warning: {
          50: "rgb(254, 246, 231)",
          75: "rgb(251, 226, 183)",
          100: "rgb(247, 211, 148)",
          200: "rgb(247, 193, 100)",
          300: "rgb(245, 181, 70)",
          400: "rgb(243, 162, 24)",
          500: "rgb(221, 144, 13)",
          600: "rgb(173, 111, 7)",
          700: "rgb(134, 85, 3)",
          800: "rgb(102, 65, 1)",
          900: "rgb(82, 51, 0)",
        },
        error: {
          50: "rgb(251, 234, 233)",
          75: "rgb(242, 188, 186)",
          100: "rgb(235, 155, 152)",
          200: "rgb(226, 110, 106)",
          300: "rgb(221, 82, 77)",
          400: "rgb(212, 38, 32)",
          500: "rgb(203, 36, 30)",
          600: "rgb(186, 17, 11)",
          700: "rgb(158, 10, 5)",
          800: "rgb(128, 5, 1)",
          900: "rgb(89, 16, 0)",
        },
        grey: {
          50: "rgb(249, 250, 251)",
          75: "rgb(247, 249, 252)",
          100: "rgb(240, 242, 245)",
          200: "rgb(228, 231, 236)",
          300: "rgb(208, 213, 221)",
          400: "rgb(152, 162, 179)",
          500: "rgb(102, 113, 133)",
          600: "rgb(71, 83, 103)",
          700: "rgb(52, 64, 84)",
          800: "rgb(29, 39, 57)",
          900: "rgb(16, 25, 40)",
        },
      },
		},
	},
	plugins: [],
};
