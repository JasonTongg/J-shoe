<template lang="">
  <div class="container">
    <Navbar></Navbar>
    <main>
      <img :src="shoe.img" :alt="shoe.name" />
      <div class="info">
        <h2>{{ shoe.name }}</h2>
        <p>{{ shoe.priceThrough }}</p>
        <p>{{ shoe.price }}</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A beatae
          veritatis, consequatur voluptates qui rem cum possimus deserunt dolor
          fugit sapiente commodi ratione quidem quaerat inventore, maxime
          voluptatum. Unde, eveniet. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Veniam, eum.
        </p>
        <button>Add to cart</button>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      shoe: this.$route.query.shoes,
    };
  },
};
</script>
<style scoped>
main {
  display: grid;
  align-items: flex-start;
  justify-content: center;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem 4rem;
}

main img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

main h2 {
  font-size: 3rem;
  margin: 0;
}

main p:first-of-type {
  text-decoration: line-through;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
}

main p {
  font-size: 1.5rem;
  margin: 0;
}

main .info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

button {
  border: 0;
  outline: 0;
  background-color: #093545;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
}
</style>
