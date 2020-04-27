# Description

A tutorial to build the OpenDota front end. https://www.opendota.com/

Source code credits to Howard Chung and the OpenDota Project https://github.com/odota/web

# Table of contents
1. [Setup](#setup)
1. [Home component](#home)

## Setup <a name="setup"></a>
**Render a basic component**
1. npm i -g create-react-app && create-react-app opendota-web
1. delete ./public and copy the public folder from the linked repo.
1. delete everything in src and create src/index.js https://pastebin.com/817t0brG
1. create src/components/App/App.jsx https://pastebin.com/8dzVu8Hq
1. create src/components/App/index.js to export App https://pastebin.com/cgCFtRvu
1. npm i history react-router-dom

**Store**
1. create src/store/index.js: https://pastebin.com/P5iaT99n
    1. npm i redux redux-responsive redux-thunk
1. create src/reducers/index.js: https://pastebin.com/hhamgvYk
1. integrate store with src/index.js: https://pastebin.com/L21gTNLD

## Home component <a name="home"></a>

First dispatch some actions to get constant data from the API.

**Fetch basic data**
1. create .env: set environment variables https://pastebin.com/wMyrauYL
1. create src/actions/action.js: an async action template https://pastebin.com/DWb9XwhJ
1. create src/actions/index.js: write some actions