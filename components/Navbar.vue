<template lang="">
  <header>
    <nav>
      <nuxtLink tag="h2" to="/">Shoes <span>Collections</span></nuxtLink>
      <ul>
        <li>Home</li>
        <li>Collections</li>
        <li>Brands</li>
        <li>Sale</li>
        <li>Cart</li>
        <nuxtLink tag="li" to="/login">Login</nuxtLink>
      </ul>
    </nav>
  </header>
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
}

header nav ul li:last-of-type,
header nav ul li:nth-of-type(5) {
  background-color: #224957;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  color: white;
}
</style>
