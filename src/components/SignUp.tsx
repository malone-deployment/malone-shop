import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSchemeSignUp } from "../model/user-authentication-model";

export function SignUp() {
  const navigate = useNavigate();
  const [inputfirstName, setfirstName] = useState("");
  const [inputLastName, setLastName] = useState("");
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");

  const data: UserSchemeSignUp = {
    determineStats: "signup",
    firstName: inputfirstName,
    lastName: inputLastName,
    email: inputEmail,
    password: inputPassword,
  };

  const handleChange1 = (event: any) => {
    setfirstName(event.target.value);
  };

  const handleChange2 = (event: any) => {
    setLastName(event.target.value);
  };

  const handleChange3 = (event: any) => {
    setEmail(event.target.value);
  };

  const handleChange4 = (event: any) => {
    setPassword(event.target.value);
  };

  function handleSubmit(event: any) {
    if (inputfirstName && inputLastName && inputEmail && inputPassword) {
      const url =
        "https://script.google.com/macros/s/AKfycbx9VQRAfoN_71JPl77jynNfYpnzKSQQKZs8-LNWg-9BlexMG1Oq9oZStm9PtE40DTE0/exec";
      fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }).then((response) => {
        response
          .json()
          .then((result) => {
            console.log(result.realData);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        navigate("/");
      });

      setfirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
    event.preventDefault();
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
            name="myForm"
            onSubmit={handleSubmit}
            className="col s12 m6 white-text text-darken-2"
            style={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "",
            }}
          >
            <div className="input-field col s12">
              <input
                id="firstName"
                type="text"
                className="validate"
                value={inputfirstName}
                onChange={handleChange1}
              />
              <label className="active" htmlFor="firstName">
                First Name
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="lastName"
                type="text"
                className="validate"
                value={inputLastName}
                onChange={handleChange2}
              />
              <label className="active" htmlFor="lastName">
                Last Name
              </label>
            </div>
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
            onClick={() => navigate("/")}
            className="waves-effect waves-light white-text text-darken-1"
          >
            Login
          </p>
        </div>
      </div>
    </>
  );
}
