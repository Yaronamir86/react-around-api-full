import React from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <fieldset className="login__fieldset">
          <input
            id="login__email"
            type="text"
            name="email"
            placeholder="Email"
            className="login__input login__input_type_email"
            minLength="2"
            maxLength="40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="login__password"
            type="password"
            name="password"
            placeholder="Password"
            className="login__input login__input_type__password"
            minLength="2"
            maxLength="12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </fieldset>
        <button className="login__button" type="submit">
          Log in
        </button>
      </form>
      <p className="login__not-member">
        Not a member yet?{" "}
        <Link className="login__link" to="/signup">
          Sign up here!
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
