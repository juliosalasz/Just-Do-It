import "./InputIcon.styles.css";
import {
  UserIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

function InputIcon({ inputError, icon, ...otherProps }) {
  const inputIcon = (icon) => {
    switch (icon) {
      case "email":
        return <UserIcon />;
      case "password":
        return <LockClosedIcon />;
      case "search":
        return <MagnifyingGlassIcon />;
      default:
        return;
    }
  };

  return (
    <div className={`inputContainer ${inputError ? "error" : ""}`}>
      {icon ? <div className="inputIcon">{inputIcon(icon)}</div> : ""}

      <input {...otherProps} className="interiorInput" />
    </div>
  );
}

export default InputIcon;
