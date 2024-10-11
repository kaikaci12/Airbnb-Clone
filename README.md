<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/768px-Airbnb_Logo_B%C3%A9lo.svg.png">
Airbnb Clone with Next.js
Full Stack Airbnb Clone with Next.js Tailwind-css,mongoose , MongoDB, NextAuth,, Login , Image upload, firebase, Location selection, Map component, Country autocomplete, Fetching listings with server components.

View Demo · Documentation · Report Bug · Request Feature

📔 Table of Contents
About the Project
Screenshots
Tech Stack
Environment Variables
Getting Started
Prerequisites
Installation
Run Locally
Deployment
Contact
🌟 About the Project

Reservation functionality & Description and Price, Listing creation, Listing card component
image

Searching functionality Favorite functionality, Individual Listing View, Listing reservation component
image
LIVE DEMO 💥
forthebadge forthebadge forthebadge

👾 Tech Stack
Client
Database

    Google

🧰 Getting Started
‼️ Prerequisites
Install Node JS in your computer HERE

Get Lookup APi Key HERE
🔑 Environment Variables
To run this project, you will need to add the following environment variables to your .env file

DATABASE_URL

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

NEXTAUTH_SECRET

NEXTAUTH_URL

NEXT_PUBLIC_LOOKUP_KEY

This project was bootstrapped with Create React App.

⚙️ Installation

Install my-project with npm

npx create-next-app@latest my-project --typescript --eslint
cd my-project
Install dependencies

🧪 Install Tailwind CSS with Next.js
Install Tailwind CSS

Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./app/**/_.{js,ts,jsx,tsx}",
"./pages/\*\*/_.{js,ts,jsx,tsx}",
"./components/\*_/_.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",

],
theme: {
extend: {},
},
plugins: [],
};
Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./styles/globals.css file.

@tailwind base;
@tailwind components;
@tailwind utilities;
Install dependencies

🔶 Dependency Info

🏃 Run Locally

Clone the project

git clone https://github.com/kaikaci12/Airbnb-Clone
change directory

cd Airbnb-Build
Install dependencies

npm install
Start the server

npm run dev
This is a Next.js project bootstrapped with create-next-app.

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

API routes can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in pages/api/hello.js.

The pages/api directory is mapped to /api/\*. Files in this directory are treated as API routes instead of React pages.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

🚩 Deployment
To deploy this project run

Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

🤝 Contact
Sashen - @twitter_handle - sashenjayathilaka95@gmail.com

Live Site: airbnb-clone-one-lovat.vercel.app

image
