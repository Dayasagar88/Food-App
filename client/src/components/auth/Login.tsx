import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { CircleAlert, Loader, LockKeyhole, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";



const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors , setErrors] = useState<Partial<LoginInputState>>({})

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginHandler = async (e:FormEvent) => {
    e.preventDefault();

    //Form validation here
    const result = userLoginSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
    }
    //Form validation end

    //API implementaion

    console.log(input);
  };

  const loading = false;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="md:p-8 p-4 shadow-lg bg-white border w-full max-w-md border-gray-200 rounded-lg mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Food App</h1>
        </div>
        {/* Email input */}
        <div className="mb-6">
          <div className="relative flex items-center">
            <Input
              onChange={inputChangeHandler}
              value={input.email}
              name="email"
              type="email"
              placeholder="Email"
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className=" absolute text-gray-500 left-2 pointer-events-none" />
          </div>
          {errors.email  && <p className=" absolute
          z-10 text-red-600 text-sm flex items-center"><CircleAlert className="inline w-4 h-4 mr-1"/> {errors.email}</p> }
        </div>

        {/* Password input */}
        <div className="mb-6">
          <div className="relative flex items-center">
            <Input
              onChange={inputChangeHandler}
              value={input.password}
              name="password"
              type="password"
              placeholder="Password"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className=" absolute text-gray-500 left-2 pointer-events-none" />
          </div>
          {errors.password  && <p className=" absolute
          z-10 text-red-600 text-sm flex items-center"><CircleAlert className="inline w-4 h-4 mr-1"/> {errors.password}</p>}
        </div>
        {/* Login button */}
        <div className="mb-6">
          <Button disabled={loading} type="submit" className="bg-orange mb-2 hover:bg-hoverOrange w-full" onClick={loginHandler}>
            {loading ? (
              <>
                <Loader className="h-6 w-6 animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <Link className="hover:underline text-gray-600 font-semibold" to="/forgot-password">Forgot password</Link>
        </div>

        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
