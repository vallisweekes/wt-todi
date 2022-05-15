/* eslint-disable object-curly-newline */
<template>
  <div class="wrapper">
    <AddTodoModal :showModal="showModal" @close="closeModal" />
    <div class="top_area">
      <div class="icon__holder">
        <img src="@/assets/icons/plus.svg" @click="showAddTodoModal" />
      </div>
      <p>Add New Todo</p>
    </div>
    <div v-if="numberOfPages > 0" class="pagination pagination_top">
      <div
        class="chevron chevron_previous"
        :class="{ hide_chevron: currentPage === 1 }"
      >
        <img
          src="@/assets/icons/down-chevron.svg"
          alt="previous"
          @click="previousPage"
        />
      </div>
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="pagination_item"
        :class="{ active: currentPage === index + 1 }"
        @click="changePage(index + 1)"
      >
        {{ page + 1 }}
      </div>
      <div
        class="chevron chevron_next"
        :class="{ hide_chevron: startPage === numberOfPages }"
      >
        <img
          src="@/assets/icons/down-chevron.svg"
          alt="next"
          @click="nextPage"
        />
      </div>
    </div>
    <div v-if="paginatedTodos" class="todo__container">
      <Todo
        v-for="(todo, index) in paginatedTodos"
        :key="todo.id"
        :todo="todo"
        :todoIndex="index"
        :inEditIndex="inEditIndex"
        @enableEdit="editing"
      />
    </div>

    <div v-else>You have no todos</div>
    <div v-if="numberOfPages === 0">No todos found</div>
    <div v-if="numberOfPages > 0" class="pagination pagination_bottom">
      <div
        class="chevron chevron_previous"
        :class="{ hide_chevron: currentPage === 1 }"
      >
        <img
          src="@/assets/icons/down-chevron.svg"
          alt="previous"
          @click="previousPage"
        />
      </div>
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="pagination_item"
        :class="{ active: currentPage === index + 1 }"
        @click="changePage(index + 1)"
      >
        {{ page + 1 }}
      </div>
      <div
        class="chevron chevron_next"
        :class="{ hide_chevron: startPage === numberOfPages }"
      >
        <img
          src="@/assets/icons/down-chevron.svg"
          alt="next"
          @click="nextPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line indent
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AddTodoModal from '@/components/AddTodoModal.vue';
import Todo from '@/components/Todo.vue';
import TodoModel from '@/model/Todo';

@Component({
  components: {
    Todo,
    AddTodoModal,
  },
})
export default class TodoWrapper extends Vue {
  @Prop() allTodos!: TodoModel[];

  numberOfTodos = 0;

  todosPerPage = 10;

  currentPage = 1;

  showModal = false;

  inEditIndex: null | number = null;

  editing(index: number): void {
    this.inEditIndex = index;
  }

  showAddTodoModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  changePage(index: number): void {
    this.currentPage = index;
  }

  nextPage(): void {
    if (this.currentPage <= this.startPage) {
      this.currentPage += 1;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage -= 1;
  }

  @Watch('allTodos', { immediate: true })
  updateNumberOfTodos(todos: Todo[]): void {
    this.numberOfTodos = todos.length;
  }

  get paginatedTodos(): TodoModel[] {
    const start = (this.currentPage - 1) * this.todosPerPage;
    const end = start + this.todosPerPage;
    return this.allTodos.slice(start, end);
  }

  get numberOfPages(): number {
    return Math.ceil(this.numberOfTodos / this.todosPerPage);
  }

  get startPage(): number {
    if (this.currentPage === 1) return 1;
    return this.currentPage;
  }

  get pages(): number[] {
    const pageNumbers = [];
    for (let i = 0; i < this.numberOfPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 65%;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 85%;
  }

  .top_area {
    display: flex;
    align-items: center;
    height: 6rem;
    margin-bottom: 8rem;
    user-select: none;
    .icon__holder {
      display: inherit;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 6rem;
      margin-right: 4rem;
      border-radius: 50%;
      background-color: #f0f8ff;
      transform: rotate(0deg);
      transition: width transform 0.5s ease;
      cursor: pointer;
      &:hover img {
        width: 75%;
        transform: rotate(90deg);
        transition: all 0.25s ease;
      }
      img {
        width: 60%;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    &_top {
      margin-bottom: 2rem;
    }
    &_bottom {
      margin-top: 2rem;
    }

    &_item {
      display: flex;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      &:not(:last-of-type) {
        margin-right: 0.5rem;
      }
      cursor: pointer;
      &.active {
        background-color: rgb(255, 0, 136);
        border-radius: 0.5rem;
      }
    }
    .chevron {
      display: flex;
      width: 2rem;
      visibility: visible;
      &.hide_chevron {
        visibility: hidden;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
      &_previous {
        margin-right: 1.5rem;
        img {
          transform: rotate(90deg);
        }
      }
      &_next {
        margin-left: 1rem;
        img {
          transform: rotate(270deg);
        }
      }
    }
  }
}
</style>
