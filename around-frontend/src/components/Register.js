import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title">Sign up</h1>
        <fieldset className="register__fieldset">
          <input
            id="register__email"
            type="email"
            name="email"
            placeholder="Email"
            className="register__input register__input_type_email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
            required
          />
          <input
            id="register__password"
            type="password"
            name="password"
            placeholder="Password"
            className="register__input register__input_type__password"
            minLength="6"
            maxLength="12"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </fieldset>
        <button className="register__button" type="submit">
          Sign up
        </button>
      </form>
      <p className="register__Already-member">
        Already a member?{" "}
        <Link className="register__link" to="/signin">
          Sign in here!
        </Link>
      </p>
    </div>
  );
}

export default Register;
