
export default {
  state: {  
    toast: [],
    alert: {
      open: false,
      deleteMode: "",
      msg: "",
      todoId: "",
    },
    modal: {
      open: false,
      subMenuList: [],
    }
  },
  getters: {

  },
  // (synchronous)
  mutations: {
    // notification toast mutation
    showToast: (state, payload) => {      
      state.toast.push(payload);
    },
    unshownToast: (state) => {
      state.toast.shift();
      console.log(state.toast);
    },
    openAlert: (state, payload) => {
      state.alert.open = true;
      state.alert.msg = payload.msg;
      state.alert.deleteMode = payload.deleteMode;
      if(payload.todoId) {
        state.alert.todoId = payload.todoId;
      }
    },
    closeAlert: (state) => {
      state.alert.open = false;
      state.alert.msg = "";
    },
    openModal: (state, payload) => {
      console.log('openModal ', payload);
      state.modal.open = true;
      state.modal.subMenuList = payload;      
    },
    closeModal: (state) => {
      state.modal.open = false;
      state.modal.msg = "";
    }
  },
  // (asynchronous)
  actions: {
     unshownToast: ({commit}) => {
      setTimeout(() => {
        commit('unshownToast');
      }, (3000));
     },
     deleteTodo: ({commit}, payload) => {
       if(payload.deleteMode === 'all') {
         commit('todo/removeAllTodo');
       }
       else if(payload.deleteMode === 'doing') {
         commit('todo/removeOnlyDoing');
       }
       else if(payload.deleteMode === 'done') {
         commit('todo/removeOnlyDone');
       }
       else { // mode === each
         commit('todo/removeTodo', payload.todoId);
       }
     }
  },
}