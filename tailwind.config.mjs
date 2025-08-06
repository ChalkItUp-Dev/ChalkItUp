import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        background: '#FFFFFF',
                        foreground: '#11181C',
                        primary: {
                            DEFAULT: '#0072F5',
                            foreground: '#FFFFFF',
                        },
                        success: {
                            DEFAULT: '#17c964',
                            foreground: '#FFFFFF',
                        },
                        danger: {
                            DEFAULT: '#f31260',
                            foreground: '#FFFFFF',
                        },
                    },
                },
                dark: {
                    colors: {
                        background: '#000000',
                        foreground: '#ECEDEE',
                        primary: {
                            DEFAULT: '#0072F5',
                            foreground: '#FFFFFF',
                        },
                        success: {
                            DEFAULT: '#17c964',
                            foreground: '#FFFFFF',
                        },
                        danger: {
                            DEFAULT: '#f31260',
                            foreground: '#FFFFFF',
                        },
                    },
                },
            },
        }),
    ],
};
