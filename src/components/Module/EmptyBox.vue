<template>
  <div class="empty">
    <div class="empty__icon">
      <span class="icon-dropbox"></span>
    </div>
    <div class="text__container">
      <h1 class="empty__text">Empty List</h1>
    </div>    
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .empty {
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
    
    &__icon {
      height: 70%;
      margin-bottom: 4rem;
      .icon-dropbox {      
        font-size: 20rem;
        color: $c-gray1;      
      }
    }
    &__text {
      font-size: 4rem;
      color: $c-indigo;
      text-align: center;
    }
  }

</style>