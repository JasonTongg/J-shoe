<template>
  <div class="container">
    <form @submit.prevent="updateItem">
      <h2>Update Item</h2>
      <p>New Shoe take you Good Place!</p>
      <div class="inputContainer">
        <label for="title">Title</label>
        <input
          type="text"
          :placeholder="shoe.title"
          id="title"
          v-model="shoe.title"
        />
      </div>
      <div class="inputContainer">
        <label for="price">Price</label>
        <input
          type="text"
          :placeholder="shoe.price"
          id="price"
          v-model="shoe.price"
        />
      </div>
      <div class="inputContainer">
        <label for="file">Image Link</label>
        <input
          type="text"
          id="file"
          :placeholder="shoe.image"
          v-model="shoe.image"
        />
      </div>
      <button type="submit">Submit</button>
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
  middleware: ["check-auth", "auth"],
  methods: {
    updateItem() {
      this.$store
        .dispatch("updateShoe", {
          id: this.shoe.id,
          newShoe: { ...this.shoe },
        })
        .then(() => this.$router.push("/"));
    },
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
  text-align: center;
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

@media only screen and (max-width: 600px) {
  form h2 {
    font-size: 40px;
  }
}

@media only screen and (max-width: 500px) {
  form button {
    width: 100%;
  }
  form input {
    width: calc(100vw - 2rem);
  }
}

@media only screen and (max-width: 350px) {
  form h2 {
    font-size: 30px;
  }
}
</style>
