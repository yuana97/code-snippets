Realworld React-Redux: Code Guides

https://github.com/gothinkster/react-redux-realworld-example-app

The frontend for a social blogging app. See the working website here: https://demo.productionready.io/#/

# Table of contents
1. [Create homepage with article list](#articlelist)
2. [Get articles and setup routing](#http)
10. [Add pagination](#pagination)

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
1. The website should appear at localhost:3000 looking like this: https://drive.google.com/open?id=1SX6r-2KF7w5YIC25B4lZ7HT9zyvww1qT

## Get articles and setup routing <a name="http"></a>
1. src/agent.js : create HTTP client with article-getting method https://pastebin.com/KQCKHLF1
    1. components/Home/index.js : integrate 

## Add pagination <a name="pagination"></a>
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
