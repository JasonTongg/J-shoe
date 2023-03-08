<template>
  <div class="container">
    <Navbar></Navbar>
    <main>
      <div class="content" v-if="cart.length > 0">
        <div class="main" v-for="(item, idx) in cart">
          <img :src="item.image" :alt="item.name" />
          <div class="info">
            <h2>{{ item.title }}</h2>
            <p>
              {{
                new Intl.NumberFormat("Rp", {
                  style: "currency",
                  currency: "idr",
                }).format(item.price)
              }}
            </p>
            <div class="buttons">
              <button @click="removeItem(item.id)">-</button>
              <p>{{ item.qty }}</p>
              <button @click="addItem(item)">+</button>
            </div>
          </div>
        </div>
      </div>
      <h2 v-else>Cart is Empty</h2>
      <div class="total">
        <h2>Total</h2>
        <div class="totalItems" v-for="item in cart">
          <p>{{ item.title }} x {{ item.qty }}</p>
          <p>
            {{
              new Intl.NumberFormat("Rp", {
                style: "currency",
                currency: "idr",
              }).format(item.price * item.qty)
            }}
          </p>
        </div>
        <div class="totalItems">
          <p>Total:</p>
          <p>
            {{
              new Intl.NumberFormat("Rp", {
                style: "currency",
                currency: "idr",
              }).format(cart.length > 0 ? this.total : 0)
            }}
          </p>
        </div>
        <a class="buyButton" @click="clear">Buy</a>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    addItem(item) {
      this.$store.dispatch("addUserCart", {
        ...item,
        id: item.id.map((item, index) => index === 0),
      });
    },
    removeItem(idx) {
      this.$store.dispatch("deleteUserCart", idx[0]);
    },
    clear() {
      let cart = this.$store.getters.getCart;
      for (const item of cart) {
        this.$store.dispatch("deleteUserCart", item.id[0]);
      }
      this.total = 0;
      //   this.$router.push("/");
    },
  },
  computed: {
    cart() {
      let cartArray = [];
      let cart = this.$store.getters.getCart;
      for (const item of cart) {
        if (cartArray.some((items) => items.title === item.title)) {
          let arr = cartArray.find((itemss) => itemss.title === item.title);
          let index = cartArray.indexOf(arr);
          let cartClone = cartArray;
          cartClone[index].qty = cartClone[index].qty + 1;
          cartClone[index].id = [...cartClone[index].id, item.id[0]];

          cartArray = cartClone;
        } else {
          cartArray = [...cartArray, { ...item, qty: 1 }];
        }
        this.total += +item.price;
      }
      return cartArray;
    },
  },
  components: [Navbar, Footer],
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
}

.content {
  width: 100%;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 1rem;
  box-sizing: border-box;
}

main {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
}

.total {
  width: 100%;
  padding: 0.5rem;
  border: 3px solid #093545;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-direction: column;
  padding-block: 1rem;
}

.totalItems {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.totalItems p,
.total h2 {
  margin: 0;
}

.buyButton {
  border-radius: 5px !important;
  padding: 0.3rem 0.5rem !important;
  background-color: #093545;
  color: white;
  width: 100%;
  cursor: pointer;
}
.main {
  display: grid;
  align-items: flex-start;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  /* gap: 1rem; */
}

.main img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.main h2 {
  font-size: 1rem;
  margin: 0;
  text-align: start;
}

.main p {
  font-size: 0.8rem;
  margin: 0;
}

.main .info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  gap: 0.5rem;
}

button {
  border: 0;
  outline: 0;
  background-color: #093545;
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  font-size: 1rem;
}

.main .info p:last-of-type {
  text-align: justify;
}

@media only screen and (max-width: 900px) {
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .main img {
    width: 100%;
    object-fit: cover;
  }
}

@media only screen and (max-width: 750px) {
  main {
    grid-template-columns: 1fr;
  }
}

@media only screen and (max-width: 600px) {
  .main {
    padding-inline: 1rem;
  }
}
</style>
