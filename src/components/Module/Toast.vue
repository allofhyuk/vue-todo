<script>
  import { onUnmounted, onMounted, computed, onUpdated, onBeforeUpdate } from 'vue'
  import { useStore } from "vuex";

  export default {
    name: 'Alert',
    setup() {
      const store = useStore();
      const toast = computed(() => store.state.message.toast);   

      return {
        toast
      }              
    }
  }
</script>

<template>  
  <div class="container">
    <transition-group name="fade">
    <div class="toast__container" v-for="(noti, index) of toast" :key="index">
      <div v-if="noti.open" class="each__toast" :class="noti.type">
        <svg v-if="noti.type === 'warning'" class="warning__btn" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
        </svg>
        <svg v-else-if="noti.type === 'success'" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
        </svg>
        <p class="alert__msg">{{ noti.msg }}</p>
      </div>      
    </div>
    </transition-group>
  </div>    
</template>

<style scoped lang="scss">
  .container{
    position: fixed;    
    top: 2rem;
    left: calc(50% - 17.5rem);    
    display: flex;
    flex-direction: column;
  }
  .toast__container {
    margin-top: 2rem;
  }
  .each__toast {
    font-size: 1.8rem; 
    box-sizing: border-box;   
    letter-spacing: 1px; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    width: 35rem;
    height: 4rem;
    min-width: 200px;
    min-height: 50px;
    background: #fff;
    color: $c-black-mute;   
    -webkit-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.6);
    -moz-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.6);
    box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.6);
  }
  .warning {
    border-left: 10px solid $c-red1;
  }
  .success {
    border-left: 10px solid $c-green1;
  }
  .fade-enter-active {
    @include fade-in();
  }
  .fade-leave-active  {
    @include fade-out();
  }
</style>