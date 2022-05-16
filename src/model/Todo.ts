/* eslint-disable comma-dangle */
class Todo {
  id: number | string;

  title: string;

  notes?: string;

  createdAt: string;

  dueDate: string;

  completed?: boolean;

  userId: number;

  constructor(
    id: number | string,
    title: string,
    notes: string,
    createdAt: string,
    dueDate: string,
    completed = false,
    userId = 1
  ) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.completed = completed;

    this.userId = userId;
  }
}

export default Todo;
