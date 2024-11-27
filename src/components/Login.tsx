import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserInformation,
  UserSchemeLogin,
} from "../model/user-authentication-model";

export function Login() {
  const navigate = useNavigate();

  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");

  const data1: UserSchemeLogin = {
    determineStats: "signin",
    email: inputEmail,
    password: inputPassword,
  };

  const handleChange3 = (event: any) => {
    setEmail(event.target.value);
  };

  const handleChange4 = (event: any) => {
    setPassword(event.target.value);
  };

  async function handleSubmit1(event: any) {
    event.preventDefault();

    if (inputEmail && inputPassword) {
      try {
        const url =
          "https://script.google.com/macros/s/AKfycbx9VQRAfoN_71JPl77jynNfYpnzKSQQKZs8-LNWg-9BlexMG1Oq9oZStm9PtE40DTE0/exec";

        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data1),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        });

        const result = await response.json();
        const message = result.status;
        alert(message);
        const finalResult: UserInformation = {
          email: result.email,
          firstName: result.firstName,
          id: result.id,
          lastName: result.lastName,
          password: result.password,
        };

        localStorage.setItem("key", JSON.stringify(finalResult));

        if (result.status !== "invalid credentials") navigate("/Home");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <>
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "0",
        }}
      >
        <div>
          <form
            name="myForm1"
            onSubmit={handleSubmit1}
            className="col s12 m6 white-text text-darken-2"
            style={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "",
            }}
          >
            <div className="input-field col s12">
              <input
                id="email"
                type="text"
                className="validate"
                value={inputEmail}
                onChange={handleChange3}
              />
              <label className="active" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="password"
                type="text"
                className="validate"
                value={inputPassword}
                onChange={handleChange4}
              />
              <label className="active" htmlFor="password">
                Password
              </label>
            </div>
            <button type="submit" className="waves-effect waves-light btn">
              Submit
            </button>
          </form>
          <p
            onClick={() => navigate("/SignUp")}
            className="waves-effect  waves-light white-text text-darken-1"
          >
            Create New Account
          </p>
        </div>
      </div>
    </>
  );
}
