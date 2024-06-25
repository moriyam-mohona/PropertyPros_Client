import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Signup = () => {
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const { email, password, name, photo } = data;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const lengthCheck = password.length >= 6;

    if (
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !lengthCheck
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = { email };

        if (result.user) {
          navigate("/");
          toast.success("User created successfully");
          updateUserProfile(name, photo).then(() => {
            setUser((prevUser) => {
              return { ...prevUser, displayName: name, photoURL: photo };
            });
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero min-h-screen mb-7">
      <div className="hero-content flex-col lg:col">
        <div className="text-center ">
          <SectionTitle
            heading={"Register Now"}
            subHeading="Please provide accurate information and create an account to access
            all the details"
          />
        </div>
        <div className="card w-full max-w-md mx-auto shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-700text-sm  mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter Your Photo URL"
                className="input input-bordered"
                {...register("photo")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-700 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered pr-10 w-full"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-[#008EC4]  text-lg"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-700 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#008EC4] text-white text-lg">
                Register
              </button>
            </div>
            <p className="text-center">
              Already Have an Account?{" "}
              <Link
                to="/login"
                className="underline font-semibold text-[#008EC4]"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
