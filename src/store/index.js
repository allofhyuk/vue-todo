import { createStore } from 'vuex'
import todo from './Modules/todo';
import message from './Modules/message';

const store = createStore({
  modules: {
    todo,
    message,
  }
})

/*
  store.state.todoModule 
  sotre.state.todoByDateModule
*/

export default store;