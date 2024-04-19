import React from "react";
import { useStoreState } from "easy-peasy";
import { useHistory } from 'react-router-dom';
import { logout } from "../../http/ApiService";
import {onLogout} from "../../store-handlers";

function Navbar() {
  const isLogged = useStoreState((state) => state.isLogged);
  const history = useHistory();
  const logoutUser = () => {
    async function logoutCall() {
      let result = await logout();
      if (result.status === 200) {
        onLogout();
        history.push("/login");
      }
    }
    logoutCall();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid m-0 p-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          // data-bs-target="#navbarSupportedContent"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="navbar-collapse collapse  justify-content-between mx-auto"
          id="navbarSupportedContent"
        >
          <div
            className="d-flex flex-column flex-lg-row py-lg-3 navbar align-items-start justify-content-between mx-auto"
            style={{ width: "80%" }}
          >
            <div>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link p-0 py-2" href="/" data-toggle="collapse" data-target="#navbarSupportedContent">
                    home
                  </a>
                </li>
              </ul>

            </div>
            <div>
              {!isLogged ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a href="/register" className="nav-link" data-toggle="collapse" data-target="#navbarSupportedContent">
                      register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login" data-toggle="collapse" data-target="#navbarSupportedContent">
                      login
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item" >
                    <a className="nav-link p-2 py-2" href="/dashboard" data-toggle="collapse" data-target="#navbarSupportedContent">
                      dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <button data-toggle="collapse" data-target="#navbarSupportedContent" className="btn btn-link logout py-2" onClick={logoutUser}>
                      logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
