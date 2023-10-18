/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bgprimary: "#20232F",
                bgsecondary: "#1D1B26",
                bgtertiary: "#292F41",
                primary: "#ffffff",
                secondary: "#DBDBDB",
                tertiary: "#A4A3A8",
            },
            screens: {
                llg: "1152px",
            },
            spacing: {
                18: "4.5rem",
                2.5: "0.625rem",
            },
        },
    },
    plugins: [],
};
