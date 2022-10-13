import { Button, CardContent, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertBoxContext } from "../../../context/AlertBoxContext";
import { POST } from "../../../utils/axios";
import { setDataToLocalStorage } from "../../../utils/localstorageUtils";
import style from "./login.module.scss";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { setMessage } = useContext(AlertBoxContext);
  const navigate = useNavigate();

  const gotoRegister = () => {
    navigate("/auth/register");
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid Email")
      .required("Email Required"),
    password: Yup.string()
      .required("Password required")
      .min(6, "Password must be at 6 char long"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onFormSubmit = (data: any) => {
    POST("auth/login", data)
      .then((res) => {
        setDataToLocalStorage("user", res.data.user);
        setDataToLocalStorage("access_token", res.data.access_token);

        if (res.data.user.role === "admin") {
          navigate("/portal/admin/dashboard");
        } else if (res.data.user.role === "user") {
          navigate("/portal/job/home");
        }
      })
      .catch((err) => {
        console.log(err);

        setMessage({
          displayMessage: "Internal Server Error",
          type: "error",
          isOpen: true,
        });
      });
  };

  return (
    <div className="container">
      <CardContent className={style["card"]}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <h1
            style={{
              textAlign: "center",
              color: "#1986dd",
            }}
          >
            Login
          </h1>
          <TextField
            id="outlined-basic"
            type={"email"}
            label="Email"
            variant="outlined"
            {...register("email", { required: true })}
            error={errors.email ? true : false}
            helperText={errors?.email?.message?.toString() ?? ""}
            required
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            variant="outlined"
            {...register("password", { required: true })}
            error={errors.password ? true : false}
            helperText={errors?.password?.message?.toString() ?? ""}
            required
          />

          <Button type="submit" className={style["button"]} variant="contained">
            Login
          </Button>
          <Button
            className={style["button"]}
            variant="outlined"
            onClick={gotoRegister}
          >
            Register
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default LoginPage;
