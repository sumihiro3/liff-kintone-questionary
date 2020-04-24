# liff-kintone-questionary

> My brilliant Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Create NuxtJS app

### Create app with create-nuxt-app command

```bash
npx create-nuxt-app

create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in .
? Project name liff-kintone-questionary
? Project description My brilliant Nuxt.js project
? Author name sumihiro3
? Choose programming language JavaScript
? Choose the package manager Yarn
? Choose UI framework Vuetify.js
? Choose custom server framework Express
? Choose Nuxt.js modules Axios, Progressive Web App (PWA) Support, DotEnv
? Choose linting tools ESLint, Prettier
? Choose test framework None
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)
yarn run v1.22.4
$ eslint --ext .js,.vue --ignore-path .gitignore . --fix
✨  Done in 2.78s.

🎉  Successfully created project liff-kintone-questionary

  To get started:

	yarn dev

  To build & start for production:

	yarn build
	yarn start
```

### run!

```bash
yarn dev
```

and access to `http://localhost:3000` on your browser


## Heroku settings

### Create app

```bash
heroku create liff-kintone-questionary
Creating ⬢ liff-kintone-questionary... done
https://liff-kintone-questionary.herokuapp.com/ | https://git.heroku.com/liff-kintone-questionary.git
```

### Configure heroku

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
```

Add app settings

```bash
heroku config:set USE_VCONSOLE=true
heroku config:set SKIP_LOGIN=true
heroku config:set LIFF_ID=XXXXXX-XXXXXX
```


```bash
heroku buildpacks:set heroku/nodejs
Buildpack set. Next release on liff-kintone-questionary will use heroku/nodejs.
Run git push heroku master to create a new release using this buildpack.
```

```bash
heroku config:set API_URL=$(heroku info -s | grep web_url | cut -d= -f2)
```

```bash
heroku plugins:install heroku-config
Installing plugin heroku-config... installed v1.5.4

heroku config:push
Successfully wrote settings to Heroku!
```

Deploy to heroku

```bash
git push heroku master
```
