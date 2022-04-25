import uuid from "uuid"
export default {
  namespaced: true,
  state: {
  // set localstorage to keep data even webpage refresh
    todoList: JSON.parse(localStorage.getItem('todo')) || [],
  },
  getters: {
    getOnlyDoing: (state) => {
      return state.todoList.filter(todo => !todo.checked);
    },
    getOnlyDone: (state) => {
      return state.todoList.filter(todo => todo.checked);
    }
  },
  // (synchronous)
  mutations: {
    addTodo: (state, newState) => {     
      newState.order = state.todoList.length;    
      state.todoList.push(newState);
    
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    changeChecked: (state, newState) => {      
      state.todoList.filter((todo) => todo.id === newState.uuid)[0].checked = newState.checked;

      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    changeOrder: (state) => {
      /*      
        // doing list sort by date
        const doing = state.todoList.filter(todo => !todo.checked).sort((a, b) => {
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          return aDate - bDate;
        });
        // done list sort by date
        const done = state.todoList.filter(todo => todo.checked).sort((a, b) => {
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          return aDate - bDate;
        });
      */
      // 원본 순서에 따라 sorting
      const doing = state.todoList.filter(todo => !todo.checked).sort((a, b) => a.order - b.order);
      const done = state.todoList.filter(todo => todo.checked).sort((a, b) => a.order - b.order);
      
      let filteringTodo = [...doing, ...done];
      state.todoList = filteringTodo;

      // set localstorage after state changing
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    editTodo: (state, payload) => {
      state.todoList.filter(todo => todo.id === payload.id)[0].text = payload.text;
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    removeTodo: (state, payload) => {      
      state.todoList = state.todoList.filter(todo => todo.id !== payload);
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    removeOnlyDoing: (state) => {
      state.todoList = state.todoList.filter(todo => todo.checked);
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    removeOnlyDone: (state) => {
      state.todoList = state.todoList.filter(todo => !todo.checked);
      localStorage.setItem('todo', JSON.stringify(state.todoList));
    },
    removeAllTodo: (state) => {
      state.todoList = [];
      localStorage.setItem('todo', JSON.stringify([]));
    },
  },
  // (asynchronous)
  actions: {
    addTodo({commit}, text) {
      commit('addTodo', {
        id: uuid.v1(),
        text,
        checked: false,
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      })
    },
  },
}