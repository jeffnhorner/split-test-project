// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

const options = {
    theme: {
        dark: false,
    }
};

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuetify);
  Vue.component('Layout', DefaultLayout);
  appOptions.vuetify = new Vuetify(options);
}
