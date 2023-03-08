<template>
  <div class="container">
    <div class="content">
      <nuxt />
    </div>

    <h1 style="display: none">Your device is not support</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    if (window.innerWidth < 300) {
      document.querySelector("h1").style.display = "block";
      document.querySelector(".content").style.display = "none";
    } else {
      document.querySelector("h1").style.display = "none";
      document.querySelector(".content").style.display = "block";
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 300) {
        document.querySelector("h1").style.display = "block";
        document.querySelector(".content").style.display = "none";
      } else {
        document.querySelector("h1").style.display = "none";
        document.querySelector(".content").style.display = "block";
      }
    });
  },
};
</script>
<style>
.container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
}
.content {
  width: 100%;
}
</style>
