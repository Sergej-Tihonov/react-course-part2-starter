import { useRef } from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => [savedTodo, ...(oldTodos || [])])
    }
  })
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form className="row mb-3" onSubmit={event => {
      event.preventDefault();
      if (!ref.current?.value) return;
      addTodo.mutate({
        id: 0,
        title: ref.current?.value || '',
        userId: 1,
        completed: false,
      })
    }}>
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
