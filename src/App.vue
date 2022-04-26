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
</style>
