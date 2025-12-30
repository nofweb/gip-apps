// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueTablerIcons from "vue-tabler-icons";
import "@/assets/scss/style.scss";
import { BLUE_THEME } from "@/theme/LightTheme";
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "BLUE_THEME",
      themes: {
        BLUE_THEME,
      },
    },
    defaults: {
      VCard: {
        rounded: "md",
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
        rounded: "md",
      },
      VTextarea: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
        rounded: "md",
      },
      VSelect: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
        rounded: "md",
      },
      VListItem: {
        minHeight: "45px",
      },
      VTooltip: {
        location: "top",
      },
    },
  });
  app.vueApp.use(vuetify);
  app.vueApp.use(PerfectScrollbar);
  app.vueApp.use(VueTablerIcons);
});
