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

<template>  
  <div v-if="modalStatus.open" class="modal__wrapper">
    <div class="modal__container">
      <button class="modal__close__btn" @click="closeModal()">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
      <button class="each_menu__btn" v-for="(menu, index) of modalStatus.subMenuList" :key="index" @click="menuBtnHandler(menu)">
        {{ menu }}
      </button>
    </div>
    <Alert :deleteStatus="deleteStatus" ></Alert>  
  </div>
</template>

<style scoped lang="scss">
  .modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;    
  }
  .modal__close__btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;    
  }
  .modal__container {
    @include alertContainer(50rem, 30rem, 'row');
    @include fade-in();
  }
  .each_menu__btn {
    border-bottom: 1px solid $c-gray1;
    padding: 1rem;
    margin: 0 1.5rem;
    transition: color 0.6s;
  }
  .each_menu__btn:hover {
    color: $c-red1;
    border-bottom: 1px solid $c-red1;
  }
</style>