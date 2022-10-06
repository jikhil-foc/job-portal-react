import { Button, CardContent, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./login.scss";
const LoginPage = () => {
  const navigate = useNavigate();
  const gotoRegister = () => {
    navigate("/auth/register");
  };
  return (
    <div className="container">
      <CardContent className="card">
        <TextField
          id="outlined-basic"
          type={"email"}
          label="Email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          type={"password"}
          label="Password"
          variant="outlined"
        />
        <Button className="button" variant="contained">
          Login
        </Button>
        <Button className="button" variant="outlined" onClick={gotoRegister}>
          Register
        </Button>
      </CardContent>
    </div>
  );
};

export default LoginPage;
