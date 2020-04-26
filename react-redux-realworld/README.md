Realworld React-Redux: Code Guides

Buy the course: https://thinkster.io/tutorials/build-a-real-world-react-redux-application

https://github.com/gothinkster/react-redux-realworld-example-app

The frontend for a social blogging app. See the working website here: https://demo.productionready.io/#/


# Table of contents
1. [Prerequisites](#prereqs)
1. [Create homepage with article list](#articlelist)
1. [Setup HTTP client and get articles](#http)
1. [Integrate React Router](#router)
1. [Hook up authentication form](#auth)
1. [Build registration and settings forms](#forms)
1. [Add pagination](#pagination)

## Prerequisites <a name="prereqs"></a>
- Node https://nodejs.org/en/download/
- Git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Github account https://github.com/ with attached ssh key https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh

## Create homepage with article list <a name="articlelist"></a>
1. git clone -b 00 git@github.com:gothinkster/react-redux-realworld-example-app.git
1. src/index.js : import render root 'App' component wrapped in redux store https://pastebin.com/ASnFu6zB
1. src/components/App.js : Write redux-connected 'App' component https://pastebin.com/YPsVJ9s7
1. src/components/Header.js : Write Header component https://pastebin.com/geMbFY8C
    1. Add Header and a yet-to-be-written Home component to App https://pastebin.com/9XMaTFgy
1. src/components/Home/index.js : Write a Home component, pass appname to Banner followed by a MainView with the articles. https://pastebin.com/eUwwTveR
    1. src/components/Home/Banner.js : Create a banner for the app logo https://pastebin.com/pd428apB
    2. src/components/Home/MainView.js : Create container with tab at the top, pass articles prop to ArticleList https://pastebin.com/Z4PQQHja
    3. src/components/Home/ArticleList.js : Render list of articles https://pastebin.com/U0XWn3nb
1. Do 'npm install && npm start' in the command line. The website should appear at localhost:3000 looking like this: https://drive.google.com/open?id=1SX6r-2KF7w5YIC25B4lZ7HT9zyvww1qT

## Set up HTTP client and get articles <a name="http"></a>
Image: https://drive.google.com/file/d/1fQc2i8kTTTIiStln4CAjZwJfjslnT1tg/view?usp=sharing

1. src/agent.js : create HTTP client with article-getting method https://pastebin.com/KQCKHLF1
    1. components/Home/index.js : get Home to fire Articles.all() upon load https://pastebin.com/RZ4a8teg
1. src/middleware.js : create Redux middleware to catch promises and put their payloads into Redux https://pastebin.com/3KwEgVCW
    1. src/index.js : add promise middleware to the store, and update reducer to put article data into the store https://pastebin.com/edit/9s65yMqe .
    2. At this point you should load up your website and use Chrome Inspector to inspect the network calls. Page load will fire an HTTP request for a list of articles. You should be able to see this request and look at the data it returns. This will tell us how to create an ArticlePreview component to display some of this data
1. src/components/Home/ArticlePreview.js : Create ArticlePreview component to display the article data https://pastebin.com/Vk6KZfG2
    1. src/components/Home/ArticleList.js : map the articledata to ArticlePreviews instead of plain text https://pastebin.com/FCnR6b7x

## Integrate with React Router <a name="router"></a>
1. Refactor store out of index.js
    1. src/store.js : pull store out of index.js and export it from store.js https://pastebin.com/L7wBaPTN
    2. src/index.js : clean up code and import store https://pastebin.com/MPaLjX45
1. src/index.js : Add routes https://pastebin.com/k4sgC4Dz
    1. src/components/App.js : Now that Home is a child of App from react-router, replace it in App.js with this.props.children https://pastebin.com/Ns7wVQxY
1. src/components/Login.js : scaffold the login component https://pastebin.com/2n24eU4A
1. src/components/Header.js : add navigation to the header https://pastebin.com/BVnnwW6s

Images: https://drive.google.com/open?id=1RjjpJmB4VtI724B4EXczkijeqG_M2UQT https://drive.google.com/open?id=15szUk3pYFjn07-uJyBz3PvsniMuybm3Y

## Hook up authentication form <a name="auth"></a>

**Cleanup**

1. Refactor reducers: separate them to child reducers in different files.
    1. src/reducers/home.js https://pastebin.com/x1sVmczq
    2. src/reducers/common.js https://pastebin.com/DCLxjuLb
    3. src/reducers/auth.js https://pastebin.com/yTufK50U
    4. src/store.js : import child reducers and combine them into the root reducer https://pastebin.com/KyXkBQ8F
1. update state selectors to match
    1. src/components/Home/index.js https://pastebin.com/s4nPVVVz
    2. src/components/Home/MainView.js https://pastebin.com/JJuGSCEs

**Hook up the form**

1. src/agent.js : Add login method to HTTP client https://pastebin.com/rTgrCUtY
1. src/components/Login.js : add actions and event handlers to keep track of the form inputs and fire a login request on submit https://pastebin.com/c39yLhGS
    1. Add state and actions to Login https://pastebin.com/5rzgYVYU
    2. Add event handlers to fire the actions https://pastebin.com/NFkxxWPw
    3. Update render function: extract form inputs from props, attach event handlers to form elements,pass errors to ListErrors component. In addition remember to connect Login with Redux. https://pastebin.com/VwYkHPsa
    4. At this point you want to collect some data on what the form errors look like: comment out ListErrors from Login.js so the app compiles. Then go to the website's login page and type in email=test, password=test and press submit. You should be able to inspect the network calls and see what the error response looks like.
1. src/components/ListErrors.js : create ListErrors component to display form errors https://pastebin.com/cewWcxDD
1. src/reducers/auth.js : add handlers for LOGIN, UPDATE_FIELD_AUTH, and ASYNC_START (loading) actions. https://pastebin.com/i7TtaCVc
    1. src/middleware.js : Add ASYNC_START dispatch to promise middleware to https://pastebin.com/aUYt9rq5
    2. At this point, make an account on https://demo.productionready.io/#/ and login on your localhost:3000 website. If you inspect the network calls, you should see the login response contains a user object https://github.com/gothinkster/realworld/tree/master/api#users-for-authentication

**Handle login data**

1. src/reducers/common.js : update common reducer to keep track of logged in status, encoded by an authentication token and user object https://pastebin.com/adbYMaX7
1. src/components/App.js : handle redirects from anywhere in the site: get redirectTo from state and redirect user if necessary https://pastebin.com/KcBeAUxR
1. src/middleware.js : We want to persist the user's loggedin status even if they close the page, and we want to clear the user's status when they log out. To do this we add some middleware to set the jwt (json web token) in window.localStorage and clear it on logout. https://pastebin.com/ywb0sDHD
    1. src/store.js : apply this middleware to the store https://pastebin.com/3ayAUnPG
    2. src/components/App.js : we want to log in the user when they open the page after closing it. To do this we extract the token from localStorage and pass it to the agent as well as to Redux. https://pastebin.com/TnTBfJkL
    3. src/agent.js : keep track of token, and attach it to all requests. Add Auth.current() method for getting the data for the current user, and setToken method. https://pastebin.com/L7FVWhyK

**Display login status**

1. src/components/Header.js : Add separate LoggedInView and LoggedOutView which we conditionally render based on login status https://pastebin.com/ENQF8aCA
1. src/components/App.js : pass currentUser from App to Header https://pastebin.com/fDQKJ97E

## Build registration and authentication forms <a name="forms"></a>

**Registration View**
1. src/agent.js: add register function to agent.Auth https://pastebin.com/v5nZ3UFE
1. src/reducers/auth.js: add REGISTER case to auth reducer to handle errors https://pastebin.com/3aKLv0uU
1. src/reducers/common.js: add REGISTER case to common reducer to grab user information https://pastebin.com/pNqGGVPU
1. src/components/Register.js: build out the Register component
    1. extract auth data with mapStateToProps https://pastebin.com/rAFAPm64
    2. add form update/submit actions with mapDispatchToProps https://pastebin.com/TMkK6fMM
    3. bind actions to event handler functions https://pastebin.com/6Prcp7hr
    4. render and export the component https://pastebin.com/pHrB9Bc0
1. src/index.js: add route https://pastebin.com/8K4Hbhsg

## Add pagination (this is one of the last steps, I haven't written the intermediate guides yet) <a name="pagination"></a>
Image: https://drive.google.com/open?id=1Lxc6qtuu9I_vMk_sDUORnjqrBZyEZc6G
Buy the course: https://thinkster.io/tutorials/react-redux-pagination

Paginate the results for article lists.
1. Update http requests: allow asking for an arbitrary number of results. https://pastebin.com/aL1CiCK6
1. Create ListPagination component: it maps page numbers to li's which fire a setPage action on click. https://pastebin.com/czjpXqFZ
1. Add ListPagination to ArticleList: pass articlesCount, currentPage, onSetPage to ListPagination which we render at the bottom of the component. https://pastebin.com/e0D602pr
1. Create onSetPage prop to pass to ArticleList: do this in each component which uses ArticleList.
    1. MainView: Add SET_PAGE action with pagenumber and data to props. Pass it to articleList. https://pastebin.com/g1cuyCyP
    2. Profile: Ditto, but the data comes from articles from the profile's user. https://pastebin.com/EN1nA39A
    3. ProfileFavorites: Override the onSetPage function from profile to get favorited articles. https://pastebin.com/M8L3eVvH
1. update articleList reducer: page load actions should set currentPage attribute to 0. SET_PAGE should update article data and set the current page. https://pastebin.com/yFWf4JyQ

Summary: Click page => fire onSetPage from ListPagination's parent => dispatch SET_PAGE with page number and data => load new data to state, redux loads data into component => render new list of articles.
