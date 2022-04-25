<script>
export default {
  props: {
    textLogo: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: false,
    }
  }
}
</script>

<template>
  <header class="header__container">
    <div class="logo__container">     
      <h1 class="logo__text">{{ textLogo }}</h1>
      <h3 class="logo__subtitle">{{ msg }}</h3>    
    </div>
    <nav class="nav_container">
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <!-- <RouterLink to="/about">About</RouterLink> -->
    </nav>
  </header>
</template>

// scoped = local style
<style scoped lang="scss">
.header__container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: fit-content;
  display: flex;
  justify-content: space-between;  
  align-items: center;
}
.logo__container {
  padding: 0 1rem;
}
.logo__text {
  text-align: left;
  font-size: 4rem;
}
.logo__subtitle {
  text-align: left;
  font-size: 2rem;
}

@media (max-width: 1024px) {
  .logo__container {

  }
  .logo__text {
    text-align: center;
    font-size: 3.5rem;
  }
  .logo__subtitle {
    font-size: 1.5rem;
  }
}
</style>
