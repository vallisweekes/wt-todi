import Vue from 'vue';
import Vuex from 'vuex';

import Todo from '@/model/Todo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [Todo],
  },
  mutations: {
    getTodoData(state, todo: Todo[]) {
      Vue.set(state, 'todos', todo);
    },
    addNewTodo(state, todo: Todo) {
      state.todos.unshift(todo as any);
    },

    updateTodo(state, todo: { index: number; content: Todo }) {
      Vue.set(state.todos, todo.index, todo.content);
    },
    deleteTodo(state, index) {
      Vue.delete(state.todos, index);
    },
  },
  actions: {},

  getters: {},
});
