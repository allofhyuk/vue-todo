<template>
  <div class="form">
    <div class="form__input">      
      <input class="form__input__field" v-on:input="typing" name="todo" :value="text" @input="setText($event)" @keypress.enter="setState">
    </div>    
    <div class="form__btn">
      <button class="form__btn__submit" @click="setState">Submit</button>
    </div>
  </div>
</template>

<script>  
  import { ref } from 'vue'
  import { useStore } from "vuex";

  export default {    
    setup() {      
      let text = "";
      let warningMsg = ref("");
      let openAlert = ref(false);

      const store = useStore();

      // local state 값 변경 
      const setText = (e) => {                    
        text = e.target.value;        
      }    

      const reset = () => {
        // clear input field after submit
        document.querySelector('.form__input__field').value = ""; 
        text = "";        
      }

      // 변경 사항 store에 반영
      const setState = () => {
        if(text.length === 0 || text.includes('\n')) {
          openAlert.value = true;
          warningMsg.value = "할 일을 입력해주세요"
          store.commit('showToast', {open: true, msg: warningMsg, type: 'warning'});
          store.dispatch('unshownToast');          
        }
        else {
          store.dispatch('todo/addTodo', text);  
          store.commit('todo/changeOrder');
        }

        reset();
      }

      return {  
        text,
        warningMsg,
        store,      
        setState,
        setText,        
      }
    }
  }
</script>

<style scoped lang="scss">
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;    
    align-items: center;
    padding: 3rem 2rem;
    margin: 2rem 0;    
    &__input {
      width: 100%;
      &__field {
        width: 100%;
        height: 15rem;
        resize: none;
        padding: 2rem;
        font-size: 2rem;
        border: 1px solid $c-gray2;
        transition: 0.5s;
        &:focus {
          border: 1px solid $c-white-soft;
          outline: 1px solid $c-black-mute;    
          transition: 0.5s;
        }
      }
    }
    &__btn {
      display: flex;    
      justify-content: right;
      width: 100%;
      margin-top: 2rem;
      &__submit {
        height: 100%;    
        outline: none;
        border: 1px solid $c-gray1;
        color: $c-black-soft;
        background: $c-white;
        padding: 1.5rem 4rem;
        border-radius: 50px;
        font-size: 1.5rem;
        &:hover {
          background: $c-gray1;
          border: 1px solid $c-white;
          color: $c-white;
          transition: 0.3s;
        }
      }
    }
  }
</style>