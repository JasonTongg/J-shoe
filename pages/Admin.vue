<template>
  <div id="wrapper">
    <Navbar></Navbar>
    <main>
      <h2>Product <span>Sale</span></h2>
      <div class="productItems">
        <div
          class="item"
          v-for="shoe in shoes.filter(
            (item) => item.userId === userData.userId
          )"
        >
          <img :src="shoe.image" alt="" />
          <h2>{{ shoe.title }}</h2>
          <h3>
            {{
              new Intl.NumberFormat("Rp", {
                style: "currency",
                currency: "idr",
              }).format(Math.round(shoe.price * 1.6))
            }}
          </h3>
          <h3>
            {{
              new Intl.NumberFormat("Rp", {
                style: "currency",
                currency: "idr",
              }).format(shoe.price)
            }}
          </h3>
          <div class="buttons">
            <button @click="toggleOverlay(true, shoe.id)">
              <img src="../static/assets/icon/trash.svg" alt="trash" /> Delete
            </button>
            <nuxt-link
              tag="button"
              :to="{ path: 'Update', query: { shoes: shoe } }"
              ><img
                src="../static/assets/icon/edit.svg"
                alt="trash"
              />Edit</nuxt-link
            >
          </div>
        </div>
        <h2
          v-if="
            shoes.filter((item) => item.userId === userData.userId).length === 0
          "
        >
          Shoes not found!!
        </h2>
      </div>
    </main>
    <Footer></Footer>
    <div class="overlay" v-if="showOverlay" @click="closeOverlay">
      <div class="content">
        <h2>Delete Confirmation</h2>
        <p>are you sure to delete this item?</p>
        <div class="modalButtons">
          <button @click="toggleOverlay(false, 0)">Cancel</button>
          <button @click="deleteItem">Delete</button>
        </div>
      </div>
    </div>
    <NuxtLink tag="button" to="/add" class="addButton">
      <img src="../static/assets/plus.png" alt="plus" />
    </NuxtLink>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "IndexPage",
  middleware: ["check-auth", "auth"],
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      showOverlay: false,
      deleteIndex: 0,
    };
  },
  methods: {
    toggleOverlay(value, id) {
      this.showOverlay = value;
      if (value === true) {
        this.deleteIndex = id;
      }
    },
    closeOverlay(event) {
      if (event.target.classList[0] === "overlay") {
        this.toggleOverlay(false, 0);
      }
    },
    deleteItem() {
      this.$store.dispatch("deleteShoes", this.deleteIndex);
      this.toggleOverlay(false, 0);
    },
  },
  computed: {
    shoes() {
      return this.$store.getters.getShoes;
    },
    userData() {
      return this.$store.getters.getUserData;
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Lexend Deca", sans-serif;
}

#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
main {
  padding: 2rem 5rem;
  text-align: center;
  position: relative;
  width: 100%;
}

main h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

main h2 span {
  color: #093545;
}

main .productItems {
  display: -ms-grid;
  display: grid;
  width: 100%;
  gap: 1rem;
  -ms-grid-columns: (minmax(400px, 1fr)) [auto-fit];
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

main .productItems .item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 0.8rem;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

main .productItems .item img {
  width: 100%;
  height: 200px;
  -o-object-fit: cover;
  object-fit: cover;
}

main .productItems .item h3:first-of-type {
  text-decoration: line-through;
}

main .productItems .item h3:last-of-type {
  font-size: 1.4rem;
}

main .productItems .item button {
  color: white;
  border: none;
  outline: none;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: #007138;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.buttons button:first-of-type {
  background-color: #760000 !important;
}

.buttons button img {
  width: 20px !important;
  height: auto !important;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.overlay .content > * {
  padding: 0;
  margin: 0;
}

.overlay .content {
  background-color: white;
  color: black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 20px;
  box-shadow: 4px 8px 24px rgba(0, 0, 0, 0.2);
}

.modalButtons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.modalButtons button {
  padding: 0.8rem 1rem;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

.modalButtons button:first-of-type {
  background-color: green !important;
}

.addButton {
  position: absolute;
  top: 18%;
  right: 5%;
  background-color: #093545;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.addButton img {
  width: 30px;
}

@media only screen and (max-width: 600px) {
  main {
    padding-inline: 2rem;
  }
}

@media only screen and (max-width: 470px) {
  main {
    padding-inline: 1rem;
  }
}

@media only screen and (max-width: 400px) {
  main .productItems {
    grid-template-columns: 1fr;
  }
}
</style>
