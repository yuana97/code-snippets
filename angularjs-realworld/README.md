# Conduit AngularJS Frontend - Coding Guide
Build the frontend for https://demo.productionready.io/#/ in AngularJS.

# Table of contents
0. [Setup](#setup)
1. [Build](#build)

## Setup <a name="setup"></a>

1. Install VS Code: https://code.visualstudio.com/
1. Install Node: https://nodejs.org/en/download/
1. Install Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
1. git clone -b 00-seed git@github.com:gothinkster/angularjs-realworld-example-app.git
1. open angularjs-realworld-example-app in VS Code and open up the VS Code terminal.
1. npm install && npm i -g gulp-cli (install dependencies and gulp command line interface)
1. delete gulpfile.js (we will re-write it).

## Build <a name="build"></a>
Image: https://drive.google.com/open?id=1VSyz0_qExC5RzdHF2GASsqZ7Rkq1ASum After this step, you should be able to run 'gulp' in the terminal and see text like in the image, as well as your website appearing on http://localhost:4000/#!/ .

Final Result: gulpfile.js with code: https://pastebin.com/cg0uX3BD

1. Setup dependencies, file locations, error handler for our build tasks https://pastebin.com/p1PaWLae
    1. Import our needed dependencies https://pastebin.com/xVrtBR5P
    2. Write glob patterns to capture our JS files and HTML templates https://pastebin.com/exdV43TZ
    3. Write an error handler for our build tasks https://pastebin.com/hnw3Tmkx
1. Write 'browserify' task to bundle all our web assets into a browser-compatible JS file called main.js in the ./build/ folder https://pastebin.com/5AJ8bgsM
    1. First write 'views' task to bundle all our html templates into app.templates.js in ./src/js/config https://pastebin.com/zweA5Dp0
    2. Next write 'browserify' task which first invokes views to get the html templates into a JS file, then bundles all the JS into a browser-compatible file called main.js in ./build/ https://pastebin.com/0PZtw1Jn
1. Write 'default' task to serve our web assets to the browser. https://pastebin.com/bcYr3pxW
    1. Write 'html' task to move the browser entry point, index.html, into ./build/ https://pastebin.com/DJTkSrpj
    2. Write 'default' task to serve all our assets in ./build/ to the browser https://pastebin.com/EuvrAUqS.
    3. This is invoked in the command line by 'gulp' and is our development command.
1. Write 'build' task to create a distribution-ready build of our app. https://pastebin.com/5VSCEHEn
    1. This is invoked by 'gulp build'

After writing the above code, open up the VS Code terminal. Run 'gulp'. You should see the website appear in the browser at localhost:4000.