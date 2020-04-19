Realworld React-Redux: Code Guides

https://github.com/gothinkster/react-redux-realworld-example-app

The frontend for a social blogging app. See the working website here: https://demo.productionready.io/#/

# Table of contents
1. [Add pagination](#pagination)

## Add pagination <a name="pagination"></a>
Buy the course: https://thinkster.io/tutorials/react-redux-pagination

Paginate the results for article lists.
1. Update http requests: allow asking for an arbitrary number of results. https://pastebin.com/aL1CiCK6
1. Create ListPagination component: it maps page numbers to li's which fire a setPage action on click. https://pastebin.com/czjpXqFZ
1. Add ListPagination to ArticleList: pass articlesCount, currentPage, onSetPage to ListPagination which we render at the bottom of the component. https://pastebin.com/e0D602pr
1. Create onSetPage prop to pass to ArticleList: do this in each component which uses ArticleList.
  1. MainView: Add SET_PAGE action with pagenumber and data to props. Pass it to articleList. https://pastebin.com/g1cuyCyP
  1. Profile: Ditto, but the data comes from articles from the profile's user. https://pastebin.com/EN1nA39A
  1. ProfileFavorites: Override the onSetPage function from profile to get favorited articles. https://pastebin.com/M8L3eVvH
1. update articleList reducer: page load actions should set currentPage attribute to 0. SET_PAGE should update article data and set the current page. https://pastebin.com/yFWf4JyQ
