<script>
import { ref, computed } from 'vue'
import { mapState, useStore } from "vuex";
import EmptyBox from './Module/EmptyBox.vue';
import Modal from './Module/Modal.vue';

export default {
  setup(context) {
    // vuex     
    const store = useStore();    
    const todoList = computed(() => store.state.todo.todoList);      
    
    // warning message
    let alertMsg = ref("");
    // 삭제 할 todo id
    let clickedId = ref("");
    // 수정 할 todo id (특정 todo만 변경하기 위한 식별자)
    let editTodoId = ref("");
    // checked 상태 변경 시 commit
    const changeChecked = (e) => {
      let state = {
          uuid: e.target.value,
          checked: e.target.checked,
      };
      store.commit("todo/changeChecked", state);
      store.commit("todo/changeOrder");
    };
    // 삭제 버튼 클릭 시 확인 alert open
    const deleteBtnHandler = (e) => {
      e.preventDefault();
      // set messge state
      const payload = {
        msg: "할 일을 삭제하시겠습니까?",
        deleteMode: "each",
        todoId: e.currentTarget.name
      }
      store.commit('openAlert', payload);     
    };

    // 수정 버튼 클릭 시, input field
    const toggleInput = (e, todoId, todoText) => {      
      if (editTodoId.value === "") {
        editTodoId.value = todoId;
      }      
      else { // edit mode
        store.commit("todo/editTodo", { id: todoId, text: todoText });
        editTodoId.value = "";
      }
    };
    // store로 부터 alert open 상태 get
    const openModal = computed(() => store.state.message.modal.open);
    const subMenuList = ref([]);
    const modalOpen = () => {            
      subMenuList.value = ["전체 삭제", "미완수 할 일 삭제", "완수 할 일 삭제"];
      openModal.value = true;
      store.commit("openModal", subMenuList.value);
    };
    
    return {
      todoList,
      alertMsg,
      editTodoId,
      clickedId,      
      openModal,
      changeChecked,
      deleteBtnHandler,
      toggleInput,
      modalOpen,
    };
  },
  components: { Modal }
}
</script>

<template>
  <div class="container">
    <button v-if="todoList.length !== 0" class="sub_menu__btn" @click="modalOpen()">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
      </svg>
    </button>
    <Modal v-if="openModal"></Modal>
    <EmptyBox v-if="todoList.length === 0"></EmptyBox>
    <div v-else v-for="(todo) of todoList" v-bind:key="todo.id">
        <div class="todo_list__container">
          <div class="todo__contents">
            <input id="todo__checkbox" class="todo__checkbox" type="checkbox" :value="todo.id" :checked="todo.checked" @change="changeChecked($event)" >                           
            <input v-focus v-if="editTodoId === todo.id" ref="editInput" v-model="todo.text" class="todo__edit" @keyup.enter="toggleInput($event, todo.id, todo.text)">       
            <p v-else class="todo__text">{{ todo.text }}</p>        
          </div>          
          <div class="btn__container">
            <button v-if="editTodoId !== todo.id" class="delete__btn" :name="todo.id" :todoid="todo.id" @click="deleteBtnHandler($event)">
              <svg class="delete__btn--icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"  d="M4 19V7H16V19C16 20.1 15.1 21 14 21H6C4.9 21 4 20.1 4 19M6 9V19H14V9H6M13.5 4H17V6H3V4H6.5L7.5 3H12.5L13.5 4M19 17V15H21V17H19M19 13V7H21V13H19Z" />
              </svg>
            </button>
            <button v-if="editTodoId !== todo.id" class="edit__btn" @click="toggleInput($event, todo.id, todo.text)">
              <svg class="edit__btn--icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
              </svg>
            </button>
            <button v-if="editTodoId === todo.id" class="done__btn" :name="todo.id" :todoid="todo.id" @click="toggleInput($event, todo.id, todo.text)">
              <svg class="done__btn--icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            </button>
          </div>
        </div>        
    </div>
    <Alert :todoId="clickedId" />
  </div>
</template>

<style scoped lang="scss">

  .container {    
    width: 100%;
    box-sizing: border-box;
    min-height: 10rem;    
    margin-top: 2rem;   
  }
  .sub_menu__btn {
    margin: 1rem 2rem;
    font-size: 2.2rem;
    transition: all 0.5s;
  }
  .sub_menu__btn:hover {
    color: $c-red1;
  }
  .todo_list__container {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 4rem;
    margin: 1rem 2rem;
    border: 1px solid $c-gray2;
    background: #fff;
    animation: fade-in 1s;
    animation: slideDown 1s;
    -webkit-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);
    -moz-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);
    box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);    
  }
  .todo__contents { 
    display: flex;
    width: 80%; 
    align-items: center;
  }
  .todo__checkbox {    
    box-sizing: border-box;
    width: 2rem;    
    height: 2rem;
    appearance: none;
    border: 1px solid $c-gray1;
    background: #fff;
  }
  .todo__checkbox:checked {
    border: 1px solid #fff;
    background: #000;
  }
  .todo__checkbox:checked::before {
    position: absolute;
    content: "";
    width: 1rem;
    top: 50%;
    left: 0.6rem;
    transform: rotate(130deg);   
    // height: 1rem; 
    z-index: 10;
    border: 1px solid #fff;
  }
  .todo__checkbox:checked::after {
    position: absolute;
    content: "";
    width: 0.6rem;
    left: 0.25rem;
    top: 1rem;
    transform: rotate(45deg);   
    // height: 1rem; 
    z-index: 10;
    border: 1px solid #fff;
  }

  .todo__edit {
    width: 60%;
    height: 3rem;
    font-size: 2rem;    
    margin-left: 2rem;    
    border-top: 0;
    border-bottom: 1px solid $c-gray1;
    border-left: 0;
    border-right: 0;
    @include drawLineFunc(60%);
  }
  .todo__edit:focus {
    outline: none;
    border-top: 0;
    border-bottom: 1px solid $c-black-mute;
    border-left: 0;
    border-right: 0;
  }
  .todo__text {
    width: 100%;    
    box-sizing: border-box;
    margin-left: 2rem;
    font-size: 2rem;
  }
  .divider {
    width: 100%;
    height: 1px;
    border: 1px solid $c-gray2;
  }
  .delete__btn, .edit__btn, .done__btn {
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    width: 4rem;
    height: 4rem;    
  }
  .delete__btn--icon, .edit__btn--icon, .done__btn--icon {
    color: $c-gray1;
    transition: all 0.5s;
  }
  .delete__btn--icon:hover {
    color: $c-red1
  }
  .edit__btn--icon:hover {
    color: $c-black-mute;
  }
  .done__btn--icon:hover {
    color: $c-green1;
  }
  
  @keyframes fade-in {
    0%  {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes slideDown {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
</style>