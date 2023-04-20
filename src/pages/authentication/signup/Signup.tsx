import React from "react";
import { Grid, FormGroup, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";

import Button from "@component/Button";
import chatHttpService from "@utils/chatHttpService";
import { SignupForm } from "@interfaces/form";
import useGlobalSnackbar from "@hooks/useGlobalSnackbar";

const SignpuFormSchema = yup.object().shape({
  firstName: yup.string().required("This field must be required."),
  lastName: yup.string().required("This field must be required."),
  email: yup
    .string()
    .required("This field must be required.")
    .email("Invalid Email address"),
  password: yup.string().required("This field must be required.")
});

const resolver = yupResolver(SignpuFormSchema);

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupForm>({
    resolver,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });
  const { openSnackbar } = useGlobalSnackbar();

  const handleSignup = async (values) => {
    try {
      const response = await chatHttpService.register(values);
      chatHttpService.setLS("userid", response.data.userId);
      openSnackbar({
        color: "success",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message: "Signup is succeed, Please Signin.",
        autoHideDuration: 3000
      });
    } catch (error) {
      const { response } = error as AxiosError;
      openSnackbar({
        color: "error",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message:
          Object.values(response?.data || {})[0] ||
          "Signup request is failre, Please try again later.",
        autoHideDuration: 3000
      });
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => handleSignup(data))}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  placeholder="Input your first name."
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  placeholder="Input your last name."
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  placeholder="Input email address."
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  type="password"
                  placeholder="Input password."
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" gradient rounded fullWidth>
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
