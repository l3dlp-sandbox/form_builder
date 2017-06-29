# Dsbuilder Library

### Demo

[Builder](http://builder.diegosarmiento.com/)

### Explanation

This is an early version of a library that has been developed using vanilla JavaScript and bootstrap 4. The idea is that you could create forms by just pushing some buttons. So far it doesn't have input validations and automated tests, but it will in the future.

There is no need to run a server. Just drag the index file in a browser (Firefox or Chrome is highly recommended) and the app should be able to run by itself.

The index file already includes dependencies such as Bootstrap.

* Version 4 of Bootstrap [Bootstrap](https://v4-alpha.getbootstrap.com/).
* Version 3 of JQuery is included but not used [JQuery](https://www.google.com/search?q=jquery+version+3&ie=utf-8&oe=utf-8).

### Quick start

```
# Just drag the index.html file into the browser

```

# Table of Contents

* [Getting Started](#getting-started)
* [Methods Available](#methods-available)
* [Frequently asked questions](#faq)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* Bootstrap 4 (included in index.html file)
* Chrome or Firefox (Use version [50.0.3](https://www.mozilla.org))

## Software Architecture

#### This library was built having in mind:

* Code won't interfere with your own (IIFE principle).
* Reusable and readable.
* Easy to scale.

## Methods Available

* addTitle(title)
* addInput(type, value, options)
* addOptions(options)
* savedOptions(element)
* deleteOptions(id, option, button)
* editText()
* deleteInput(id, option, parent, type)
* deleteInput(id, option, parent, type)
* deleteItem(id, option, parent, type)
* deleteArea(id, option, parent, type)
* deleteTitle(id, option, parent, type)
* deleteAll()

# FAQ

#### Do I need to add script / link tags into index.html ?

No, this repo already has all its dependencies (You can add your own code in the `app.js` file).

#### How to include new sections ?

You are ready to go for a Single Page Application (just add the JavaScript code in the `app.js` file). For a bigger app keep the focus on small and reusable components that could be included in the `js` folder. Another option is using `React` or `AngularJS`.

# License

[MIT](/LICENSE)
