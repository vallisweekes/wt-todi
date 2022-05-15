/* eslint-disable implicit-arrow-linebreak */
<template>
  <div class="home">
    <div class="top__bar">
      <div class="top__bar_left">
        <h2>VW Todo</h2>
      </div>
      <div class="top__bar_right">
        <div class="input__wrapper">
          <input placeholder="Search..." v-model="searchText" />
          <img
            class="icon"
            :class="{ show_icon: searchText !== '' }"
            src="@/assets/icons/cancel.svg"
            @click="cancelSearchText"
          />
        </div>
        <p>Search</p>
      </div>
    </div>
    <div class="content__wrapper">
      <div class="side__bar">
        <div class="side__bar_heading">
          <div class="icon_wrapper">
            <img class="icon" src="@/assets/icons/filter-filled.svg" />
          </div>
          <h4>Filter</h4>
        </div>
        <div class="side__bar_filters">
          <div class="side_bar_item" @click="showTodos('default')">
            <div class="icon_wrapper">
              <img class="icon" src="@/assets/icons/invoice.svg" />
            </div>

            <p>My Todos</p>
          </div>
          <div class="side_bar_item" @click="showTodos('completed')">
            <div class="icon_wrapper">
              <img class="icon" src="@/assets/icons/checked.svg" />
            </div>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div class="todo_content_area">
        <TodoWrapper :allTodos="allTodos" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoWrapper from '@/components/TodoWrapper.vue'; // @ is an alias to /src
import TodoModel from '@/model/Todo';

@Component({
  components: {
    TodoWrapper,
  },
})
export default class Home extends Vue {
  currentView = 'default';

  searchText = '';

  showTodos(todoTypes: string): void {
    this.currentView = todoTypes;
  }

  cancelSearchText(): void {
    this.searchText = '';
  }

  get allTodos(): TodoModel[] {
    let searchTodos = [];
    let todosArray = [];
    if (this.searchText !== '') {
      this.$store.state.todos.forEach((todo: TodoModel) => {
        if (todo.title.includes(this.searchText.toLocaleLowerCase())) {
          searchTodos.push(todo);
        }
      });
    } else {
      searchTodos = this.$store.state.todos;
    }
    if (this.currentView === 'completed') {
      todosArray = searchTodos.filter((todo: TodoModel) => todo.completed);
    } else {
      todosArray = searchTodos.filter((todo: TodoModel) => !todo.completed);
    }
    return todosArray;
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;

  .top__bar {
    display: flex;
    height: 6rem;
    padding: 0 5rem;
    background-color: #20212c;
    border-bottom: 1px solid black;
    box-shadow: 0px 8px 7px 2px #000000;
    &_left {
      width: 30%;
      height: inherit;
      line-height: 6rem;
    }
    &_right {
      display: inherit;
      flex-grow: 1;
      line-height: 6rem;
      .input__wrapper {
        position: relative;
        width: 60%;
        margin-right: 4rem;
        input {
          width: 100%;
          height: 4rem;
          padding: 0 2rem;
          background-color: rgba(26, 26, 26, 0.284);
          border: none;
          outline: none;
          font-size: 1.8rem;
          color: #ffffff;
          border-bottom: 1px solid #bababa;
        }
        .icon {
          position: absolute;
          top: 2rem;
          right: 1rem;
          width: 1.5rem;
          opacity: 0;
          cursor: pointer;
          transition: 0.5s ease;
          &.show_icon {
            opacity: 1;
            transition: 0.5s ease;
          }
        }
      }
    }
  }

  .content__wrapper {
    display: flex;
    width: 100%;
    height: calc(100vh - 6rem);
    .side__bar {
      width: 35rem;
      padding-top: 10rem;
      background-color: #20212c;
      @media screen and (max-width: 768px) {
        width: 8rem;
      }
      .icon_wrapper {
        margin-right: 2rem;
        @media screen and (max-width: 768px) {
          margin-right: 0;
        }
      }
      &_text,
      &_filters {
      }
      &_heading {
        display: flex;
        font-size: 4rem;
        padding-left: 2rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid #bababa;
        @media screen and (max-width: 768px) {
          justify-content: center;
          padding-left: 0;
          h4 {
            display: none;
          }
        }
      }
      &_filters {
        .side_bar_item {
          display: flex;
          align-items: center;
          height: 7rem;
          font-size: 2.5rem;
          line-height: 7rem;
          padding: 0 2rem;
          margin-bottom: 0.5rem;
          background-color: #3d3d3d;
          cursor: pointer;
          @media screen and (max-width: 768px) {
            justify-content: center;
            p {
              display: none;
            }
          }
          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
    .todo_content_area {
      flex-grow: 1;
      background-color: #17181f;
      padding: 5rem 0;
      overflow-y: auto;
    }
  }
}
</style>
