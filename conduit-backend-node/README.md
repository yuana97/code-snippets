Realworld NodeJS: Code Guides

Buy the course: https://thinkster.io/tutorials/node-json-api

API specification: https://github.com/gothinkster/realworld/blob/master/api/README.md

The backend for a social blogging app. See the working website here: https://demo.productionready.io/#/


# Table of contents
1. [Setup + first model](#setup)
1. [Authentication API](#auth)
1. [Profiles and articles api](#articles)
1. [Favoriting](#fav)
1. [Comments](#comments)

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
We want to add a public route for viewing profiles, as well as routes to CRUD (create read update delete) articles.

**Profile**
1. add a method to models/User.js for returning a user's public profile https://pastebin.com/w05XqLE2
1. create a basic api in routes/api/profiles.js https://pastebin.com/DuD0LYx6
    1. register it with routes/api/index.js https://pastebin.com/QwdeiQ82
    2. add an endpoint to routes/api/profiles.js to get the user profile https://pastebin.com/pYM0xZma
1. Consider the 'following' feature of the site which we will implement down the line. In order to correctly display whether you're following a given user, we need to pass the current user to the toProfileJsonFor method. Let's do that now.
    1. update toProfileJsonFor in models/User.js to take a user param https://pastebin.com/5tk476Z1
    2. routes/api/profiles.js: update the GET /:username endpoint to pass the user profile to toProfileJsonFor https://pastebin.com/nHgh158S
1. Provided you've done the testing steps above for Authentication, use the Profiles > Profile request in Postman to localhost:3000/api/profiles/{USERNAME} and confirm that you get back a profile without sensitive information like email, auth token, etc.

**CRUD for Articles**

We want to CRUD (create read update delete) our articles. Let's consider all the data we need to represent an article:

- slug: URL slug to identify the article, used for database lookups
- title: Article title
- body: Markdown text for our article body
- description: Article description
- favoritesCount: how many times the article has been favorited
- tagList: a list of tags attached to the article
- author: JSON profile of the author

**Create a model and API**

1. Create an article model in models/Article.js. We should include the schema above, some data validation, and a method to get the article JSON. https://pastebin.com/QsAKcB4v
    1. Register this model with app.js https://pastebin.com/6XrSLH3Z
1. Create a basic router for articles in routes/api/articles.js https://pastebin.com/Zxq5b3KT
    1. Register the articles router with routes/api/index.js https://pastebin.com/H1A8eGdp
    2. Add endpoints to routes/api/articles.js to C, R, U, D articles https://pastebin.com/4x9ZuESF

**Testing**

Do these tests in Postman.

1. Use Auth > Login and Remember Token (POST localhost:3000/api/users/login) and copy the token you get back
1. Go to Articles,Favorite,Comments > Create Article (POST localhost:3000/api/articles) and change headers.authorization to Token {{your_token}}, change the endpoint to localhost:3000/api/articles, and hit send. You should get the article object back. Copy the slug for the next test.
1. Go to Single Article by Slug (GET localhost:3000/api/articles/{{slug}}) and plug in your token to headers, api url and slug to the endpoint. Hit send and you should see your article come back.
1. Go to Update Article (localhost:3000/api/articles/{{slug}}) and plug in your token to headers, api url and slug to the endpoint. Change the body to something like 'test1' and hit send. You should get the article back and see that the body has changed to 'test1'.
1. Go to Delete Article (localhost:3000/api/articles/{{slug}}), plug in your stuff and hit send. You should get a 204 response.
1. Repeat your Single Article by Slug request. You should get a 404 error.

## Implement favoriting functionality <a name="fav"></a>

Favoriting requirements: We should be able to view a list of a user's favorited articles. For any given user articles should display a favorite/unfavorite button. Articles should have a favorited count.

**Data**
1. models/User.js: Add favorites data and favorite/unfavorite methods to UserSchema to record the user's list of favorited articles https://pastebin.com/N6NFqaWa
1. models/User.js: Add isFavorite method to check if an article is in the favorited list. https://pastebin.com/vEKALdsv
    1. models/Article.js: Add a favorited field to the toJSONFor output to check if we should display the favorite/unfavorite button https://pastebin.com/ZdwGDf15
1. models/Article.js: import User model and add favoriteCount method https://pastebin.com/Sma4L0ZR

**Endpoints**
1. routes/api/articles.js: add favorite/unfavorite endpoints https://pastebin.com/1x6q7sAg

**Testing**
Run these tests in Postman.

1. Create Article and copy the slug
1. Login and Remember Token and copy the token.
1. Plug in the token, slug, and apiurl to Favorite Article and hit send. You should get your article back with a favoriteCount of one.
1. Ditto for Unfavorite Article but your article should come back with a favoritesCount of 0.

## Implement commenting functionality <a name="comments"></a>

Comment requirements: any user can comment on an article, anyone can read, author can delete. Articles contain lists of comments.

1. models/Comment: create basic comment model w/ schema and getter method https://pastebin.com/mF64bU0n
    1. register Comment in app.js https://pastebin.com/Q3uRfrSX
    2. models/Article: add comment list field to schema https://pastebin.com/YXH8kQMC
1. routes/api/articles.js: create CRD endpoints for comments https://pastebin.com/NR6CHWyx

**Testing**

1. Login And Remember Token, hit send, copy token
1. Create Article, paste token, hit send, copy slug
1. Create Comment For Article, paste token + slug, hit send, copy commentid.
    1. You should get your comment schema back.
1. All Comments for Article, paste token + slug, hit send.
    1. You should get a list of comments for your article.
1. Delete Comment for Article, paste token + slug + commentid, hit send.
    1. You should get a 204 status.

## Implement following functionality <a name="follow"></a>

Comment requirements: any user can comment on an article, anyone can read, author can delete. Articles contain lists of comments.

1. models/User: Schema should store users you're following. Add methods for following/unfollowing. Add a method to check if a user is following another, and update the JSON payload to include a 'following' boolean. https://pastebin.com/CJAM1f3k
1. routes/api/articles.js: Add endpoints to follow and unfollow users. https://pastebin.com/PStYwTep