import React from "react";
import FormWrapper from "./FormWrapper";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    hashedPassword: string;
  }>();

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className="text-3xl font-bold">Register</h1>

      <div className="flex flex-col gap-2">
        <div className="flex  w-full flex-col justify-center">
          <label htmlFor="email" className="w-1/5 text-sm font-bold">
            Email
          </label>
          <input
            type="email"
            className="rounded border-2 bg-gray-100 p-2"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col  justify-center">
          <label htmlFor="password" className="w-1/5 text-sm font-bold">
            Password
          </label>
          <input
            type="password"
            className=" grow  rounded border-2 bg-gray-100 p-2"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-1/2 rounded bg-blue-500 p-2  text-white"
        >
          Register
        </button>
      </div>
    </FormWrapper>
  );
};

export default RegisterForm;
