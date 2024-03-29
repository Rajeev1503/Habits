/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'app-background' : '#181818',
        'main-background-dark' : '#111111  ',
        'main-background-light' : '#e2e4e4  ',
        'accent-background-dark' : '#202020',
        'accent-background-light' : '#e9e9e9',
        'navbar-light' : '#131313',
        'card-light' : '#131313',
        'card-dark' : '#181818',
        'navbar' : '#131313',
        'text': 'white',
        'lighttext': '#e2e4e4',
        'darktext': '#0f1419',
        'sub-text' : '#71767b',
        'sub-text-dark' : '#393E46',
        'button-dark' : '#333333',
        'button-light' : '#fff',
        'border-light': '#eff3f4',
        'border-dark': '#222222',
        'border-notactive' : '#548CFF',
        'border-active' : '#D2001A',
        'graybackground' : '#ededed'
      },
      fontSize: {
        'xxs': '0.6rem',
    },
    screens: {
      'mobile': '320px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    },
  },
  plugins: [],
}