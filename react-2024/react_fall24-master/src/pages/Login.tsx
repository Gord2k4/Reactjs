 import { SubmitHandler } from "react-hook-form";
import { loginUser, User } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";

export default function Login() {
  const nav = useNavigate();

  const handleLogin: SubmitHandler<User> = (values) => {
    loginUser(values)
      .then(({ data }) => {
        
        toast.success("Đăng Ký Thành Công !");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        nav("/");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
}
