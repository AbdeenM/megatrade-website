# ![alt text](https://github.com/AbdeenM/megatrade-website/blob/master/icon.png) MegaTrade Website

[![Status](https://img.shields.io/badge/build-passing-green.svg?branch=master)](https://github.com/AbdeenM/megatrade-website)
[![React JS](https://img.shields.io/badge/React-v16.12.0-blue.svg?logo=react)](https://reactjs.org/)
[![Material UI 4](https://img.shields.io/badge/Material%20UI-v4.6.0-blue.svg?logo=material-ui)](https://material-ui.com/)
[![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-v5.1.2-blue.svg?logo=reactrouter)](https://github.com/ReactTraining/react-router/)
[![Heroku](https://img.shields.io/badge/Heroku-v3.4.1-purple.svg?logo=heroku)](https://heroku.com/)
[![Socket IO](https://img.shields.io/badge/Socket.io-v2.3.0-black.svg?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)](http://mit-license.org/)

<p align="center">
   <a href="https://github.com/AbdeenM/megatrade-website/blob/master/screenshots/website.png">
    <img alt="megatrade-website" src="https://github.com/AbdeenM/megatrade-website/blob/master/screenshots/website.png" />
 </a>
</p>

MegaTrade website is a production level platform that can be used for buinesses revolving around trading signal generations and alerts.
It includes many features that the business may need such as:
1. Responsive Landing Website
2. Administration Dashobard
3. Customers Dashboard
4. Analytics and Google Analytics
5. Live Market Tools using TradeView
6. Payment Gateway Intgration (PayPal)
7. Live Chat and Support
8. Community Group Chat

**You can see the live demo by visting https://megatrade.world**

## Features

* [React JS](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Socket IO](https://socket.io/)
* [React Router DOM](https://github.com/ReactTraining/react-router/)
* [Heroku Cloud](https://heroku.com/)
* [MomentJs](https://momentjs.com/)
* [React Ionicons](https://ionicons.com/)
* [React Google Analytics](https://ionicons.com/)

... and many more, check the `package.json` file for all the libraries used.

## Prerequisites

* [Megatrade Backend Server](https://github.com/AbdeenM/megatrade-backend/) (Required, this is your Megatrade Website server, daa!)
* [Node](https://nodejs.org) v8.10 (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
* [NPM](https://npmjs.com/) or [Yarn](https://https://yarnpkg.com/)
* A development enviroment setup with React JS, you can follow [these instructions](https://reactjs.org/docs/getting-started.html/) (Required as project core)
* Facebook App Id, you can follow [these instructions](https://docs.expo.io/versions/v35.0.0/sdk/facebook/) (Optional, for facebook login to work)
* Google Clients Id, you can follow [these instructions](https://docs.expo.io/versions/v35.0.0/sdk/google/) (Optional, for google login to work)

## Installation

Moving Forward this assumes you have everything setup, now to install the project either download the .zip file and extract or navigate to an empty directory and clone this repo:
```bash
git clone https://github.com/AbdeenM/megatrade-website.git
```
Once you have the project files downloaded navigate to where the `package.json` file is in your directory and run `npm install` or `yarn install` depending on what you have as a package manager.

## Getting Started

0. Setup [Megatrade Server](https://github.com/AbdeenM/megatrade-backend/).
1. Modify `src/config/Constants.js` with your details respectively.
2. Run `npm start` on the project root directory.
4. Now sit back relax and enjoy exploring the website!

## Important

When you intially run the website you will have access to two dashboards one for your customers which will be accessed by them normally through the url `https://[your-domain]/` and the second is your administration dashboard which can be accessed by you through the url `https://[your-domain]/admin`.

Creating an account as a customer is easy and happens through the natural process of registering through the website, however there is no by default account created for administration so you will have to do it manual and post a request to your backend server thats running to create your admin account.
one easy way to do this is using the application [POSTMAN](https://www.postman.com/), follow the steps below:

0. Setup [Megatrade Server](https://github.com/AbdeenM/megatrade-backend/).
1. Open Postman and chose to make a post request to the url `[your-backend-url-same-as-in-constants.js]/api/admin/register`
2. Under headers tab on postman enter a key `Content-Type` and value `application/x-www-form-urlencoded`
3. Under body chose `x-www-form-urlencoded` and enter the follow key/value pairs:
    1. `firstName` -    `your-admin-first-name`
    2. `lastName` -    `your-admin-last-name`
    1. `email` -    `your-admin-email-for-login`
    1. `password` -    `your-admin-password-for-login`

## Project Status

This project has great potential for improvements, currently i wont be updating or modifying it due to time shortage but feel free to contribute!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

**Megatrade** © 2020, Released under the **[MIT License](http://mit-license.org/)**

Authored and Maintained by **[Abdeen Mohamed](https://github.com/AbdeenM)**
