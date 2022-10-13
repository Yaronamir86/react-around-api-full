import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
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
            onChange={handleChange}
            value={data.email}
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
            onChange={handleChange}
            value={data.password}
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
