<template>
  <header>
    <nav>
      <nuxtLink tag="h2" to="/">Shoes <span>Collections</span></nuxtLink>
      <ul>
        <li>Home</li>
        <li>Collections</li>
        <li>Sale</li>
        <li>
          Cart
          <img src="../static/assets/icon/cart.svg" alt="cart" />
        </li>
        <nuxtLink tag="li" to="/admin" v-if="userData.userName">{{
          userData.userName
        }}</nuxtLink>
        <li v-if="userData.userName" @click="logout">Logout</li>
        <nuxtLink tag="li" to="/login" v-else>Login</nuxtLink>
      </ul>
      <div @click="toggleNavbar" class="menuNavbar">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="burgerMenu">
        <ul>
          <li>Home</li>
          <li>Collections</li>
          <li>Sale</li>
          <li>
            Cart
            <img src="../static/assets/icon/cart.svg" alt="cart" />
          </li>
          <nuxtLink tag="li" to="/admin" v-if="userData.userName">{{
            userData.userName
          }}</nuxtLink>
          <li v-if="userData.userName" @click="logout">Logout</li>
          <nuxtLink tag="li" to="/login" v-else>Login</nuxtLink>
        </ul>
      </div>
      <div class="background"></div>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    userData() {
      return this.$store.getters.getUserData;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("userLogout");
      this.cart = [];
    },
    toggleNavbar() {
      document.querySelector(".burgerMenu").classList.toggle("closes");
      document.querySelector(".background").classList.toggle("closes");
      document.querySelector(".menuNavbar").classList.toggle("closes");
    },
  },
};
</script>
<style scoped>
.burgerMenu {
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  transform: translateX(-100px);
  opacity: 0;
  transition: all 0.5s linear;
  visibility: hidden;
}

.burgerMenu.closes {
  transform: translateX(0px);
  opacity: 1;
  visibility: visible;
}

.menuNavbar {
  z-index: 2000;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  display: none;
}

.menuNavbar > div {
  width: 100%;
  height: 5px;
  background-color: white;
  transition: all 0.5s;
}

.menuNavbar.closes div:nth-of-type(2) {
  visibility: hidden;
  opacity: 0;
}

.menuNavbar.closes div:first-of-type {
  transform: rotate(45deg);
  transform-origin: left;
}

.menuNavbar.closes div:last-of-type {
  transform: rotate(-45deg) translate(7px, -30px);
  transform-origin: right;
}

.background {
  border-radius: 50%;
  position: fixed;
  top: 3%;
  right: 6%;
  z-index: 999;
  background-color: #093545;
  width: 10px;
  height: 10px;
  transition: all 0.5s;
  /* visibility: hidden; */
}

.background.closes {
  transform: scale(300);
  /* visibility: visible; */
}

.burgerMenu ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  height: 100%;
}

@keyframes showScale {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(150);
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes showUl {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.burgerMenu ul li {
  font-size: 2rem;
}

.burgerMenu ul li img {
  width: 35px;
}

* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Lexend Deca", sans-serif;
}
header {
  width: 100%;
}
header nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 2rem 5rem;
  background-color: #093545;
  width: 100%;
}

header nav h2 {
  font-size: 2rem;
  color: white;
  cursor: pointer;
}

header nav h2 span {
  color: #20df7f;
}

header nav ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 2rem;
  list-style: none;
}

header nav ul li {
  font-size: 1.2rem;
  cursor: pointer !important;
  color: white;
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 0.3rem;
  position: relative;
}

header nav ul li img {
  width: 20px;
}

header nav ul li p {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}

header nav ul li:last-of-type,
header nav ul li:nth-of-type(5) {
  background-color: #224957;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  color: white;
}

header nav > img {
  width: 30px;
  display: none;
}

@media only screen and (max-width: 1000px) {
  .menuNavbar {
    display: flex;
  }

  header nav ul {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  header nav {
    padding-inline: 2rem;
  }
}

@media only screen and (max-width: 400px) {
  header nav {
    padding-inline: 1rem;
  }

  header nav h2 {
    font-size: 1.4rem;
  }
}
</style>
