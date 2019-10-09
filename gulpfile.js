const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();

// Compile scss into css
let styleSRC = "./dev/scss/index.scss";
let styleDest = "./dest/css";
function style() {
  return gulp
    .src(styleSRC)
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(styleDest))
    .pipe(browserSync.stream());
}

let scriptSRC = "./dev/js/**/*.js";
let scriptDest = "./dest/js/";

function script() {
  return gulp
    .src(scriptSRC)
    .pipe(plumber())
    .pipe(concat("script.js"))
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: true
            }
          ]
        ]
      })
    )
    .pipe(gulp.dest(scriptDest))
    .pipe(browserSync.stream());
}

// function jsDeps

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./dev/scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./dev/js/**/*.js").on("change", script);
}

exports.watch = watch;
exports.style = style;
exports.script = script;
