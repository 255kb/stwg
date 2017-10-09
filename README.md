# Super Tiny Website Generator

Super Tiny Website Generator is an old school super tiny website generator made with Gulp.

It can be used to generate small websites with simple pages and simple blogging structure.

It is NOT a fancy-hype-single-page-application-made-with-Webpack-React-and-Redux. But you can still add fancy JS to your pages if you want.

It has been designed with productivity in mind, to publish really quickly small websites. So, I throwed away all non necessary features: themes, plugins, etc.
But it is small, fast (of course), crawlable and easy to host on free static hosting services like Firebase (for more free static hosting providers you can have a look [here](https://github.com/255kb/stack-on-a-budget/blob/master/pages/static-app-hosting.md)).

*Table of contents:*

<!-- TOC depthFrom:2 -->

- [Features](#features)
- [How to use](#how-to-use)
- [Configuration](#configuration)
    - [Repository tree view](#repository-tree-view)
    - [Website folder tree view (*src*)](#website-folder-tree-view-src)
    - [Config files](#config-files)
    - [Main config file](#main-config-file)
    - [Pages](#pages)
        - [Pages config file](#pages-config-file)
        - [Languages](#languages)
        - [Folder and file naming conventions](#folder-and-file-naming-conventions)
    - [Templates](#templates)
    - [Partials](#partials)
    - [Assets](#assets)
    - [Styles](#styles)

<!-- /TOC -->

## Features

- 100% static website generation, no need for an expensive server/backend
- SEO super friendly, no server side rendering required
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
├── <b>lib</b>                # the generator itself written in JS (no change required)
├── <b>schemas</b>            # JSON configs schemas (no change required)
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

### Config files

Two JSON schemas are here to help you validate your config files.
- `main-config-schema.json` validating main config files
- `page-config-schema.json` validating pages config files

### Main config file

<pre>
{
  "domain": "http://localhost:8000",    // domain without trailing slash
  "defaultLanguage": "en",              // default language
  "showCanonicalUrl": true,             // add link canonical to page
  "showAlternatesUrls": true,           // show link alternate for i18n
  "addGoogleAnalytics": true,           // Add GA script
  "googleAnalyticsId": "your_ga_id"     // Your GA id
}
</pre>

### Pages

#### Pages config file

<pre>
{
  "languages": {
    "en": {
      // reserved keys
      "pageUrl": "a-page",
      "pageTitle": "English page title",
      "pageDesc": "English page description",

      // Any other key to be used in templates
      "customKey": "page content"
    },
    "fr": {
      // reserved keys
      "pageUrl": "une-page",
      "pageTitle": "Titre page français",
      "pageDesc": "Description page française",

      // Any other key to be used in templates
      "customKey": "contenu de la page"
    }
  }
}
</pre>

Routes will be created from folders paths. To override pages URLs you can use  `pageUrl` that will override the last folder name.

#### Languages

Pages can have multiple languages as shown above.
- Default language will be served at root of the website without prefix: **/about**, **/info**...
- Other languages will be served in subfolders used as prefixes: **/fr/a-propos**, **/fr/info**...
- If there is only a single language it will be used as the default one.

#### Folder and file naming conventions

- Each page has 2 files: `index.hbs` and a `config.json` file with some reserved keys and any other text you need.
- `config.json` and `index.hbs` files at the root of the `pages` folder will be used to generate the main `index.html` file (website entry).
- Each `pages` folder subfolder will be a page using subfolder name (or `pageUrl` param) as path.


### Templates

You can basically do whatever you want in the Handlebars templates.
There is currently one helper you can use: `text` which will load a translation key from the `config.json` file:

```html
{{text 'myKey'}}
```

### Partials

The `partials` folder currently has 2 partials, one for the header and one for the footer. You don't have to add anything there but feel free to create your own partials to be used in templates like this:

```html
{{> myPartial}}
```

### Assets

Whatever you put in the `src/assets` folder will be copied in the `www` folder. Therefore, files at the root of the `src/assets` folder will be at the root of the `www` folder and all other folders and files will be copied as is.

### Styles

Sass and Scss are currently supported. The `build.scss` is the entry point in the `src/style` folder. Starting from this file you can add wahtever content or file you want.
