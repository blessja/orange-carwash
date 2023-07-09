import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ isShowLogin }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`${isShowLogin ? "active" : ""} show`}
    >
      <div className="login-form">
        <div className="form-box solid">
          <button type="submit" className="btn btn-block">
            <Link style={{color: "#fff"}} to="/staff/login">Carwash Login</Link>
          </button>
          <button type="submit" className="btn btn-block">
            <Link style={{color: "#fff"}} to="/login">Customer Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
