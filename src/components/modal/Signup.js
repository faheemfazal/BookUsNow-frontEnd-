import { useState } from "react";
import { axiosUser } from "../axios/axiose";




export default function Signup({setLogin}){
    const [email, setEmail] = useState('');
    const [name,setName] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loginMsg,setLoginMsg] = useState('')


    const validateForm = () => {
        const newErrors = {};

        if (email.trim() === '' && !email.includes('@')) {
            newErrors.email = 'Valid email is required';
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        if (name.trim() === '') {
            newErrors.name = 'name is required';
        }

        console.log(newErrors,'ppppppppp');

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
       
        e.preventDefault();

        if (validateForm()) {
            const user = {
                email,
                password,
                name
            };     
             const response = await axiosUser({
                url:'/signup',
                method:'post',
                data:user
             })
             console.log(response,';;;;;;;;;;;;;;;;;;;');
             if(response.status == 200){
                setLogin(true)
             }else{
                setLoginMsg(response.data.message)
             }

   

        }
        else {
            console.log('Form is not valid. Please fix the errors.');
        }
    }

     return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="max-w-[400px] w-full mx-auto py-16 p-8 px-8 rounded-lg ">
              <h1 className="text-4xl text-black text-center">Sign Up</h1>
              <div className="flex flex-col text-[#989090] py-2">
              <label htmlFor="email">Name</label>
              <input
                id="name"
                className="p-2 bg-white border rounded-lg border-[#989090]"
                type="name"
                placeholder="Name"
                onChange={(event) => { setName(event.target.value) }}
              />
              {errors.name && (<span className='text-red-500'>{errors.name}</span>)}
            </div>
              <div className="flex flex-col text-[#989090] py-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="p-2 bg-white border rounded-lg border-[#989090]"
                  type="email"
                  placeholder="Email"
                  onChange={(event) => { setEmail(event.target.value) }}
                />
                {errors.email && (<span className='text-red-500'>{errors.email}</span>)}
              </div>
              <div className="flex flex-col text-[#989090] py-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="rounded-lg bg-white p-2 border border-[#989090]"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value) }}
                />
                {errors.password && (<span className='text-red-500'>{errors.password}</span>)}
              </div>
              <div className="flex justify-between text-white">
                {/* <p className="flex items-center hover:text-blue-400">
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p> */}
           {loginMsg &&     <button className="text-red-500">{loginMsg}</button>}
              </div>
              <button className="w-full my-5 py-2 bg-black text-white font-semibold rounded-lg border border-white" onClick={handleSignup}>
              Submit
              </button>
              <p className="text-center text-xl text-blue-500 cursor-pointer"onClick={()=>setLogin(true)}>Log In</p>
            </div>
          </div>
     )
}