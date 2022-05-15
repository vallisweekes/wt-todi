<template>
  <div class="modal" :class="{ show_modal: showModal }">
    <div class="modal_bg" @click="$emit('close')"></div>
    <div class="modal_content">
      <h2>Add A New Todo</h2>
      <div class="modal_content_form">
        <div class="form_item input_title">
          <label>Title</label>
          <input v-model="newTodo.title" />
        </div>
        <div class="form_item input_notes">
          <label>Notes</label>
          <textarea v-model="newTodo.notes" />
        </div>
        <div class="btn_wrapper">
          <div class="btn cancel" @click="$emit('close')">Cancel</div>
          <div class="btn add" @click="addTodo">Add</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import TodoModel from '@/model/Todo';

@Component
export default class Todo extends Vue {
  @Prop() showModal!: boolean;

  newTodo = { title: '', notes: '' };

  addTodo(): void {
    const id = uuidv4();
    const date = dayjs().format('DD/MM/YYYY');
    const todo = new TodoModel(
      id,
      this.newTodo.title,
      this.newTodo.notes,
      date
    );
    if (this.newTodo.title === '') return;
    this.$store.commit('addNewTodo', todo);
    this.$emit('close');
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
  transition: all 0.2s ease;
  &.show_modal {
    z-index: 3;
    opacity: 2;
    transition: all 0.25s ease;
  }
  .modal_bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    transition: all 0.25s ease;
    cursor: pointer;
  }
  .modal_content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    padding: 2rem;
    background-color: #161616;
    z-index: 3;
    border-radius: 1rem;
    border: 1px solid #b0b0b0;
    transform: translate(-50%, -50%);
    color: #ffffff;

    h2 {
      font-size: 4rem;
      text-align: center;
    }
    &_form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
      .form_item {
        width: 90%;
        margin-bottom: 2rem;
        label {
          display: block;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        input,
        textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #eee;
          border-radius: 0.5rem;
          outline: none;
        }
        input {
          height: 4rem;
        }
        textarea {
          height: 20rem;
          resize: none;
        }
      }
      .btn_wrapper {
        display: flex;
        .btn {
          min-width: 12rem;
          height: 5rem;
          border-radius: 1rem;
          line-height: 5rem;
          font-size: 2rem;
          text-align: center;
          cursor: pointer;

          &.cancel {
            background: #000000;
            margin-right: 2rem;
            &:hover {
              background: #2b2b2b;
            }
          }
          &.add {
            background: #f0f8ff;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>
