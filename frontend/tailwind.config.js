/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Your custom colors
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                border: {
                    DEFAULT: 'var(--border)',
                    strong: 'var(--border-strong)'
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)'
                }
            }
        }
    },
    plugins: [],
}
