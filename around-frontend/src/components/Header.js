import logo from "../images/logo.svg";
import { React, Route, Link } from "react-router-dom";

function Header({ onSignOut, email }) {
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="Header">
      <div className="header__wrapper">
      <img className="header__logo" src={logo} alt="around the u.s logo" />
        <Route exact path="/">
          <div className="header__content">
            <p className="header__user">{email}</p>
            <button className="header__logout" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </Route>
        <Route path="/signup">
          <Link className="header__auth-link" to="signin">
            Sign in
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__auth-link" to="signup">
            Sign up
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
