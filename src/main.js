import "./assets/main.css";
import "./assets/index.css";

import { createApp } from "vue";

import App from "./CategoryTree/App.vue";
import Property from "./CategoryTree/components/Property.vue";

const app = createApp(App);

app.component("Property", Property);

app.mount("#app");
