<template>
  <div class="todo">
    <div class="todo_header">
      <div class="left">
        <div class="checkbox_wrapper">
          <input
            type="checkbox"
            :checked="localTodo.completed"
            @change="completeTodo($event)"
          />
          <span
            class="checkmark"
            :class="{ completed: localTodo.completed }"
          ></span>
        </div>
        <div
          class="content text_content input_wrapper"
          @click="toggleTodoNotes"
        >
          <input v-if="edit" v-model="localTodo.title" />
          <p v-else>{{ localTodo.title }}</p>
          <div class="due_date_content">
            <CalendarIcon />
            <span>Due {{ dueDate }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="edit_mode">
          <img
            v-if="!edit"
            class="icon edit"
            src="@/assets/icons/editing.svg"
            @click="editEnable"
          />
          <img
            v-else
            class="icon edit"
            src="@/assets/icons/floppy-disk.svg"
            @click="updateTodo"
          />
        </div>
        <img
          class="icon delete"
          src="@/assets/icons/delete.svg"
          @click="deleteTodo"
        />
        <img
          class="icon chevron"
          :class="{ rotate: showNotes }"
          src="@/assets/icons/down-chevron.svg"
          @click="toggleTodoNotes"
        />
      </div>
    </div>
    <div class="todo_notes" :class="{ show_notes: showNotes }">
      <textarea
        v-if="edit"
        :placeholder="localTodo.notes ? null : 'Type your notes hear..'"
        v-model="localTodo.notes"
      />
      <div v-else>
        <div v-if="localTodo.notes">{{ localTodo.notes }}</div>
        <div v-else>No notes...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line object-curly-newline
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import TodoModal from '@/model/Todo';
import timeDifference from '@/utils/timeDiff';
import CalendarIcon from './CalendarIcon.vue';

@Component({
  components: {
    CalendarIcon,
  },
})
export default class Todo extends Vue {
  @Prop() todo!: TodoModal;

  @Prop() inEditIndex!: number;

  @Prop() todoIndex!: number;

  public edit = false;

  public showNotes = false;

  public localTodo: TodoModal | Record<string, unknown> = {};

  deleteTodo(): void {
    const todoIndex = this.$store.state.todos.findIndex(
      (todo: TodoModal) => todo.id === this.todo.id
    );
    console.log(this.todoIndex);
    this.$store.commit('deleteTodo', todoIndex);
  }

  notification(): void {
    const settingsObject = {
      singular: true,
      position: 'top-right',
      successDuration: 2000,
      hideProgressbar: true,
    };
    (this as any).$vToastify.setSettings(settingsObject);

    if (this.localTodo.completed) {
      (this as any).$vToastify.success('Todo Completed');
    } else {
      (this as any).$vToastify.success('Todo Updated');
    }
  }

  completeTodo(event: any): void {
    const todoIndex = this.$store.state.todos.findIndex(
      (todo: TodoModal) => todo.id === this.todo.id
    );
    this.localTodo.completed = event.target.checked;
    setTimeout(() => {
      this.notification();
      this.$store.commit('updateTodo', {
        index: todoIndex,
        content: { ...this.localTodo },
      });
    }, 1500);
  }

  updateTodo(): void {
    const todoIndex = this.$store.state.todos.findIndex(
      (todo: TodoModal) => todo.id === this.todo.id
    );
    this.notification();

    if (todoIndex === -1) return;
    this.$store.commit('updateTodo', {
      index: todoIndex,
      content: { ...this.localTodo },
    });

    if (this.edit) {
      this.edit = false;
      this.showNotes = false;
    }
  }

  toggleTodoNotes(): void {
    if (this.edit) return;
    this.showNotes = !this.showNotes;
  }

  get dueDate(): string {
    return timeDifference(this.todo.dueDate);
  }

  @Emit('enableEdit')
  editEnable(): number {
    this.edit = true;
    this.showNotes = true;
    return this.todoIndex;
  }

  @Watch('inEditIndex')
  updateInEditMode(index: number): void {
    if (index !== this.todoIndex) {
      this.edit = false;
      this.showNotes = false;
    }
  }

  created(): void {
    this.localTodo = { ...this.todo };
  }
}
</script>

<style scoped lang="scss">
.todo {
  position: relative;
  width: 100%;
  min-height: 0;
  margin-bottom: 2rem;
  background-color: rgb(43, 43, 43);
  border-radius: 1rem;
  border: 1px solid #2b2b2b;
  overflow: hidden;
  box-shadow: 0px -1px 5px 0px rgb(21, 27, 30);
  transition: 0.5s;

  &_header {
    display: flex;
    min-height: 8rem;
    .left {
      position: relative;
      display: flex;
      align-items: center;
      width: 85%;
      padding: 2rem;
      .checkbox_wrapper {
        position: relative;
        width: 2rem;
        input {
          position: absolute;
          top: -1.3rem;
          height: 3rem;
          width: 3rem;
          opacity: 0;
          cursor: pointer;
          z-index: 1;
          &:checked ~ .checkmark:after {
            display: block;
          }
        }

        .checkmark {
          position: absolute;
          top: -1.5rem;
          left: 0;
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          border: 1px solid #ff0088;
          &.completed {
            background: #ff0088;
          }
          &:after {
            content: '';
            position: absolute;
            left: 1.1rem;
            top: 0.4rem;
            display: none;
            width: 0.4rem;
            height: 1.3rem;
            border: solid #ffffff;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }
      }
      .content {
        display: inherit;
        align-items: center;
        margin-left: 3rem;
        width: 100%;
        height: 4rem;
        font-size: 1.3rem;
        cursor: pointer;
        @media screen and (max-width: 768px) {
          font-size: 1.2rem;
        }
        &.input_wrapper {
          text-transform: uppercase;
          input {
            width: 100%;
            background: none;
            outline: none;
            border: none;
            border-bottom: 1px solid #606060;
            font-size: inherit;
            color: #ffffff;
            text-transform: uppercase;
          }
        }
        .due_date_content {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          height: 3rem;
          text-transform: none;
          span {
            display: inline-block;
            margin-left: 1rem;
            color: #ff0088;
          }
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 15%;
      padding-right: 2rem;
      height: inherit;
      .edit_mode {
        display: inherit;
        height: 100%;
      }
      .icon {
        width: 1.75rem;
        cursor: pointer;
        &.delete {
          opacity: 0.3;
          transition: all 0.5s ease;
          &:hover {
            opacity: 1;
          }
        }
        &.chevron {
          transform: rotate(0);
          transition: all 0.5s ease;
          &.rotate {
            transform: rotate(180deg);
            transition: all 0.5s ease;
          }
        }
      }
    }
  }
  &_notes {
    max-height: 0;
    padding: 0 2rem;
    overflow: hidden;
    background-color: #131313;
    transition: all 0.5s ease;
    &.show_notes {
      max-height: 20rem;
      padding: 2rem;
      transition: 0.5s ease;
    }
    textarea {
      width: 100%;
      height: 15rem;
      padding: 2rem;
      background-color: rgb(66, 66, 66);
      resize: none;
      border: none;
      border-radius: 1rem;
      outline: none;
      color: #ffffff;
    }
  }
}
</style>
