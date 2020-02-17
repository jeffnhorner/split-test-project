# Take Split's New Driver Application

## Built primarily with love but also Vue.js

In order to get this project on your local machine, please fork the repository and then type the following command: `git clone REPO_URL` into a directory on your computer.
<br></br>
### Install Dependencies

Once you've successfully cloned the repository, within the directory where you've cloned the project, please run: `yarn install` to install necessary dependencies.
<br></br>
### Local Development

Now that the dependenices are installed, feel free to run `yarn develop` within the same directory. This will build a local  development server with hot reloading. The default URL is `http://localhost:8080`.
<br></br>
### Live Link

Hosted by Netlify: https://takesplit-become-a-driver.netlify.com/
<br></br>
### Technologies Used

**CSS Modules** - Replaces every local-scoped identifier (i.e. className) with a global unique name. https://github.com/css-modules/css-modules \
**Gridsome** - Lightweight, fast, and static (or SSR) Vue.js framework. https://gridsome.org/ \
**Firebase** - Firebase allows us to store and sync data between users and devices via the cloud https://firebase.google.com/ \
**Netlify** - For incredible CI/CD project hosting https://www.netlify.com/ \
**Vuex** - State management for Vue.js. https://vuex.vuejs.org/ \
**Vuelidate** - Simple and lightweight model-based validation for Vue.js. https://vuelidate.js.org/ \
**Vuetify** - Vue UI library with reusable (Material Design) Vue.js. components https://vuetifyjs.com/ \
**Vue MQ** - Gives you the ability to define media queries with Javascript. https://github.com/AlexandreBonaventure/vue-mq \
**Webpack** - A static module bundler for modern Javascript. https://webpack.js.org/ \
<br></br>
### What You Can expect in this Application:
- Entire UI built
- Validation on All required (*) fields
- Fully functional File Uploader with files being stored on a Firebase cloud-hosted, NoSQL db
- Payload ready to be sent to backend API (see notes below on how to check the payload)
<br></br>
### View the Payload
In order to view the payload that will be ready for the backend, on the last step where the user is told they've completed the driver application, after you click the submit button, please open up the console and view the Object that is printed out. Keep in mind, if there is an existing API in place, we can update the key names, update the data type we're sending, or, we could even send the data at each phase of the application (not sure we want to, but, we can).
