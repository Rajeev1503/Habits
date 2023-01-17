/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'main-background' : '#181818',
        'display-layout-light': '#000000',
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
        'button-light' : '#eff3f4',
        'border-light': '#eff3f4',
        'border-dark': '#333333',
        'border-notactive' : '#548CFF',
        'border-active' : '#D2001A',
        'graybackground' : '#ededed'
      },
      fontSize: {
        'xxs': '0.6rem',
    },
    },
  },
  plugins: [],
}