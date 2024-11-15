import { useForm } from "react-hook-form";
import { User } from "../services/auth";

type AuthForm = {
  isRegister?: boolean;
  onSubmit: (values: User) => void;
};

export function AuthForm({ isRegister, onSubmit }: AuthForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {isRegister && (
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors?.username && (
            <small className="text-danger">{errors.username.message}</small>
          )}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <small className="text-danger">{errors.email.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="exampleInputPassword1"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 Characters required",
            },
          })}
        />
        {errors?.password && (
          <small className="text-danger">{errors.password.message}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
