<template>
  <header class="header">
    <div class="header__logo">     
      <h1 class="logo__text">{{ textLogo }}</h1>
      <h3 class="logo__subtitle">{{ msg }}</h3>    
    </div>
    <nav class="nav_container">
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <!-- <RouterLink to="/about">About</RouterLink> -->
    </nav>
  </header>
</template>

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

<style scoped lang="scss">
.header {
  position: relative;
  width: 100%;  
  max-width: 1280px;
  margin: 0 auto;
  height: fit-content;
  display: flex;
  justify-content: space-between;  
  align-items: center;
  &__logo {
    padding: 0 1rem;
    &__text {
      text-align: left;
      font-size: 4rem;
    }
    &__subtitle {
      text-align: left;
      font-size: 2rem;
    }
  }
}

@media (max-width: 1024px) {
  .header__logo {
    &__text {
      text-align: center;
      font-size: 3.5rem;
    }
    &__subtitle {
      font-size: 1.5rem;
    }
  }
}
</style>
