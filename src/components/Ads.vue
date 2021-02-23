<template>
  <slot :image="image" :image2="image2" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      image: "car.png",
      image2: "ad.jpg"
    };
  }
});
</script>
