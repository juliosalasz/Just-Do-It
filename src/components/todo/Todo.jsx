import { useState } from "react";
import SubmitTodo from "../submitTodo/SubmitTodo";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import "./Todo.styles.css";

function Todo({ todo, updateToDo, deleteToDo }) {
  //open Tab
  const [openTab, setOpenTab] = useState(false);

  const updateTodoTabHandler = () => {
    setOpenTab(!openTab);
  };

  //updateTodo

  const [newUpdateToDO, setNewUpdateToDo] = useState(todo.todo);

  const updateValue = (event) => {
    setNewUpdateToDo(event.target.value);
    console.log(event.target.value);
  };

  const updateToDoHandler = (event) => {
    event.preventDefault();

    setOpenTab(!openTab);

    updateToDo(todo.id, newUpdateToDO);
  };

  return (
    <div key={todo.id} className="toDo">
      {openTab ? (
        <SubmitTodo
          submitFunction={updateToDoHandler}
          value={newUpdateToDO}
          onChangeValue={updateValue}
        />
      ) : (
        <div className="todoContent">
          <h3>{todo.todo}</h3>
          <div className="controls">
            <span onClick={updateTodoTabHandler}>
              <PencilSquareIcon className="controlIcon" />
            </span>
            <span
              onClick={() => {
                deleteToDo(todo.id);
              }}
            >
              <TrashIcon className="controlIcon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
