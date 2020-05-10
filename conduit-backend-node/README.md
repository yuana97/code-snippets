Realworld NodeJS: Code Guides

Buy the course: https://thinkster.io/tutorials/node-json-api

API specification: https://github.com/gothinkster/realworld/blob/master/api/README.md

The backend for a social blogging app. See the working website here: https://demo.productionready.io/#/


# Table of contents
1. [Setup + first model](#setup)
1. [Authentication API](#auth)
1. [Profiles and articles api](#articles)

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
1. install and run mongodb https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ (choose windows/linux from the left navigation if you're not on mac)
1. npm run dev (start your server)
1. download postman https://www.postman.com/downloads/
    1. Import > import from link > paste https://raw.githubusercontent.com/gothinkster/realworld/master/api/Conduit.postman_collection.json a collection of unit tests for our apis
    2. create a postman_env.json like the following so we load the env vars to run the unit tests we just imported https://pastebin.com/GxhXkvJX
    3. in postman click settings icon (manage environments) > import > click your postman_env.json.
    4. click on the environment dropdown and select Conduit
1. testing
    1. Register: click Auth > register from the postman side nav. Replace {{APIURL}} with localhost:3000/api then click body and pass your desired parameters to the body. Hit send, you should see your server return a user object. Hit send again, you should see 'email is already taken' error.
    2. Login and Remember Token: click auth > login. Replace the URL and body params as before. Hit send and you shoudl see a user object get returned. Copy the token to test the current user endpoint.
    3. Current User: Replace URL, go to headers and replace {{token}} with your copied token, hit send. You should get a user object back.
    4. Update User: Replace url + token as above, change the email in the body to a new email, and hit send. you should get a user object back with your updated email.

This covers unit testing our API with Postman. You should see at this point that our auth API is up and running, and make sure to debug if it's not.

## Profile + articles apis <a name="articles"></a>
We want to add a public route for viewing profiles, as well as routes to CRUD articles.

**Profile**
1. add a method to models/User.js for returning a user's public profile https://pastebin.com/w05XqLE2
1. create a basic api in routes/api/profiles.js https://pastebin.com/DuD0LYx6
    1. register it with routes/api/index.js https://pastebin.com/QwdeiQ82
    2. add an endpoint to routes/api/profiles.js to get the user profile https://pastebin.com/pYM0xZma
1. Consider the 'following' feature of the site which we will implement down the line. In order to correctly display whether you're following a given user, we need to pass the current user to the toProfileJsonFor method. Let's do that now.
    1. update toProfileJsonFor in models/User.js to take a user param https://pastebin.com/5tk476Z1
    2. routes/api/profiles.js: update the GET /:username endpoint to pass the user profile to toProfileJsonFor https://pastebin.com/nHgh158S

**Testing**
1. Provided you've done the testing steps above for Authentication, use the Profiles > Profile request in Postman to localhost:3000/api/profiles/{USERNAME} and confirm that you get back a profile without sensitive information like email, auth token, etc.

