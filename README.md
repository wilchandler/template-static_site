# Template for building HTML/(S)CSS/JS/PHP sites

Provides a basic directory structure and configurable build tasks with Gulp.  There are two branches, one with some libraries included (master) and one without (no-lib).

## Build Tasks (with Gulp)

Firstly, you will need to run `npm install` from the root directory to install the necessary gulp packages through node (you'll of course need node installed for this).  

Configuration for gulp can be adjusted in **gulpfile.js**.

#### Developing with CSS/Sass and JS

Run `gulp` to run both the *CSS* and *JS* tasks as well as start watches so that the tasks will re-run when changes are made to the relevant files.

`gulp js` will concatenate and minify all scripts whose paths are included in the *jsSrc* array in the gulp configuration. The concatenation will happen in the same order as the array, so make sure to place dependent scripts after their dependencies. The javascripts will then be placed in the 'js' directory. No watcher is included in this task.

`gulp css` will compile the SASS found in the file assigned to *cssSrc* in the gulp configuration ('css/dev/style.scss' by default). Other sass files should be imported into this file for compilation. The compiled CSS will then be minified and placed in the 'css' directory. No watcher is included in this task.

#### Building the site

First, make sure to add all files that will be necessary in the build to the *distFiles* array in the gulp configuration.

Second, run `gulp build` to generate the build files. This should copy all of the necessary files (the ones listed in *distFiles*) to the *buildDir* listed in the gulp configuration ('_build' by default, which is also gitignored by default). **This task includes deleting the current build directory and its contents, so I strongly suggest never making changes inside this directory.**