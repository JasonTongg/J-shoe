<template lang="">
  <footer>
    <div class="list">
      <ul>
        <li>Address</li>
        <li>Jl. sudirman 32</li>
        <li>brand@gmail.com</li>
        <li>(021) 2552-xxxx</li>
      </ul>
      <ul>
        <li>Collection</li>
        <li>Sneakers</li>
        <li>Shoes</li>
        <li>Slip on</li>
        <li>Boots</li>
      </ul>
      <ul>
        <li>Pages</li>
        <li>Home</li>
        <li>Collections</li>
        <li>Brands</li>
        <li>Sale</li>
      </ul>
    </div>
    <p>
      <span>Copyright</span> &copy; 2022, Make with &hearts; by
      <span>Jason</span>
    </p>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Lexend Deca", sans-serif;
}
footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
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
  gap: 2rem;
  padding: 2rem 5rem;
  background-color: #093545;
  color: white;
  width: 100%;
}

footer .list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 8rem;
  row-gap: 1.5rem;
}

footer .list ul {
  list-style: none;
  text-align: center;
}

footer .list ul li:first-of-type {
  font-size: 1.2rem;
  font-weight: bold;
  color: #20df7f;
}

footer .list ul li:not(:last-of-type) {
  margin-bottom: 0.5rem;
}

footer p {
  font-size: 1.2rem;
  text-align: center;
}

footer p span {
  font-weight: bold;
  color: #20df7f;
}

@media only screen and (max-width: 550px) {
  footer {
    padding-inline: 2rem;
  }
}

@media only screen and (max-width: 350px) {
  footer p {
    font-size: 0.8rem;
  }
}
</style>
