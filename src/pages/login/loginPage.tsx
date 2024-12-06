import React, { useState } from "react";
import { object, z } from "zod";
const LoginSchema = z.object({
  email: z.string().email("Wrong Email"),
  password: z
    .string()
    .min(8, "It must be at leat 8 character")
    .max(16, "you cant add more that 16 character")
    .regex(/[0-9]/, "It must be include at least one number")
    .regex(
      /[@$#!]/,
      "It must be include at least one of these (@,!,#,$)character",
    ),
});
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev)=>({...prev,[name]:value}));
    setError((prev)=>({...prev,[name]: ""}));
    const btn=document.getElementById("submit")
    if(name.length>0){
btn?.classList.remove("opacity-50","cursor-not-allowed")

    }
    else{
      btn?.classList.add("opacity-50","cursor-not-allowed")

    }
  };
const handleSubmit=(e:React.FormEvent)=>{

  e.preventDefault()
  const validResult=LoginSchema.safeParse(formData)
  if(!validResult.success){
    const feildError: {[key: string]: string} = {};
validResult.error.errors.forEach((error) => {
if(error.path[0]) {
feildError[error.path[0]] = error.message;
}})
setError(feildError)
return
  }
}
  return (
    <>
      <div className="p-5">
        <img src="/src/assets/icons/back-icon.svg" alt="back-icon" />
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <img
            src="/src/assets/icons/Vector2.svg"
            alt="vector2"
            className="mt-[132px]"
          />
          <h1 className="font-semibold text-3xl mt-[118px]">
            Login to Your Account
          </h1>
          <div className="w-[380px] h-[37px] border-2 border-[#6C757D] rounded px-2 flex gap-2 mt-12">
            <img src="/src/assets/icons/email-icon.svg" alt="email-icon" />
            <input onChange={handleChange} type="text" name="email" value={formData.email} placeholder="Email" className="w-full px-2" />
          </div>
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <div className="w-[380px] h-[37px] border-2 border-[#6C757D] rounded px-2 flex gap-2 mt-[29px]">
            <img src="/src/assets/icons/lock-icon.svg" alt="lock-icon" />
            <input
            onChange={handleChange}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className="w-full px-2"
            />
            <img
              src="/src/assets/icons/eye-slash-icon.svg"
              alt="eye-icon"
              className=""
            />
          </div>
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          <div className="mt-10">
            <input type="checkbox" name="checkbox" />
            <label htmlFor="checkbox" className="ml-2">
              Remember Me
            </label>
          </div>

          <button
            className="w-full h-[47px] mt-[220px] rounded-[30px] bg-[#212529] text-white opacity-50 cursor-not-allowed"
            id="submit"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
