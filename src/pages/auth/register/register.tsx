import { Alert, Button, CardContent, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertBoxContext } from "../../../context/AlertBoxContext";
import { POST } from "../../../utils/axios";

import "./register.scss";

const RegisterPage = () => {
  const { setMessage } = useContext(AlertBoxContext);
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputsHandler = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await POST("auth/register", registerForm)
      .then((res) => {
        setMessage({
          displayMessage: "the user has been registered successfull",
          type: "success",
          isOpen: true,
        });
        gotoLogin();
      })
      .catch((err) => {
        setMessage({
          displayMessage: "Internal Server Error",
          type: "error",
          isOpen: true,
        });
      });
  };

  const gotoLogin = () => {
    navigate("/auth/login");
  };
  return (
    <div className="container">
      <CardContent className="card">
        <form onSubmit={onFormSubmit}>
          <TextField
            id="outlined-basic"
            type={"text"}
            label="Name"
            name="name"
            value={registerForm.name}
            onChange={inputsHandler}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            type={"email"}
            label="Email"
            name="email"
            value={registerForm.email}
            onChange={inputsHandler}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            name="password"
            value={registerForm.password}
            onChange={inputsHandler}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Confirm Password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={inputsHandler}
            variant="outlined"
            required
          />
          <Button type="submit" className="button" variant="contained">
            Register
          </Button>
          <Button className="button" variant="outlined" onClick={gotoLogin}>
            Login
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default RegisterPage;
