import { useState } from "react";

import "./Login.styles.css";

import InputIcon from "../../components/inputIcon/InputIcon";
import Button from "../../components/button/Button";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase";

function Login() {
  let verificationTimer;

  //email verification
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const emailVerifier = (email) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const emailInputHandler = (event) => {
    if (event.target.value === null) {
      clearTimeout(verificationTimer);
      setEmailError(false);
    } else if (emailVerifier(event.target.value)) {
      clearTimeout(verificationTimer);
      setEmail(event.target.value);
      setEmailError(false);
    } else {
      clearTimeout(verificationTimer);
      verificationTimer = setTimeout(() => {
        setEmailError(true);
      }, "1000");
    }
  };

  //password verification

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordInputHandler = (event) => {
    const passwordString = event.target.value;
    if (passwordString.length === 0) {
      clearTimeout(verificationTimer);
      setPasswordError(false);
    } else if (passwordString.length >= 4) {
      clearTimeout(verificationTimer);
      setPassword(passwordString);
      setPasswordError(false);
    } else {
      clearTimeout(verificationTimer);
      verificationTimer = setTimeout(() => {
        setPasswordError(true);
      }, "1000");
    }
  };

  // Submit
  const [isLoading, setIsLoading] = useState(false);

  // Login Button Check

  const enabled = email.length > 0 && password.length > 0 && !isLoading;

  const [errorMessage, setErrorMessage] = useState("");

  const emailAndPasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) return;
      setIsLoading(false);
    } catch (error) {
      //For types of errors
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMessage("Incorrect Password For Email");
          break;
        case "auth/user-not-found":
          setErrorMessage("No user Associated with this email");
          break;
        default:
          console.log("User login encountered an error", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="loginHeader">
        <h2>Login</h2>
      </div>
      <div className="loginFormContainer">
        <form
          onSubmit={emailAndPasswordSubmit}
          className="loginForm"
          autoComplete="off"
        >
          <div className="loginInput">
            <div className="loginLabel">
              <label htmlFor="email" className="formLabel">
                Email
              </label>
            </div>

            <InputIcon
              inputError={emailError}
              icon="email"
              type="text"
              id="email"
              name="email"
              placeholder="user@test.com"
              maxLength="50"
              autoComplete="off"
              onChange={emailInputHandler}
            />
            {emailError ? (
              <div className="inputError">
                <h3>Email is not valid</h3>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="loginInput">
            <div className="loginLabel">
              <label htmlFor="password">Password</label>
            </div>

            <InputIcon
              inputError={passwordError}
              icon="password"
              type="password"
              id="password"
              name="password"
              placeholder="Password must be at least 4 characters"
              minLength="4"
              maxLength="16"
              autoComplete="new-password"
              onChange={passwordInputHandler}
            />
            {passwordError ? (
              <div className="inputError">
                <h3>Password has to be at least 4 characters</h3>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="btnContainer">
            <Button
              buttonType={enabled ? "login" : "disabled"}
              disabled={enabled ? false : true}
            >
              Login
            </Button>
          </div>
          {errorMessage}
        </form>
      </div>
      <div className="info">
        <h2>To enter use:</h2>
        <h3>test30@test.com</h3>
        <h3>Test1234</h3>
      </div>
    </section>
  );
}

export default Login;
