<template>
  <div id="wrapper">
    <Navbar></Navbar>
    <main>
      <h2>Product <span>Sale</span></h2>
      <div class="productItems">
        <div class="item" v-for="shoe in shoes">
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
          <nuxt-link
            tag="button"
            :to="{ path: 'details', query: { shoes: shoe } }"
            >Details</nuxt-link
          >
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "IndexPage",
  components: {
    Navbar,
    Footer,
  },
  middleware: ["check-auth", "auth"],
  data() {
    return {};
  },
  computed: {
    shoes() {
      return this.$store.getters.getShoes;
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
  background-color: #093545;
  color: white;
  border: none;
  outline: none;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
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
