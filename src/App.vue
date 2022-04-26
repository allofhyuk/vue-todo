<script setup>
import Navigation from '@/components/Navigation.vue'
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>   
    <Navigation textLogo="Simple Todo" />    
    
    <RouterView />
  </div>
</template>

<style lang="scss">
@import '@/assets/base.scss';

#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;  
}

.wrapper {
  display: flex;
}

.header {
  position: fixed;
  width: 100vw;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: $c-black;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

}
</style>
