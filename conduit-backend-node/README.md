Realworld NodeJS: Code Guides

Buy the course: https://thinkster.io/tutorials/node-json-api

API specification: https://github.com/gothinkster/realworld/blob/master/api/README.md

The backend for a social blogging app. See the working website here: https://demo.productionready.io/#/


# Table of contents
1. [Setup + first model](#setup)
1. [Authentication API](#auth)

## Setup + first model <a name="setup"></a>
**Setup**
1. Node https://nodejs.org/en/download/
1. Git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
1. MongoDB https://www.mongodb.com/
1. git clone -b 00-seed https://github.com/gothinkster/node-express-realworld-example-app.git
1. open your node-express-realworld-example-app directory in VS Code https://code.visualstudio.com/
1. npm install
1. npm install -g nodemon (CLI monitor script for developing a server)
1. nodemon app.js (you should see your server listening on port 3000)
1. ctrl + c and add nodemon as an npm script to package.json https://pastebin.com/zUFbZU7L
1. npm run dev (you should see your server listening on port 3000)

**Add the User model**
1. create the user schema in models/User.js: https://pastebin.com/5X5zCijY
1. add some data validation to models/User.js for correctly formed, unique username + email https://pastebin.com/kUXqnEUc
1. add methods to models/User.js to set/validate password, generate authentication token, and return user object https://pastebin.com/9jSrQdzZ
1. register the User schema with app.js https://pastebin.com/eatjYt4v

## Authentication API <a name="auth"></a>
We want to create four endpoints for authentication: POST /api/users for registering users, POST /api/users/login for logging in users, GET /api/user to identify logged in user, PUT /api/user to update user settings.

**Middleware**
1. Login middleware
    1. config/passport.js: Configure Passport to authenticate login requests https://pastebin.com/Dxdf2CGU
    2. app.js: Register Passport with the app https://pastebin.com/9D0MVxqm
1. routes/auth.js: add middleware for validating requests with an auth token https://pastebin.com/zfRbCYsy

**Routes**
1. Register user router with api router
    1. routes/api/users.js: create a skeleton for the user router https://pastebin.com/36e5aPut
    2. routes/api/index.js: register the users router https://pastebin.com/dchwWViB
1. routes/api/users.js: add registration route https://pastebin.com/EKj2YNK8
1. routes/api/index.js: add an error handler https://pastebin.com/2TDRiMWp it catches the errors thrown by the registration route
1. routes/api/users.js: add the rest of the routes https://pastebin.com/7Z5eaJ01

**Testing**

