import { useState } from "react";
import Todo from "../../components/todo/Todo";
import SubmitTodo from "../../components/submitTodo/SubmitTodo";
import Button from "../../components/button/Button";
import InputIcon from "../../components/inputIcon/InputIcon";
import { UseLocalStorage } from "../../hooks/localStorage";

import "./ToDoApp.styles.css";

function ToDoApp() {
  const [todos, setTodos] = UseLocalStorage("my-todo", []);
  const [searchString, setSearchString] = useState("");

  //Search Todo
  const filteredSearch = todos.filter((todo) =>
    todo.todo.toLocaleLowerCase().includes(searchString)
  );

  const searchHandler = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    setSearchString(searchField);
  };

  //Open new Todo Tab

  const [newTodoTab, setnewTodoTab] = useState(false);

  const openNewTodoTabHandler = () => {
    setnewTodoTab(!newTodoTab);
  };

  //New Todos

  const [newTodo, setNewTodo] = useState("");

  const newTodoHandler = (event) => {
    setNewTodo(event.target.value);
  };

  //New Todo Submit

  const toDoSubmit = (event) => {
    event.preventDefault();

    let idKeyNum = Math.floor(Math.random() * 100000 + 1);

    const toDoObject = {
      id: idKeyNum,
      todo: newTodo,
    };

    setTodos([...todos, toDoObject]);
    setNewTodo("");
    setnewTodoTab(!newTodoTab);
  };

  //Update Todo

  const updateToDo = (todoId, newTodoValue) => {
    const [findTodo] = [...todos].filter((todo) => todo.id === todoId);
    findTodo.todo = newTodoValue;
    setTodos(todos);
  };

  //delete Todo

  const deleteToDo = (todoId) => {
    const removeToDo = [...todos].filter((todo) => todo.id !== todoId);
    setTodos(removeToDo);
  };

  // set todos to localstorage

  return (
    <section className="todoApp">
      <div className="todoAppHeader">
        <h2>Create Your To Do</h2>
      </div>

      <div className="myTodoList">
        <div className="searchTodoHeader">
          <div className="inputStretch">
            <InputIcon
              icon="search"
              type="text"
              placeholder="Search"
              id="todoSearch"
              name="todoSearch"
              onChange={searchHandler}
            />
          </div>
          <div className="btnNormal">
            <Button
              buttonType={`${newTodoTab ? "close" : "new"}`}
              type="submit"
              onClick={openNewTodoTabHandler}
            >
              {newTodoTab ? "Close" : "New"}
            </Button>
          </div>
        </div>
        <div className={`newTodoTab ${newTodoTab ? "active" : ""}`}>
          <SubmitTodo
            submitFunction={toDoSubmit}
            value={newTodo}
            onChangeValue={newTodoHandler}
          />
        </div>
        <ul className="todoList">
          {filteredSearch.map((todo) => {
            return (
              <li key={todo.id}>
                <Todo
                  todo={todo}
                  updateToDo={updateToDo}
                  deleteToDo={deleteToDo}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ToDoApp;
