<template>
  <div class="container">
    <img src="../static/assets/Vectors-2.png" alt="vector" />
    <form @submit.prevent="register">
      <h2>Sign Up</h2>
      <p>Sign in and start managing your candidates!</p>
      <input type="text" placeholder="Username" v-model="userName" />
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <button>Register</button>
      <p>Already have account? <nuxt-link to="/login">Login</nuxt-link></p>
    </form>
    <nuxtLink class="back" to="/">Back</nuxtLink>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert("password not match");
        return;
      }
      this.$store.dispatch("authenticateUser", {
        email: this.email,
        password: this.password,
        isLogin: false,
        userName: this.userName,
      });
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.container {
  background-color: #093545;
  position: relative;
  min-height: 100vh;
  /* min-width: 100vw; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
}
img {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
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
  width: 300px;
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
  color: white;
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

@media only screen and (max-width: 400px) {
  form h2 {
    font-size: 40px;
  }
}

@media only screen and (max-width: 350px) {
  form button {
    width: 100%;
  }
  form input {
    width: calc(100vw - 2rem);
  }
}

@media only screen and (max-width: 300px) {
  form h2 {
    font-size: 30px;
  }
}
</style>
