<template>  
  <div class="toast">
    <transition-group name="fade">
    <div class="toast__each" v-for="(noti, index) of toast" :key="index">
      <div v-if="noti.open" class="toast__each_box" :class="noti.type">
        <span v-if="noti.type === 'warning'" class="icon-cross"></span>
        <span v-else-if="noti.type === 'success'" class="icon-checkmark"></span>
        <p class="toast__each_box__msg">{{ noti.msg }}</p>
      </div>      
    </div>
    </transition-group>
  </div>    
</template>

<script>
  import { computed } from 'vue'
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

<style scoped lang="scss">
  .fade-enter-active {
    animation: $fade-in 0.6s;  
  }
  .fade-leave-active  {
    animation: $fade-out 0.6s;  
  }
  .toast{
    @include toastLocation(35rem, 4rem, 2rem, 'top-center');
    &__each {
      margin-top: 2rem;
    }
    &__each_box {
      @include toastStyle(35rem, 4rem, #fff, 1.8rem);
      &__msg {
        font-size: 1.8rem;
      }
    }
    .warning {
      border-left: 10px solid $c-red1;
    }
    .success {
      border-left: 10px solid $c-green1;
    }
  }
</style>