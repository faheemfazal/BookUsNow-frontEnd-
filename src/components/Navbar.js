import { IoLocationSharp } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { LuAlignJustify } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Login from "./modal/Login";
import { useEffect, useState } from "react";


export default function Navbar() {

    const [showLogin,setShowLogin] = useState(false)
    const [user,setUser] = useState('')
    useEffect(()=>{

    },[user])

  return (
    <>
      <div className="w- h-16  flex bg-[#ffffff]">
        <div className="md:w-64 w-48 h- flex justify-center md:items-center items-end pb-1 md:pl-2 pl-5 ">
          <h1 className="text-[#CF2D2D] font-bold text-3xl  ">BookUsNow</h1>
        </div>
        <div className="md:flex-1 w-full md:justify-center justify-end p-2 flex gap-3">
          <div className=" w-7/12 flex gap-3 invisible md:visible md:static absolute">
            <button className="flex items-center gap-3 rounded-lg bg-black p-2 text-white ">
              <LuAlignJustify />
              <p className="text-base">Categories</p>
            </button>
            <div className="w-full border-2 rounded-lg p-2 h-full flex ">
              <input
                type="search"
                placeholder="DJI phantom"
                className=" outline-none h-full w-full text-base"
              />
              <IoMdSearch className="text-[#989090] text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="flex md:w-4/12  md:text-xl md:gap-1 gap-4 md:pr-2 pr-5">
            <button className="flex md:items-center items-end gap-1 rounded-lg  text-[#989090]  md:p-2 visible md:invisible md:absolute static">
              <IoMdSearch className="text-3xl" />
            </button>
            <button className="flex  md:items-center items-end gap-1 rounded-lg  text-[#989090]  md:p-2">
              <MdOutlineFavorite className="text-3xl md:text-2xl" />
              <p className="invisible md:visible md:static absolute text-base font-semibold">
                Favorites
              </p>
            </button>

         {user ? (<p className="items-center gap-3 rounded-lg  text-[#989090] border-2  p-2 invisible md:visible md:static absolute text-base font-semibold">Hi {user} </p>)  : (<button className="flex items-center gap-3 rounded-lg  text-[#989090] border-2  p-2 invisible md:visible md:static absolute text-base font-semibold" onClick={()=>setShowLogin(true)}>
              Log In
            </button>)}
            <Login
                open={showLogin}
                setOpen={setShowLogin}
                setUser={setUser}
               
              />
            <button className="flex md:items-center items-end gap-1 rounded-lg  text-[#989090]  md:p-2 visible md:invisible md:absolute static ">
              <FaUser className="text-3xl" onClick={()=>setShowLogin(true)} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:h-12  flex md:pl-2 pl-3 bg-[#ffffff]">
        <div className="md:w-64 w-48 h-full flex justify-center md:items-center items-start">
          <div className="flex gap-2 mb-1 items-center text-[#989090] md:text-lg text-base">
            <IoLocationSharp className="cursor-pointer" />
            <p className="text-base cursor-pointer">Mumbai, India</p>
            <FaAngleRight className="cursor-pointer" />
          </div>
        </div>
        <div className=" justify-center p-2 flex  gap-3 mb-1 items-center text-[#989090] sm:full w-7/12  font-semibold invisible md:visible md:static absolute text-base">
          <p className="cursor-pointer">Liveshows</p>
          <p className="cursor-pointer">Streams</p>
          <p className="cursor-pointer">Movies</p>
          <p className="cursor-pointer">Plays</p>
          <p className="cursor-pointer">Events</p>
          <p className="cursor-pointer">Sports</p>
          <p className="cursor-pointer">Activities</p>
        </div>
      </div>
      <div className="w-full h-12 gap-5 pl-16 flex bg-[#ffffff] text-[#989090]  font-semibold visible md:invisible md:absolute static text-base overflow-auto scrollbar-hide pr-10">
        <p className="cursor-pointer">Liveshows</p>
        <p className="cursor-pointer">Streams</p>
        <p className="cursor-pointer">Movies</p>
        <p className="cursor-pointer">Plays</p>
        <p className="cursor-pointer">Events</p>
        <p className="cursor-pointer">Sports</p>
        <p className="cursor-pointer">Activities</p>
      </div>
    </>
  );
}
