import React, { FormEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const navigate = useNavigate();
  const {loading, verifyEmail} = useUserStore()

  const handleChangeInput = (index:number, value:string) => {
    if(/^[a-zA_Z0-9]$/.test(value) || value === ""){
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    }
    //Move to next input field 
    if(value !== "" && index < 5){
        inputRef.current[index+1].focus();
    }

  }

  const handleClearInput =(index:number, e:React.KeyboardEvent<HTMLInputElement>) =>  {
      if(e.key === "Backspace" && !otp[index] && index > 0){
        inputRef.current[index-1].focus();
      }
  }

  const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode : string = otp.join("")

    try {
      await verifyEmail(verificationCode)
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md  flex flex-col gap-10 border bg-white">
        <div>
          <h1 className="text-2xl font-extrabold mb-2">Verify your email</h1>
          <p className="text-gray-600 text-sm">
            Enter the 6 digit OTP sent to email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter, index) => (
              <Input
                key={index}
                type="text"
                value={letter}
                ref={(elem) => (inputRef.current[index]) = elem}
                maxLength={1}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChangeInput(index, e.target.value)}
                onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleClearInput(index, e)}
                className="md:w-12 md:h-12 w-8 h-8 flex text-center text-sm md:text-2xl font-normal md:font-semibold rounded-lg focus-visible:ring-1"
              />
            ))}
          </div>
          <Button
            disabled={loading}
            className="bg-orange w-full mt-6 hover:bg-hoverOrange"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin mr-1" />
                Please wait...
              </>
            ) : (
              "Verify"
            )}
          </Button>
          <p>
            Back to{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
