<template>
  <div class="container">
    <form>
      <h2>Update Item</h2>
      <p>New Shoe take you Good Place!</p>
      <div class="inputContainer">
        <label for="title">Title</label>
        <input
          type="text"
          :placeholder="shoe.name"
          id="title"
          v-model="shoe.name"
        />
      </div>
      <div class="inputContainer">
        <label for="price">Price</label>
        <input
          type="text"
          :placeholder="shoe.name"
          id="price"
          v-model="shoe.price"
        />
      </div>
      <div class="inputContainer">
        <label for="file">Image Link</label>
        <input
          type="text"
          id="file"
          :placeholder="shoe.name"
          v-model="shoe.image"
        />
      </div>
      <button>Submit</button>
    </form>
    <nuxtLink class="back" to="/">Back</nuxtLink>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shoe: this.$route.query.shoes,
    };
  },
};
</script>
<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lexend Deca", sans-serif;
  background: url("../../static/assets/star-white.png"), #093545;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

form > * {
  padding: 0;
  margin: 0;
}

form h2 {
  font-size: 64px;
}

form input,
form button {
  padding: 12px 21px;
  color: white;
  border: none;
  outline: none;
  border-radius: 10px;
  width: 500px;
  background-color: #224957;
  box-sizing: border-box;
}

button {
  background-color: #20df7f !important;
  color: black !important;
}

form input::placeholder {
  color: white;
}

a {
  color: black;
  text-decoration: none;
}

.back {
  position: absolute;
  top: 5%;
  left: 5%;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background-color: #224957 !important;
  color: white !important;
  border-radius: 100px;
  cursor: pointer;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
}
</style>
