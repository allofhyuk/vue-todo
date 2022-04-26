<template>
  <transition name="fade">
    <div v-if="alert.open" class="alert"  @keypress.enter="confirmDelete(todoId)"  @keypress.esc="closeAlert" >
      <p class="alert__msg">{{ alert.msg }}</p>
      <div class="alert__btn">
        <button class="alert__btn--cancel" @click="closeAlert">취소</button>
        <button class="alert__btn--ok" @click="confirmDelete(deleteStatus)" @keyup.enter="confirmDelete(todoId)">확인</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { useStore } from "vuex";

  export default {      
    setup() {
      const store = useStore();
      const alert = store.state.message.alert;
      
      const closeAlert = () => {
        store.commit('closeAlert');
      }

      const confirmDelete = () => {  
        if(alert.todoId) {
          store.dispatch('deleteTodo', {deleteMode: alert.deleteMode, todoId: alert.todoId});  
        }
        store.dispatch('deleteTodo', {deleteMode: alert.deleteMode});
        store.commit('closeAlert');
  
      /*
       props -> store
        if(todoId) {
          if(todoId === 'all') {
            console.log('all');            
            context.emit('alert', false);
            store.commit('todo/removeAllTodo');
          }
          else if(todoId === 'done') {
            console.log('done');            
            context.emit('alert', false);
            store.commit('todo/removeOnlyDone');
          }
          else if(todoId === 'doing') {
            console.log('doing');
            context.emit('alert', false);
            store.commit('todo/removeOnlyDoing');
          }
          else {
            console.log('each');
            context.emit('alert', false);
            store.commit('todo/removeTodo', todoId);
          }
        }    
        */  
      }        

      return {
        alert,
        closeAlert,
        confirmDelete,        
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
  .alert {
    @include alertContainer(50rem, 24rem, column);
    &__msg {
      font-size: 1.8rem;
    }
    &__btn {
      margin-top: 5rem;  
      &--cancel {
        margin: 0 1rem;
        border: 1px solid $c-gray1;
        border-radius: 0.5rem;
        padding: 1rem 2rem;
      }
      &--ok {
        margin: 0 1rem;
        border: 1px solid $c-gray1;
        border-radius: 0.5rem;
        padding: 1rem 2rem;
      }
    }
  }
</style>