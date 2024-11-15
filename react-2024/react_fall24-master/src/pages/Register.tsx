import { SubmitHandler } from "react-hook-form";
import { registerUser, User } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";

export default function Register() {
  const nav = useNavigate();

  const handleRegister: SubmitHandler<User> = (values) => {
    console.log("Dữ liệu gửi lên:", values);
    registerUser(values)
      .then(() => {
        toast.success("Đăng ký Thành Công !");
        nav("/login");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Register</h1>
      <AuthForm onSubmit={handleRegister} isRegister />
    </div>
  );
}
