const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const merge = require('merge-stream');
const gulp = require('gulp');
const concat = require('gulp-concat');
const ncp = require('ncp').ncp;
const sass = require('gulp-sass');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const webserver = require('gulp-webserver');

const utils = require('./utils');
const config = require('./config');
const handlebarsOptions = require('./handlebarsOptions');

/**
 * WIP recursivity working
 *
 * TODO :
 * - allow url override for translation
 */



/**
 * Page compilation task
 */
const pagesCompile = () => {
  // load main config
  const mainSiteConfig = utils.readJSONSync(config.sourcePath + 'main_config.json');

  // parse all configured pages (subdirectories + "." for index page)
  const pages = [];
  utils.readDirectories(config.pagesPath, pages);
  // add index page
  pages.push('.');

  let sitemapData = {
    sitemapMultiLanguagesUrls: [],
    sitemapUrls: []
  };

  // create a task for each page
  let pagesTasks = pages.map((pageName) => {
    let pageConfig = utils.readJSONSync(config.pagesPath + pageName + '/config.json');
    let pageLanguages = Object.keys(pageConfig.languages);
    let languageCompilationTasks = [];

    // if page has multiple languages
    if (pageLanguages.length > 1) {
      let multiLanguagesUrls = [];

      pageLanguages.forEach((pageLanguage) => {
        let langPrefix = (pageLanguage === mainSiteConfig.defaultLanguage) ? '' : '/' + pageLanguage;
        let pageSuffix = (pageName === '.') ? '' : '/' + pageName;

        //add url to sitemapData
        multiLanguagesUrls.push({
          lang: pageLanguage,
          url: `${mainSiteConfig.domain}${langPrefix}${pageSuffix}`,
          isDefaultLang: pageLanguage === mainSiteConfig.defaultLanguage
        });

        //build alternate languages urls array (for link rel=alternate)
        let linkAlternate = pageLanguages.map((altLanguage) => {
          return {
            lang: altLanguage,
            url: `${mainSiteConfig.domain}${(altLanguage === mainSiteConfig.defaultLanguage) ? '' : '/' + altLanguage}${pageSuffix}`
          };
        });

        let pageData = {
          mainSiteConfig,
          currentLang: pageLanguage,
          linkAlternate,
          currentAbsoluteUrl: `${mainSiteConfig.domain}${langPrefix}${pageSuffix}`,
          texts: pageConfig.languages[pageLanguage]
        };

        let gulpTask = gulp.src(config.pagesPath + pageName + '/*.hbs')
          .pipe(handlebars(pageData, handlebarsOptions))
          .pipe(rename('index.html'))
          .pipe(gulp.dest(config.buildPath + langPrefix + pageSuffix));

        languageCompilationTasks.push(gulpTask);
      });

      //add page urls language array
      sitemapData.sitemapMultiLanguagesUrls.push({ multiLanguagesUrls });

      return languageCompilationTasks;
    } else {
      //get current page single language
      let pageLanguage = pageLanguages[0] || mainSiteConfig.defaultLanguage;
      let langPrefix = (pageLanguage === mainSiteConfig.defaultLanguage) ? '' : '/' + pageLanguage;
      let pageSuffix = (pageName === '.') ? '' : '/' + pageName;

      //create page url, if root index no page name
      let pageUrl = (pageName === '.') ? mainSiteConfig.domain : `${mainSiteConfig.domain}${langPrefix}${pageSuffix}`;

      //add url to sitemapData
      sitemapData.sitemapUrls.push({ url: pageUrl });

      let pageData = {
        mainSiteConfig,
        currentLang: pageLanguage,
        currentAbsoluteUrl: pageUrl,
        texts: pageConfig.languages[pageLanguage]
      };

      return (gulp.src(config.pagesPath + pageName + '/*.hbs')
        .pipe(handlebars(pageData, handlebarsOptions))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(config.buildPath + langPrefix + pageSuffix)));
    }
  });

  //create sitemap build task
  let sitemapTask = (gulp.src(`${config.sourcePath}partials/sitemap.hbs`)
    .pipe(handlebars(sitemapData, handlebarsOptions))
    .pipe(rename('sitemap.xml'))
    .pipe(gulp.dest(config.buildPath)));

  return merge(pagesTasks, sitemapTask);
};

/**
 * Sass compilation task
 */
let sassCompile = () => {
  return gulp.src([config.sourcePath + 'style/build.scss'])
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.buildPath + 'css'));
};

/**
 * Static file copy task
 */
let staticCopy = () => {
  ncp(config.assetsPath, config.buildPath, (error) => {
    if (error) {
      return console.error(error);
    }
  });
};


/**
 *
 * Gulp tasks declaration
 *
 */
gulp.task('compile', () => {
  //clean existing files before compiling
  rimraf(config.buildPath, () => {
    pagesCompile();
    sassCompile();
    staticCopy();
  });
})

gulp.task('webserver', () => {
  gulp.src(config.buildPath)
    .pipe(webserver({
      //livereload: true,
      open: true
    }));
})

gulp.task('watch', ['compile'], () => {
  gulp.watch([
    config.sourcePath + '**/*.hbs',
    config.sourcePath + '**/*.json',
    config.assetsPath + '**/*.*',
    config.sourcePath + '**/*.scss',
    config.sourcePath + '**/*.sass'
  ], ['compile']);
  gulp.start('webserver');
});
