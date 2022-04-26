<template>  
  <div v-if="modalStatus.open" class="modal">
    <div class="modal__container">
      <button class="modal__close__btn" @click="closeModal()">
        <span class="icon-cross"></span>
      </button>
      <button class="modal__each_menu" v-for="(menu, index) of modalStatus.subMenuList" :key="index" @click="menuBtnHandler(menu)">
        {{ menu }}
      </button>
    </div>
    <Alert :deleteStatus="deleteStatus" ></Alert>  
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { onMounted } from '@vue/runtime-core'
import { useStore } from "vuex";

export default {
  setup() {
    // vuex
    const store = useStore();
    let modalStatus = computed(() => store.state.message.modal);
    // sub alert open variable
    let deleteStatus = ref('');

    const closeAlert = () => {
      if(localAlertState) {        
        context.emit('modal', false)
      }
    }

    // 전체 삭제 method
    const removeAllTodo = () => {      
      const payload = {
        msg: "전체 할 일을 삭제 하시겠습니까?",
        deleteMode: "all"
      }
      store.commit('openAlert', payload);     
      store.commit('closeModal');
    }
    // doing 삭제 method
    const removeDoingTodo = () => {      
      const payload = {
        msg: "미완수 항목을 삭제 하시겠습니까?",
        deleteMode: "doing"
      }
      store.commit('openAlert', payload);    
      store.commit('closeModal');
    }
    // done 삭제 method
    const removeDoneTodo = () => {
      const payload = {
        msg: "완수 항목을 삭제 하시겠습니까?",
        deleteMode: "done"
      }
      store.commit('openAlert', payload);   
      store.commit('closeModal');  
    }

    const closeModal = () => {
      store.commit('closeModal');
    }

    // each menu trigger func
    const menuBtnHandler = (menuName) => {
      if(menuName.includes('전체')) {
        removeAllTodo();
      }
      else if (menuName.includes('미완수')) {
        removeDoingTodo();
      }
      else {
        removeDoneTodo();
      }
    }

    return {
      modalStatus,
      deleteStatus,
      closeModal,
      removeAllTodo,
      removeDoingTodo,
      removeDoneTodo,
      menuBtnHandler
    }
  }
  
}
</script>

<style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;
    &__container {
      @include alertContainer(50rem, 30rem, 'row');
      animation: $fade-in 0.6s;
    }
    &__close__btn {
      position: absolute;
      top: 1.5rem;
      right: 1rem;
      z-index: 5;        
      .icon-cross {
        color: $c-gray1;
        transition: color 0.6s;
        &:hover {
          color: $c-red1;
        }
      }
    }    
    &__each_menu {
      border-bottom: 1px solid $c-gray1;
      padding: 1rem;
      margin: 0 1.5rem;
      transition: color 0.6s;
      &:hover {
        color: $c-red1;
        border-bottom: 1px solid $c-red1;
      }
    }
  }
</style>