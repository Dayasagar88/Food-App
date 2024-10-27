import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { CircleAlert, Loader, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import {useUserStore} from "../../store/useUserStore"


const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    contact : "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const [errors , setErrors] = useState<Partial<SignupInputState>>({})
  const {signup, loading } = useUserStore();


  const signupHandler = async (e:FormEvent) => {
    e.preventDefault()

    //Form validation here
    const result = userSignupSchema.safeParse(input);
    if(!result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
    }

    try {
      await signup(input);
      navigate("/verify-email")
    } catch (error) {
      
    }
    // Form validation end
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="md:p-8 p-4 shadow-lg bg-white border w-full max-w-md border-gray-200 rounded-lg mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Food App</h1>
        </div>

        {/* Name input */}
        <div className="mb-6">
          <div className="relative flex items-center">
            <Input
              onChange={inputChangeHandler}
              value={input.fullname}
              name="fullname"
              type="text"
              placeholder="Full Name"
              className="pl-10 focus-visible:ring-1"
            />
            <User className=" absolute text-gray-500 left-2 pointer-events-none" />
          </div>
          {errors.fullname  && <p className=" absolute
          z-10 text-red-600 text-sm flex items-center"><CircleAlert className="inline w-4 h-4 mr-1"/> {errors.fullname}</p>  }

        </div>

        {/* contact input */}
        <div className="mb-6">
          <div className="relative flex items-center">
            <Input
              onChange={inputChangeHandler}
              value={input.contact}
              name="contact"
              type="contact"
              placeholder="Contact No."
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneCall className=" absolute text-gray-500 left-2 pointer-events-none" />
          </div>
          {errors.contact  && <p className=" absolute
          z-10 text-red-600 text-sm flex items-center"><CircleAlert className="inline w-4 h-4 mr-1"/> {errors.contact}</p> }

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
          z-10 text-red-600 text-sm flex items-center"><CircleAlert className="inline w-4 h-4 mr-1"/> {errors.password}</p>  }

        </div>
        {/* Login button */}
        <div className="mb-6">
          <Button disabled={loading} type="submit" className="bg-orange hover:bg-hoverOrange w-full" onClick={signupHandler}>
            {loading ? (
              <>
                <Loader className="h-6 w-6 animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </div>

        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form> 
    </div>
  );
};

export default Signup;
