module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './views/index.ejs'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
          nunito: ['Nunito', 'sans-serif'],
        },
        colors: {
          violet: '#5320e0',
          'purple-900': '#3e049b',
          'yellow-500': '#ffd900',
          'blue-900': '#012970',
          'indigo-100': '#e5ecfb',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  