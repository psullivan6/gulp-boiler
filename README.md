# gulp-boiler

Boilerplate code for [gulp](http://gulpjs.com/)


===

# Dependencies

## Tools / Software
*stuff you need to INSTALL before any of this will work*

**required** | **optional**
-------------| ------------
[Git](http://git-scm.com/) &hellip; duh, kinda | [EditorConfig](http://editorconfig.org/) and editor/IDE [plugin download](http://editorconfig.org/#download)
[Node](http://nodejs.org/), specifically [npm](https://docs.npmjs.com/getting-started/installing-node) |
[Gulp](http://gulpjs.com/) &hellip; also duh |
[Bower](http://bower.io/#install-bower) |

### Tools / Software Install Directions + Docs

#### Gulp

**[Docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)**

**Install Command:**  
`$ sudo npm install -g gulp` - best to use `sudo` right off the bat to make sure it's installed errywhere

---

## Plugins

### [Gulp Plugins](http://gulpjs.com/plugins/)

[`var gulp = require('gulp');`](http://gruntjs.com/getting-started#installing-grunt-and-gruntplugins)



[`"grunt-autoprefixer": "^2.1.0",`](https://www.npmjs.com/package/gulp-autoprefixer/)
[`"grunt-contrib-clean": "^0.6.0",`](https://www.npmjs.com/package/grunt-contrib-clean)
[`"grunt-contrib-copy": "^0.7.0",`](https://www.npmjs.com/package/grunt-contrib-copy)
[`"grunt-contrib-jshint": "^0.10.0",`](https://npmjs.org/package/grunt-contrib-jshint)
[`"grunt-contrib-sass": "^0.8.1",`](https://npmjs.org/package/grunt-contrib-sass)
[`"grunt-contrib-uglify": "^0.7.0",`](https://npmjs.org/package/grunt-contrib-uglify)
[`"grunt-contrib-watch": "^0.6.1",`](https://npmjs.org/package/grunt-contrib-watch)
[`"grunt-includes": "^0.4.5",`](https://npmjs.org/package/grunt-includes)
[`"jshint-stylish": "^1.0.0"`](https://github.com/sindresorhus/jshint-stylish)

### [Bower](http://bower.io/search/)
[`"modernizr": "~2.8.3"`](https://github.com/Modernizr/Modernizr)

---

# Namespacing

## Directories

### `/build`
The root-level build directory that houses all the important code that
eventually compiles into the finished site in the `/dist` directory

#### `/build/scripts`
The `/build` level directory that houses all javascripts,
coffeescripts, and other cupo'joescripts.

#### `/build/styles`
The `/build` level directory that houses all stylesheets, with
the preference being that they are SASS.

### `/dist`
The root-level 'dist' or 'distribution' directory that houses all the final
files. This directory can be pushed directly to a git remote, s3 bucket, or
whatever location is desired for final delivery to the user.

---


# Run Locally
***stuff you need to DO before any of this will work***

1. Navigate to the `/build` directory: `$ cd build/`
1. Install all the *node* package dependencies: `$ npm install`
1. Install all the *bower* package dependencies: `$ bower install`
1. Run the gulp task that corresponds to your need:
    * `$ gulp` - default task will start the server and watch for file changes
    * `$ gulp build` - default build task will compile all the files
    * etc...


## Chrome Dev Tools `gulp` tasks:
**As per [`gulp-devtools`](https://github.com/niki4810/gulp-devtools) instructions (revised for this exact project):**

1. Download the [Gulp devtools extension](https://chrome.google.com/webstore/detail/gulp-devtools/ojpmgjhofceebfifeajnjojpokebkkji) for Chrome Developer Tools from the Chrome Web Store.  
1. *Steps that have already been completed (see below)  
1. Run the `gulp-devtools` Terminal command in the `build` directory  
1. Open Chrome Dev tools, find the Gulp tab. Your gulp tasks should now be accessible from Chrome.  

****Steps that have already been completed on this repo:***

1. If not already installed, run `npm install -g gulp-devtools` to install `gulp-devtools` globally  
1. Export gulp from your `gulpfile.js` by adding `module.exports = gulp;`  


# To-Do

- [ ] Directory and file structure
- [ ] Try out a directory structure where `$ gulp` is run at root level
- [ ] Consolidate `$ gulp clean`, `$ gulp build`, and `$ gulp server`
- [ ] Correctly log stream errors
- [ ] Watch all files, not just HTML ... currently SCSS doesn't re-compile
- [ ] Run server on `$ gulp` command and then have a separate build
- [ ] Add a release or some other build flag
- [ ] Add ability to inject custom code into default head template or footer template (for example: the styleguide page vs. the contact page ... one is internal eyes only)

