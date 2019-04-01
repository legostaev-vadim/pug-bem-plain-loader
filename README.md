# pug-bem-plain-loader

**Pug** that adds **BEM** shortcuts to plain html loader for **webpack**

**pug-bem-plain-loader** is a combination of [pug-plain-loader](https://www.npmjs.com/package/pug-plain-loader) and [pug-bem](https://www.npmjs.com/package/pug-bem) plugins

- **[BEM](https://en.bem.info/methodology/quick-start/)**

# New! v1.1.0

Now you can specify your own prefixes for blocks in the **b** property:

```js
loaders: {
  'pug': {
    loader: 'pug-bem-plain-loader',
    options: {
      b: 'my-' // block prefix
    }
  }
}
```

**or**

```js
loaders: {
  'pug': {
    loader: 'pug-bem-plain-loader',
    options: {
      b: true // default 'b-'
    }
  }
}
```

- **[More](https://www.npmjs.com/package/pug-bem)**

# Install

```
npm install pug pug-bem-plain-loader --save-dev
```

## Usage

Settings match [pug-plain-loader](https://www.npmjs.com/package/pug-plain-loader) and [pug-bem](https://www.npmjs.com/package/pug-bem)

## Example for Vue Single-File Components

### webpack.config.js

```js
module: {
    rules: [
      ... // other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // this applies to <template lang="pug"> in Vue components
            'pug': [
              'pug-bem-plain-loader'
            ]
          }
        }
      }
      ... // other rules
    ]
  }
```

**or**

```js
module: {
    rules: [
      ... // other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // this applies to <template lang="pug"> in Vue components
            'pug': {
              loader: 'pug-bem-plain-loader',
              options: {
                e: '**', // element separator, default: __
                m: '++'  // modifier separator, default: --
              }
            }
          }
        }
      }
      ... // other rules
    ]
  }
```

- **[Options](https://pugjs.org/api/reference.html)**

### App.vue

```pug
<template lang="pug">
    header.header
        nav.menu
            a(href="#")._logo Company
            .list
                a._item.-active(href="#") Home
                a._item(href="#") News
                a._item(href="#") Gallery
                a._item(href="#") Partners
                a._item(href="#") About
                a._item(href="#") Contacts
        h1._title Hello, World!
        .myslider._myslider
            ._slide Content
            ._slide.-active Content
            ._slide Content
        p._text Good weather
</template>
```

### Result

```html
<header class="header">
    <nav class="menu">
        <a class="menu__logo" href="#">Company</a>
        <div class="list">
            <a class="list__item list__item--active" href="#">Home</a>
            <a class="list__item" href="#">News</a>
            <a class="list__item" href="#">Gallery</a>
            <a class="list__item" href="#">Partners</a>
            <a class="list__item" href="#">About</a>
            <a class="list__item" href="#">Contacts</a>
        </div>
    </nav>
    <h1 class="header__title">Hello, World!</h1>
    <div class="myslider header__myslider">
        <div class="myslider__slide">Content</div>
        <div class="myslider__slide myslider__slide--active">Content</div>
        <div class="myslider__slide">Content</div>
    </div>
    <p class="header__text">Good weather</p>
</header>
```

## License

ISC License

## Author

Legostaev Vadim (*legostaev.vadim@mail.ru*)
