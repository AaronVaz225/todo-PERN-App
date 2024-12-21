import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      //this updates the setTodos array to filter out the id that was just deleted
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  }

  //get todo function
  async function getTodos() {
    const res = await fetch("http://localhost:5000/todos"); //fetch is get by default

    const todoArray = await res.json();

    setTodos(todoArray);
  }

  //currently, use effect only runs once (when component first mounts), since dependency array is empty
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr> */}
          {/* the key is just a unique key for each table row*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
