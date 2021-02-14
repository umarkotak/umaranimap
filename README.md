# UMARANIAMP

---

## React Notes

### Preparation Process

1. Create react app on current directory

```
npm install
npx create-react-app my-app
npm install react-router-dom
```

2. Build app

```
npm build
```

3. Start app

```
npm start
```

4. Run test

```
npm test
```

### Deploy Heroku

```
git push -f heroku master
```

### Update Manga Chapter

```
ruby refresh.rb
git commit -m "update manga chapter"
git push heroku master
```

### Learning Process

### Good Read

1. [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145)
2. [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
3. [React documentation](https://reactjs.org/)
4. [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
5. [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
6. [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
7. [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
8. [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
9. [React Setup](https://stackoverflow.com/questions/45853530/npm-install-error-not-foundram-files-nodejs-npm-3-mnt-c-program-files-nodejs)
10. [Svelte](https://svelte.dev/)
11. [Sapper](https://sapper.svelte.dev/)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

--- HEROKU

heroku repo:gc --app your-app-name
heroku repo:purge_cache --app your-app-name