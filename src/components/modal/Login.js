// import React, { useState } from "react";

import { useState } from "react";
import { axiosUser } from "../axios/axiose";
import Signup from "./Signup";

export default function Login({ open, setOpen, setUser }) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (email.trim() === "" && !email.includes("@")) {
      newErrors.email = "Valid email is required";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }

    console.log(newErrors, "ppppppppp");

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const user = {
//         email,
//         password,
//       };
//       const response = await axiosUser({
//         url: "/login",
//         method: "post",
//         data: user,
//       });

//       if (response.status == 200) {
//         setUser(response.data.name);
//       } else {
//         setMsg(response.data.mesaage);
//       }
//     } else {
//       console.log("Form is not valid. Please fix the errors.");
//     }
//   };


  
  const handleLogin = async (e) => {
       
    e.preventDefault();

    if (validateForm()) {
        const user = {
            email,
            password,
           
        };     
         const response = await axiosUser({
            url:'/login',
            method:'post',
            data:user
         })
         console.log(response,';;;;;;;;;;;;;;;;;;;');
         if(response.status == 200){
             setUser(response.data.name);
             setOpen(false)
         }else{
            setMsg(response.data.mesaage);
         }



    }
    else {
        console.log('Form is not valid. Please fix the errors.');
    }
}

  if (!open) return null;

  //   const [login,setLogin] = useState(true)

  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-80 z-40"
        onClick={() => setOpen(false)}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 md:w-[450px] md:h-[500px] h-[450px] w-80 bg-white rounded-2xl border-2">
        {login ? (
          <div className="h-full w-full flex justify-center items-center">
            <div className="max-w-[400px] w-full mx-auto py-16 p-8 px-8 rounded-lg ">
              {/* <form className='max-w-[400px] w-full mx-auto  py-16  p-8 px-8  rounded-lg      '> */}

              <h1 className="text-4xl text-black text-center">Log In</h1>
              <div className="flex flex-col text-[#989090] py-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="p-2 bg-white border rounded-lg border-[#989090]"
                  type="email"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col text-[#989090] py-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="rounded-lg bg-white p-2 border border-[#989090]"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
              <div className="flex justify-between text-white">
                {msg && <button className="text-red-400">{msg}</button>}
              </div>

              <button
                className="w-full my-5 py-2 bg-black text-white font-semibold rounded-lg border border-white z-50"
                onClick={handleLogin}
              >
                Submit
              </button>

              <p
                className="text-center text-xl text-blue-500 cursor-pointer"
                onClick={() => setLogin(false)}
              >
                Sign Up
              </p>
              {/* </form> */}
            </div>
          </div>
        ) : (
          <Signup setLogin={setLogin} />
        )}
      </div>
    </>
  );
}
