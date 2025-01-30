// tailwind.config.js
const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/@heroui/theme/dist/components/(button|card|code|dropdown|image|input|kbd|link|modal|navbar|progress|snippet|toggle|ripple|spinner|menu|divider|popover|form).js',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [heroui()],
};
