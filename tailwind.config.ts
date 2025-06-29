/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": {
            transform: "rotate(215deg) translateX(0)",
            opacity: "1",
          },
          "70%": {
            opacity: "1",
          },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    // Ensure these paths match your actual file locations
  ],
  safelist: ['animate-meteor'], // 👈 Add this if you’re generating class names dynamically
};
