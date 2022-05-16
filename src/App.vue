<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import dayjs from 'dayjs';
import Todo from '@/model/Todo';

@Component
export default class App extends Vue {
  async getTodos(): Promise<void> {
    try {
      const { data } = await axios.get(
        // eslint-disable-next-line comma-dangle
        'https://jsonplaceholder.typicode.com/todos'
      );
      const modifedTodo = data.map((todo: Todo, i: number) => ({
        ...todo,
        notes: '',
        createdAt: dayjs()
          .add(i + 4, 'day')
          .format('YYYY-MM-DD'),
        dueDate: dayjs()
          .add(i + 1, 'day')
          .format('YYYY-MM-DD'),
      }));
      this.$store.commit('getTodoData', modifedTodo);
    } catch (error) {
      console.log(error);
    }
  }

  created(): void {
    this.getTodos();
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/main.scss';
#app {
  height: 100vh;
}
</style>
