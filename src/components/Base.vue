<template>
  <div class="base-container">
    <form @submit.prevent="base64()">
      <input type="text" ref="my_input" required />
      <button>Encode</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Base",
  methods: {
    base64() {
      const input = this.$refs.my_input.value;
      this.$refs.my_input.value = "";
      alert(window.atob(input));
    }
  }
});
</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  border: #fff 2px solid;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 46px;
  padding: 0 10px;
  font-size: 20px;
}

input:focus {
  outline: none;
}

button {
  border: 2px solid #fff;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-left: none !important;
  height: 50px;
  padding: 0 10px;
  background: #003764;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

button:focus {
  outline: none;
}

@media only screen and (max-width: 362px) {
  input {
    width: 200px !important;
  }
}
</style>
