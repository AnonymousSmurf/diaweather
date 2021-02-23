<template>
  <nav>
    <h1>Diaweather</h1>
    <Base />
    <h4>{{ $t("author") }} Laurens&nbsp;Tobias</h4>
  </nav>
  <Weather />
</template>

<script>
import { provide, reactive } from "vue";
import Base from "./components/Base.vue";
import Weather from "./components/Weather.vue";

export default {
  name: "App",
  components: {
    Weather,
    Base
  },
  setup() {
    provide("wachtijd", reactive(5000));
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  margin: 0;
}

#app {
  font-family: "Roboto", sans-serif;
}
</style>

<style scoped>
h1,
h4 {
  margin: 0;
  color: white;
  padding: 10px;
}

nav {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #003764;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

nav > h1,
h4 {
  flex: 1;
  display: flex;
  min-width: -webkit-min-content;
}

nav > h4 {
  justify-content: flex-end;
}

@media only screen and (max-width: 632px) {
  nav {
    flex-direction: column !important;
    height: unset;
  }

  nav > h1,
  h4 {
    flex: unset !important;
    display: flex !important;
    min-width: -webkit-min-content !important;
  }

  nav > h4 {
    justify-content: unset !important;
  }
}
</style>
