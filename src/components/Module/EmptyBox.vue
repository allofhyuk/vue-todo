<script>
export default {
  setup() {
    
  }
}
</script>
<template>
  <div class="container">
    <div class="icon__container">
      <svg class="empty__icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3 6.2L8 9.39L13 6.2L8 3L3 6.2M13 6.2L18 9.39L23 6.2L18 3L13 6.2M3 12.55L8 15.74L13 12.55L8 9.35L3 12.55M18 9.35L13 12.55L18 15.74L23 12.55L18 9.35M8.03 16.8L13.04 20L18.04 16.8L13.04 13.61L8.03 16.8Z" />
      </svg>
    </div>
    <div class="text__container">
      <h1 class="empty__text">Empty List</h1>
    </div>    
  </div>
</template>
<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5rem;
    border-top: 0.7px solid $c-gray1;
    animation: fade-in 1s;
  }
  .icon__container {
    height: 70%;
  }
  .empty__icon {
   width: 20rem;
   height: 20rem;
   color: $c-gray1;
  }
  .empty__text {
    font-size: 4rem;
    color: $c-indigo;
    text-align: center;
  }

</style>