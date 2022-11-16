import "./Button.styles.css";

const BUTTON_TYPE_CLASSES = {
  new: "newToDo",
  save: "saveToDo",
  logout: "logoutUser",
  login: "logIn",
  disabled: "disabled",
  disabledSave: "disabledSave",
  close: "close",
};

function Button({ children, buttonType, ...otherProps }) {
  return (
    <button
      className={`buttonContainer ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
