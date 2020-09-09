### Install
Clone this repo:
```
git clone https://github.com/icerockdev/delivery-landing
```

Install dependencies:
```
yarn
```

### Developing
Run ```yarn start``` and edit templates, using [Handlebars](https://handlebarsjs.com/guide/ "Handlebars") template syntax.
Don't forget to run ```yarn build``` before commiting changes, so they will appear on deploy.

### Building
Run ```yarn build``` and copy build folder to deploy.

### Translating
Wrap russian sentences with `{{i18n "Sentence here"}}` and edit add `locales/en.js with it`. 

Run `LANG=en yarn start` to develop english version.

Build process at package.json produces both `russian` and `english` versions at `./docs/` 
