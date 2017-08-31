# Super Tiny Website Generator

Super Tiny Website Generator is an old school super tiny website generator made with Gulp.

It can be used to generate small websites with simple pages and simple blogging structure.

It is NOT a fancy-hype-single-page-application-made-with-React-and-Redux. You can still add fancy JS to your pages if you want.

It has been designed with productivity in mind, to publish really quickly small websites. So, I throwed away all non necessary features: themes, plugins, etc.
But it is small, fast (of course), crawlable and easy to host on free static hosting services like Firebase (for more free static hosting providers you can have a look [here](https://github.com/255kb/stack-on-a-budget/blob/master/pages/static-app-hosting.md)).

*Table of contents:*

<!-- TOC depthFrom:2 -->

- [Features](#features)
- [How to use](#how-to-use)
- [Configuration](#configuration)
    - [Repository tree view](#repository-tree-view)
    - [Website folder tree view (*src*)](#website-folder-tree-view-src)
    - [Main config file](#main-config-file)
    - [Pages](#pages)
        - [Languages](#languages)
        - [Folder and file naming conventions](#folder-and-file-naming-conventions)
        - [Config files](#config-files)
        - [Templates](#templates)
        - [Partials](#partials)
    - [Assets](#assets)
    - [Styles](#styles)

<!-- /TOC -->

## Features

- 100% static website generation, no need for an expensive server/backend, SEO super friendly
- multi languages support
- folder recursivity support (for blogging)
- basic templating system (using Handlebars)
- assets copying
- SASS/SCSS support
- easy to use! (no fancy configuration nor theme syntax to learn)
- minimalist (yes it's a feature!)

## How to use

1. Clone this repository

```
git clone git@github.com:255kb/stwg.git
```

2. Edit/add files in **src** folder (see configuration details below)
3. Compile your website with `npm run build|watch`
4. Publish!

## Configuration

This website generator is following some folders/files naming conventions which are important to have a successful build.

### Repository tree view

<pre>
.
├── <b>lib</b>                # the generator itself written in JS
├── <b>src</b>                # your website files and configs (<a href="#website-folder-src">see below</a>)
└── <b>www</b>                # build output folder (the website to publish)
</pre>

### Website folder tree view (*src*)

<pre>
.
├── <b>main-config.json</b>             # your website's main config
│
├── <b>assets</b>                       # where to put all your assets (see below)
│
├── <b>partials</b>                     # Handlebars partials folder
│   ├── <b>footer.hbs</b>               # Handlebars partial for footer
│   └── <b>header.hbs</b>               # Handlebars partial for header
│
├── <b>templates</b>                    # specific templates folder
│   └── <b>sitemap.hbs</b>              # Handlebars template for sitemap
│
├── <b>styles</b>                       # where to put all your styles (see below)
│   ├── <b>build.scss</b>               # main SCSS build file (see Styles section)
│   └── <i>other-file.scss</i>          # add any other file you want and simply import it in build.scss
│
└── <b>pages</b>                        # folder to put all your pages (see below)
    ├── <i>a-page</i>                   # a page at the root of your website "/a-page"
    │   ├── <b>config.json</b>          # config file for this page (see below)
    │   └── <b>index.hbs</b>            # Handlebars template for this file (see below)
    │
    ├── <i>another-page</i>             # another page at the root of your website "/another-page"
    │   ├── <b>config.json</b>
    │   └── <b>index.hbs</b>
    │
    └── <i>blog</i>                     # an article in a deep folder "/blog/2017/01/article"
        └── <i>2017</i>
            └── <i>01</i>
                └── <i>article</i>
                    ├── <b>config.json</b>
                    └── <b>index.hbs</b>
</pre>

**bold** folder and file names are reserved
**italic** folder and file names are user's own

### Main config file

main config :
//domain without the trailing slash

  "domain": "http://localhost:8000",
  "defaultLanguage": "en",
  "showCanonicalUrl": true,
  "showAlternatesUrls": true,
  "addGoogleAnalytics": true,
  "googleAnalyticsId": "your_ga_id"

### Pages

src folder : where you put everything

#### Languages

pages can have different languages, one with fr, the other with fr and en

if multi language default will be at root of folder
if single language must / will be default
but root page of the default language is required

#### Folder and file naming conventions

pages :
- root = index
- folder = page name
each page / index has 3 files : template hbs, config with mainly languages array, and texts with languages corresponding

#### Config files

Two JSON schemas are here to help you validate your config files

#### Templates

hbs : text helper
{{text ''}}

#### Partials

partials : probably nothing to change or just add your partials

### Assets

root will be put in www root, other folders arborescence will be kept

### Styles

scss
 build.scss is entry point in style folder, do whatever you want, add files, folders, and simply import files in build.scss like this:

 ```scss
// Imports
@import "variables.scss";
@import "normalize.scss";
@import "style.scss";
 ```
