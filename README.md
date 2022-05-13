# frontend

## Project setup
Make sure to install while running terminal in admin mode.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


# Code structure
Don't worry about anything outside of the src folder. Everything important that needs to be edited can be found in src. 

Each HTML page that is visible on your screen has a corresponding .vue file in the components folder. Each .vue file has a standard structure, that is defined as follows (it is advised you look at the code while going through this description):
- An HTML description of the page design inside ```<template></template>``` brackets. In this HTML description you can write regular HTML code, but you can also use Vue components. For example the ```<TabMenu></TabMenu>``` in Navbar.vue defines the navigation bar, for which the TabMenu (which is added with app.component('Tabmenu', TabMenu) in main.ts) is a template Vue exported style we now use in the template HTML code. For design, you can find these template components at `https://www.primefaces.org/primevue/` (don't forget to import the component in the main function if you haven't already!). 
- All functions and variables that are used in the ```<template></template>``` blocks are the defined in an exported definedComponent() object that returns a dictionary with a name for the component, and a setup object for the variables and functions used in the HTML code. Each function and variable that is used in the HTML code should be returned in the return block at the end of the setup() definition. 

Navigating the frontend will be based on understanding the structure of these .vue files and the linked/imported functions. Here are some descriptions of the most important .ts files:
- main.ts covers all the setup with regards to templates used (such as the TabMenu vue template), activating and defining components of the app that are created in main.ts. From here, Vue activates. 
- backend.api.ts defines all functions for communication with the backend. The first 2 functions are functions to handle HTTP requests. All remaining functions are simply examples of HTTP post and get requests that you can duplicate and modify for your specific implementation. You'll find many uses for these functions in Audio.vue. 
- router.ts is the exported const that's responsible for navigating the website using the Navbar.vue. If you add a page, you need to add its name and new route here to make it accessible. 


# Bugfixes
If the terminal shows an error involving firebase or firestore and any hint that it cannot find these modules, run the following line in your terminal:
```
npm install firebase
```
and try running the frontend again. 
