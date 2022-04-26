<template>
  <div class="todo__container">
    <button v-if="todoList.length !== 0" class="todo__submenu" @click="modalOpen()">
      <span class="icon-dots-three-horizontal"></span>
    </button>
    <Modal v-if="openModal"></Modal>
    <EmptyBox v-if="todoList.length === 0"></EmptyBox>
    <div v-else v-for="(todo) of todoList" v-bind:key="todo.id">
        <div class="todo">
          <div class="todo__contents">
            <input id="todo__contents__checkbox" class="todo__checkbox" type="checkbox" :value="todo.id" :checked="todo.checked" @change="changeChecked($event)" >                           
            <input v-focus v-if="editTodoId === todo.id" ref="editInput" v-model="todo.text" class="todo__edit" @keyup.enter="toggleInput($event, todo.id, todo.text)">       
            <p v-else class="todo__contents__text">{{ todo.text }}</p>        
          </div>          
          <div class="todo__btn">
            <button v-if="editTodoId !== todo.id" class="todo__btn--delete" :name="todo.id" :todoid="todo.id" @click="deleteBtnHandler($event)">
              <span class="icon-bin"></span>
            </button>
            <button v-if="editTodoId !== todo.id" class="todo__btn--edit" @click="toggleInput($event, todo.id, todo.text)">
              <span class="icon-pencil"></span>
            </button>
            <button v-if="editTodoId === todo.id" class="todo__btn--done" :name="todo.id" :todoid="todo.id" @click="toggleInput($event, todo.id, todo.text)">
              <span class="icon-checkmark"></span>
            </button>
          </div>
        </div>        
    </div>
    <Alert :todoId="clickedId" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from "vuex";
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

<style scoped lang="scss">

  .todo__container {    
    width: 100%;
    box-sizing: border-box;
    min-height: 10rem;    
    margin-top: 2rem;   
  }
  .todo__submenu {
    margin: 1rem 2rem;
    transition: all 0.5s;
    .icon-dots-three-horizontal {
      font-size: 2.5rem;
    }
    &:hover {
      color: $c-red1;    
    }
  }
  .todo {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 4rem;
    margin: 1rem 2rem;
    border: 1px solid $c-gray2;
    background: #fff;
    animation: $fade-in, $slide-down 0.6s ease-in-out;
    -webkit-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);
    -moz-box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);
    box-shadow: 3px 10px 29px -17px rgba(102,102,102,0.3);   
    &__contents {
      display: flex;
      width: 80%; 
      align-items: center;
      &__text {
        width: 100%;    
        box-sizing: border-box;
        margin-left: 2rem;
        font-size: 2rem;
      }
      &__checkbox {
        box-sizing: border-box;
        width: 2rem;    
        height: 2rem;
        appearance: none;
        border: 1px solid $c-gray1;
        background: #fff;
        &:checked {
          border: 1px solid #fff;
          background: #000;
          &::before {
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
          &::after {
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
          &:checked + p {
            text-decoration: line-through;
            text-decoration-color: $c-black-soft;
          }
        }
      }
    } 
    &__btn {
      &--delete,&--edit,&--done {
        position: relative;
        background: transparent;
        border: none;
        outline: none;
        margin-right: 1rem;
        width: 4rem;
        height: 4rem;        
      }
      .icon-bin, .icon-pencil, .icon-checkmark {
        color: $c-gray1;
        font-size: 2.5rem;
        transition: all 0.5s;
      }
      .icon-bin:hover {
        color: $c-red1
      }
      .icon-pencil:hover {
        color: $c-black-mute;
      }
      .icon-checkmark:hover {
        color: $c-green1;
      }
    }
    &__edit {
      width: 60%;
      height: 3rem;
      font-size: 2rem;    
      margin-left: 2rem;    
      border-top: 0;
      border-bottom: 1px solid $c-gray1;
      border-left: 0;
      border-right: 0;
      &:focus {
        @include drawLineFunc(60%);
        outline: none;
      }
    }
  }
  
</style>