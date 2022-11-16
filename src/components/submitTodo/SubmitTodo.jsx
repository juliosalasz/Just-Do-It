import Button from "../button/Button";
import InputIcon from "../inputIcon/InputIcon";

import "./SubmitTodo.styles.css";

function SubmitTodo({ submitFunction, value, onChangeValue }) {
  return (
    <form onSubmit={submitFunction}>
      <div className="createTodoHeader">
        <div className="inputStretch">
          <InputIcon
            icon="none"
            type="text"
            id="updateToDo"
            name="updateToDo"
            value={value}
            onChange={onChangeValue}
            maxLength="15"
            required
          />
        </div>
        <div className="btnNormal">
          <Button buttonType="save" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SubmitTodo;
