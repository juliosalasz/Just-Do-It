import "./App.css";
import ToDoApp from "./routes/toDoApp/ToDoApp";
import Login from "./routes/login/Login";
import { Fragment } from "react";
import Button from "./components/button/Button";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";

import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { SignOutUser } from "./utils/firebase";

/*

whats left

Improvements

Destructure login

Write Readme.MD

Upload to github




*/

function App() {
  const { currentUser, isLoading } = useContext(UserContext);

  const signOutHandler = async () => {
    await SignOutUser();
  };
  return (
    <Fragment>
      <nav className="header">
        <h1>JUST DO IT</h1>
        {isLoading ? (
          ""
        ) : (
          <Fragment>
            {currentUser ? (
              <Button buttonType="logout" onClick={signOutHandler}>
                Log Out
              </Button>
            ) : null}
          </Fragment>
        )}
      </nav>

      <section className="home">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>{currentUser ? <ToDoApp /> : <Login />}</Fragment>
        )}
      </section>
    </Fragment>
  );
}

export default App;
