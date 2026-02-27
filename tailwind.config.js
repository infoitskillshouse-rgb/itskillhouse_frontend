  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#0A3D62",
          accent: "#00CFFD",
          surface: "#eaf4ffff",
          text: "#155DFC",
          hover: "#126E82",
          light: "#ffffffff",
          dark: "#000000",
        },
        fontFamily: {
           montserrat: ['Montserrat', 'sans-serif'],
      },
      
    },
    plugins: [],
  }};
