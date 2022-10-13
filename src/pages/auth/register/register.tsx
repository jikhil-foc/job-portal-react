import { Button, CardContent, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertBoxContext } from "../../../context/AlertBoxContext";
import { POST } from "../../../utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./register.scss";

const RegisterPage = () => {
  const { setMessage } = useContext(AlertBoxContext);
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    email: Yup.string()
      .email("Please enter valid Email")
      .required("Email Required"),
    password: Yup.string()
      .required("Password required")
      .min(6, "Password must be at 6 char long"),
    confirmPassword: Yup.string()
      .required("Password is mendatory")
      .min(6, "Password must be at 6 char long")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onFormSubmit = (data: any): void => {
    POST("auth/register", data)
      .then((res: any) => {
        setMessage({
          displayMessage: res.data.message,
          type: "success",
          isOpen: true,
        });
        gotoLogin();
      })
      .catch((err) => {
        setMessage({
          displayMessage: err.response.data.message,
          type: "error",
          isOpen: true,
        });
      });
  };

  const gotoLogin = () => {
    //console.log(errors);
    navigate("/auth/login");
  };
  return (
    <div className="container">
      <CardContent className="card">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <h1
            style={{
              textAlign: "center",
              color: "#1986dd",
            }}
          >
            Register
          </h1>
          <TextField
            id="outlined-basic"
            type={"text"}
            label="Name"
            variant="outlined"
            {...register("name", { required: true })}
            error={errors.name ? true : false}
            helperText={errors?.name?.message?.toString() ?? ""}
            required
          />
          <TextField
            id="outlined-basic"
            type={"email"}
            label="Email"
            {...register("email", { required: true })}
            error={errors.email ? true : false}
            helperText={errors?.email?.message?.toString() ?? ""}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Password"
            {...register("password", { required: true, minLength: 8 })}
            error={errors.password ? true : false}
            helperText={errors?.password?.message?.toString() ?? ""}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            type={"password"}
            label="Confirm Password"
            {...register("confirmPassword", { required: true, min: 8 })}
            error={errors.confirmPassword ? true : false}
            helperText={errors?.confirmPassword?.message?.toString() ?? ""}
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
